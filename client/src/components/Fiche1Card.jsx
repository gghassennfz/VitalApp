import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import Swal from "sweetalert2";
import JsBarcode from "jsbarcode";

const Fiche1Card = ({ fiche1, role }) => {
  const { Mp, Lot, DLC, Quantite, Etanchite, Etiquette, statut, _id, CodeBarre } = fiche1; // Destructure _id and CodeBarre from fiche1
  const [status, setStatus] = useState(statut);

  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, CodeBarre, {
        format: "CODE128",
      });
    }
  }, [CodeBarre]);

  const handleStatut = (e) => {
    e.preventDefault();
    const newStatus = status === "Non Verifier" ? "Verifier" : "Non Verifier";
    axios
      .put(`http://localhost:3001/fiche1/fiche1/${_id}`, { statut: newStatus })
      .then((res) => {
        if (res.data.updated) {
          setStatus(newStatus);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Etes-vous sûr de supprimer?",
      text: "Vous ne pourrez pas récupérer cette fiche !",
      icon: "warning",
      cancelButtonText: "Annulé",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/fiche1/fiche1/${_id}`)
          .then((res) => {
            if (res.data.deleted) {
              Swal.fire(
                "Supprimé !",
                "Votre fiche a été supprimée.",
                "success"
              ).then(() => {
                window.location.reload(); // Refresh the page
              });
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="fiche1-card">
      <div className="fiche1-details">
        <p><strong>Matière Première:</strong> {Mp}</p>
        <p><strong>Numéro Lot:</strong> {Lot}</p>
        <p><strong>Date Limite Consommation:</strong> {DLC}</p>
        <p><strong>Quantité:</strong> {Quantite}</p>
        <p><strong>Étanchéité et Sécurité des Bouchons:</strong> {Etanchite}</p>
        <p><strong>Étiquette Fournisseur:</strong> {Etiquette}</p>
        <p><strong>STATUT:</strong> {status}</p>
       
      </div>
      <div className="fiche1-actions">
        <button className="fedit">
          <Link to={`/fiche1/${_id}`} >
            Modifier
          </Link>
        </button>
        <button onClick={handleDelete} className="fdelete">
          Supprimer
        </button>
        <div className="statu">
          {role === "validator" && (
            <button
              className="sta"
              type="button"
              onClick={handleStatut}
              style={{
                backgroundColor:
                  status === "Verifier"
                    ? "green"
                    : status === "Non Verifier"
                    ? "red"
                    : "gray",
              }}
            >
              {status === "Verifier" ? "Verifier" : "Non Verifier"}
            </button>
          )}
          {role !== "validator" && (
            <button
              className="sta"
              type="button"
              disabled
              title="You are not authorized to change the status"
              style={{
                backgroundColor:
                  status === "Verifier"
                    ? "green"
                    : status === "Non Verifier"
                    ? "red"
                    : "gray",
              }}
            >
              {status}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fiche1Card;
