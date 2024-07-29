import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddFiche1 = ({ IDuser }) => {
  const [Mp, setMp] = useState("");
  const [Lot, setLot] = useState("");
  const [DLC, setDLC] = useState("");
  const [Quantite, setQuantite] = useState("");
  const [Etanchite, setEtanchite] = useState("");
  const [Etiquette, setEtiquette] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/fiche1/add", {
        Mp,
        Lot,
        DLC,
        Quantite,
        Etanchite,
        Etiquette,
        createdBy: IDuser,
      })
      .then((res) => {
        if (res.data.added) {
          navigate("/fiches1");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="employe-form-container">
            <form className="employe-form" onSubmit={handleSubmit}>
              <h2 className="title">Fiche de stockage</h2>
              <div className="form-group">
                <label htmlFor="Mp">Matière Première :</label>
                <input
                  type="text"
                  id="Mp"
                  name="Mp"
                  onChange={(e) => setMp(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Lot">Lot :</label>
                <input
                  type="text"
                  id="Lot"
                  name="Lot"
                  onChange={(e) => setLot(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="DLC">Date Limite Consommation :</label>
                <input
                  type="date"
                  id="DLC"
                  name="DLC"
                  onChange={(e) => setDLC(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Quantite">Quantite :</label>
                <input
                  type="text"
                  id="Quantite"
                  name="Quantite"
                  onChange={(e) => setQuantite(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Etanchite">Étanchéité et Sécurité des Bouchons :</label>
                <input
                  type="text"
                  id="Etanchite"
                  name="Etanchite"
                  onChange={(e) => setEtanchite(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Etiquette">Étiquette Fournisseur :</label>
                <input
                  type="text"
                  id="Etiquette"
                  name="Etiquette"
                  onChange={(e) => setEtiquette(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-addst">
                Ajouter{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFiche1;
