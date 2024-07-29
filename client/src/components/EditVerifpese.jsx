import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.css";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import JsBarcode from "jsbarcode";

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

const Pese = ({ selectedId = null }) => {
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
      .get(`http://localhost:3001/vpese/vpese/` + (selectedId || id))
      .then((res) => {
        setVerification(res.data.verification);
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
      .delete(`http://localhost:3001/vpese/vpese/${id}`)
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
    setEditedVerificationRow();
  };

  const handleEditVerification = () => {
    setIsLoading(true);
    axios
      .put(`http://localhost:3001/vpese/vpese/${id}`, editedVerificationRow)
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
    DV,
    RBT,
    Pfabrication,
    Ptransfert,
    Vpartage,
    VU,
    VP,
    Verifsacs,
    Nombreprep,
    Dateproo,
    DPF,
    LOT,
    Dp,
    DLC,
    activities,
  } = verification;

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">
            Affichage Verification Des Paniers De Pese :
          </h1>
          <div className="cadre">
          {!isEditMode && (
  <button className="imprimer" onClick={handlePrint}>
    <FontAwesomeIcon icon={faPrint} /> Imprimer
  </button>
)}

          {!isEditMode ? (
            <button className="button-edit" onClick={() => handleEditedVerificationRow(verification)}>
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

          <div className="print-page" ref={printRef}>
            <div className="form">
              <div className="form-field1">
                <label>Date de Verification :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.DV}
                    name="DV"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {DV}
                  </div>
                  
                )}
              </div>
              <div className="form-field1">
                <label>Reference de Bon de Transfert :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.RBT}
                    name="RBT"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                 <div className="data">
                  {RBT}
                 </div> 
                )}
              </div>
              <div className="form-field1">
                <label>
                  Presence de tous les ingredients par rapport au fiche
                  fabrication :
                </label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Pfabrication}
                    name="Pfabrication"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {Pfabrication}
                  </div>
                  
                )}
              </div>
              <div className="form-field1">
                <label>
                  Presence de tous les ingedients par rapport au bon de
                  transfert :
                </label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Ptransfert}
                    name="Ptransfert"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {Ptransfert}
                  </div>
                )}
              </div>
              <div className="form-field1">
                <label>V partage :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Vpartage}
                    name="Vpartage"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {Vpartage}
                  </div>
                )}
              </div>
              <div className="form-field1">
                <label>Version utilise :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.VU}
                    name="VU"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {VU}
                  </div>
                )}
              </div>
              <div className="form-field1">
                <label>Version partage :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.VP}
                    name="VP"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {VP}
                  </div>
                )}
              </div>
              <div className="form-field1">
                <label>verification sacs gelule vracs :</label>

                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Verifsacs}
                    name="Verifsacs"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {Verifsacs}
                  </div>
                )}
              </div>
              <div className="form-field1">
                <label>Nombre de préparation :</label>

                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Nombreprep}
                    name="Nombreprep"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  <div className="data">
                    {Nombreprep}
                  </div>
                )}
              </div>
              <div className="form-field1">
                <label>
                  date de production:
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.Dateproo}
                      name="Dateproo"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    <div className="data">
                      {Dateproo}
                    </div>
                  )}
              </div>
              <div className="form-field1">
                <label>
                  Date de Verification :
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.DV}
                      name="DV"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    <div className="data">
                      {DV}
                    </div>
                  )}
              </div>
              <div className="form-field1">
                <label>
                  Designation PF :
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.DPF}
                      name="DPF"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    <div className="data">
                      {DPF}
                    </div>
                  )}
              </div>
              <div className="form-field1">
                <label>
                  Lot :
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.LOT}
                      name="LOT"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    <div className="data">
                      {LOT}
                    </div>
                  )}
              </div>
              <div className="form-field1">
                <label>
                  DP :
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.Dp}
                      name="Dp"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    <div className="data">
                      {Dp}
                    </div>
                  )}
              </div>
              <div className="form-field1">
                <label>
                  DLC :
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.DLC}
                      name="DLC"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    <div className="data">
                      {DLC}
                    </div>
                  )}
              </div>
              <br/>
              {/* Add similar input fields for other verification data */}
            </div>

            <table className="tableP">
              <thead>
                <tr>
                  <th>Liste des Matières Premières</th>
                  <th>Lot</th>
                  <th>DLC</th>
                  <th>Quantité</th>
                  <th>Etanchéité</th>
                  <th>Lot + DLC</th>
                  
                </tr>
              </thead>
              <tbody>
                {activities?.map(
                  (
                    { lmp, lot, dlc, quantite, etanchite, fournisseur },
                    index
                  ) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].lmp}
                            name="lmp"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          <div className="inf">
                            {lmp}
                          </div>
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].lot}
                            name="lot"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          lot
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].dlc}
                            name="dlc"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          dlc
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].quantite
                            }
                            name="quantite"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          quantite
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].etanchite
                            }
                            name="etanchite"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          etanchite
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .fournisseur
                            }
                            name="fournisseur"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          fournisseur
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

export default Pese;
