import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import JsBarcode from "jsbarcode";

import "@fortawesome/fontawesome-free/css/all.css";

const Input = ({ index, value, name, onChange, isTitle = false }) => {
  if (isTitle)
    return (
      <div className="form-field7">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      </div>
    );

  return (
    <div className="form-field7">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, name, e.target.value)}
      />
    </div>
  );
};

const Fabrication = ({ selectedId = null }) => {
  const printRef = useRef();
  const { id } = useParams();
  const [verification, setVerification] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editedVerificationRow, setEditedVerificationRow] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const barcodeRef = useRef(null);


  useEffect(() => {
    if (barcodeRef.current && verification.CodeBarre) {
      JsBarcode(barcodeRef.current, verification.CodeBarre, {
        format: "CODE128",
      });
    }
  }, [verification.CodeBarre]);

  const getVerification = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/vfabrication/vfabrication/" + (selectedId || id))
      .then((res) => {
        setVerification({ ...res.data.verification });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getVerification();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/vfabrication/vfabrication/${id}`)
      .then((res) => {
        if (res.data.deleted) {
          getVerification();
          toast(`Supprimer`, {
            type: "success",
            position: "bottom-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteRow = (index) => {
    const activities = editedVerificationRow.activities;

    // delete the index entity herez ..........
    activities.splice(index, 1);

    setEditedVerificationRow((row) => ({ ...row, activities }));
  };

  const handleEditedVerificationRow = (verification) => {
    setIsEditMode(true);
    setEditedVerificationRow({ ...verification });
  };

  const handleEditedVerifTitle = (name, value) => {
    setEditedVerificationRow((row) => ({ ...row, [name]: value }));
  };
  const handleEditedVerifCell = (index, name, value) => {
    console.log({ index, name, value });

    const activities = editedVerificationRow.activities;
    activities[index][name] = value;
    setEditedVerificationRow((row) => ({ ...row, activities }));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Fetch the original verification data again to reset editedVerificationRow
    getVerification();
    toast(`La Modification annulé`, {
      type: "info",
      position: "bottom-right",
    });
  };

  const handleEditVerification = () => {
    setIsLoading(true);


    axios
      .put(
        `http://localhost:3001/vfabrication/vfabrication/${id}`,
        editedVerificationRow
      )
      .then(() => {
        getVerification();
        setIsEditMode(false);
        setEditedVerificationRow();
        toast(`Modifier`, {
          type: "success",
          position: "bottom-right",
        });
      })
      .catch((err) => console.log(err));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          height: "50vh",
          textAlign: "center",
          paddingTop: "40vh",
        }}
      >
        <p>Loading ...</p>
      </div>
    );
    const {
        productionRetour,
        date,
        designation,
        lot,
        nature,
        vitesse,
        preparation,
        activities,
      } = verification;
    
      console.log({ activities });
    
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">Affichage Verification de Fabrication :</h1>
        <div className="cadre">
        <div>
          {!isEditMode && (
  <button className="imprimer" onClick={handlePrint}>
    <FontAwesomeIcon icon={faPrint} /> Imprimer
  </button>
)}
            {!isEditMode ? (
              <button
              className="button-edit"
                onClick={() => {
                  handleEditedVerificationRow(verification);
                }}
              >
                <i className="fas fa-edit"></i> Modifier
              </button>
            ) : (
              <div>
                <button className="button-cancel" onClick={handleCancelEdit}>
                  <i className="fas fa-cancel"></i> Annuler modification
                </button>
                <button className="button-save" onClick={handleEditVerification}>
                  <i className="fas fa-save"></i> Enregistrer modification
                </button>
              </div>
            )}
          </div>
          

          <div className="print-page" ref={printRef}>
          <div className="form-row">
              <div className="form-field">
                <label>productionRetour :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.productionRetour}
                    name="productionRetour"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    <div className="data">
                      {productionRetour}
                    </div>
                )}
              </div>
            
              <div className="form-field">
                <label>Date :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.date}
                    name="date"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {date}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Designation :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.designation}
                    name="designation"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {designation}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Lot :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.lot}
                    name="lot"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {lot}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Nature de flacon :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.nature}
                    name="nature"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {nature}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Vitesse affichée :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.vitesse}
                    name="vitesse"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {vitesse}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Validation machines :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.preparation}
                    name="preparation"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {preparation}
                  </div>
                )}
              </div>
              
              
            </div>
            <table className="tableP">
              <thead>
                <tr>
                  <th>Heure</th>
                  <th>N° Cuve</th>
                  <th>Propreté flacon</th>
                  <th>Température de rincage</th>
                  <th>Changement d'eau</th>
                  <th>Presence de gouttes d'eau</th>
                  <th>Volume par flacon (ml)</th>
                  <th>Responsabilité Validation</th>
                  
                </tr>
              </thead>
              <tbody>
                {activities?.map(
                  (
                    {
                      heure,
                      cuve,
                      flacon,
                      temp,
                      changement,
                      gouttes,
                      volume,
                      validation,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].heure // Optional chaining to handle potential undefined value
                            }
                            name="heure"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          <div className="inf">
                            {heure}
                          </div>
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].cuve // Optional chaining to handle potential undefined value
                            }
                            name="cuve"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          cuve
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].flacon
                            }
                            name="flacon"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          flacon
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].temp}
                            name="temp"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          temp
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].changement
                            }
                            name="changement"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          changement
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].gouttes
                            }
                            name="gouttes"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          gouttes
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].volume
                            }
                            name="volume"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          volume
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].validation
                            }
                            name="validation"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          validation
                        )}
                      </td>
                      
                        {isEditMode && (
                          <td>
                          <button
                            className="btnDeletee"
                            onClick={() => handleDeleteRow(index)}
                          >
                            <FaTrash />
                          </button>
                          </td>
                        )}
                      
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <svg className="codeabaare" ref={barcodeRef}></svg>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Fabrication;
