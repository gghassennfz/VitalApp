import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Fiche2Card = ({ fiche2, role }) => {
  const { Responsable, Ref, Produit, Mp, Datepese, Equipement, Poids, _id, statut,  } = fiche2;
  const [status, setStatus] = useState(statut);

  const handleStatut = (e) => {
    e.preventDefault();
    const newStatus = status === "Non Verifier" ? "Verifier" : "Non Verifier";
    axios
      .put(`http://localhost:3001/fiche2/fiche2/${_id}`, { statut: newStatus })
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
      confirmButtonText: "Oui, supprimez-le !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/fiche2/fiche2/${_id}`)
          .then((res) => {
            if (res.data.deleted) {
              Swal.fire(
                "Supprimé !",
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
    <div className='fiche1-card'>
      <div className="fiche1-details">
  <p><strong>Responsable de Pesé:</strong> {Responsable}</p>
  <p><strong>Référence:</strong> {Ref}</p>
  <p><strong>Produit:</strong> {Produit}</p>
  <p><strong>Matiére Premiére:</strong> {Mp}</p>
  <p><strong>Date de Pesé:</strong> {Datepese}</p>
  <p><strong>Equipement-utilisé:</strong> {Equipement}</p>
  <p><strong>Poids:</strong> {Poids}</p>
</div>


      <div className="fiche1-actions">
        <button className="fedit">
          <Link to={`/fiche2/${_id}`} >
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
}

export default Fiche2Card;
