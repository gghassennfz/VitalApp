import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { userType, id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zone, setZone] = useState("");
  const [IDuser, setIDuser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${userType}/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setZone(res.data.zone);
        setIDuser(res.data.IDuser);
        setPassword(res.data.password);
      })
      .catch((err) => console.error("Error fetching user details:", err));
  }, [userType, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/${userType}/${id}`, {
        username,
        password,
        zone,
        IDuser,
      })
      .then((res) => {
        if (userType === "employe") {
          toast.success("Les données de l'employée sont mises à jour", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else if (userType === "validator") {
          toast.success("Les données du validateur sont mises à jour", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la mise à jour de l'utilisateur");
      });
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="employe-form-container">
            <form onSubmit={handleSubmit} className="employe-form">
              <h2 className="title">
                Modifier {userType === "employe" ? "Employee" : "Validateur"}
              </h2>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input
                className="inputl"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Nouveau mot de passe:</label>
                <input
                placeholder="######"
                className="inputl"
                  type="text"
                  id="password"
                  
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="IDuser">IDentifiant:</label>
                <input
                className="inputl"
                  type="text"
                  id="IDuser"
                  value={IDuser}
                  onChange={(e) => setIDuser(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zone">Zone:</label>
                <select
                  id="zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                >
                  <option value="zone1">Zone 1</option>
                  <option value="zone2">Zone 2</option>
                  <option value="zone3">Zone 3</option>
                  <option value="zone4">Zone 4</option>
                  <option value="zone5">Zone 5</option>
                  <option value="zone6">Zone 6</option>
                </select>
              </div>
              <div>
                <button type="submit" className="btn-addst">Enregistrer les modifications</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
