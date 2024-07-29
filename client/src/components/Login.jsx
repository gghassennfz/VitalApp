import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logovital.png";

import Loading from "./Loading";

import "../css/Login.css";

const Login = ({ setRoleVar, setIDuserVar, setUsernameVar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/auth/login", { username, password, role })
      .then((res) => {
        setRoleVar(res.data.role);
        setIDuserVar(res.data.IDuser);
        setUsernameVar(res.data.username);
        setUsername(res.data.username);
        localStorage.setItem("username", res.data.username); // Store username in local storage

        setTimeout(() => {
          setLoading(false);
          if (res.data.role === "admin") {
            navigate("/dashboard");
            toast(`Bienvenue Admin`, {
              type: "success",
              position: "bottom-right",
            });
          } else if (res.data.role === "employe") {
            navigate("/home");
            toast(`Bienvenue employe `, {
              type: "success",
              position: "bottom-right",
            });
          } else if (res.data.role === "validator") {
            navigate("/validateur");
            toast(`Bienvenue validateur`, {
              type: "success",
              position: "bottom-right",
            });
          }
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError("Données invalides. Veuillez vérifier vos identifiants et réessayer");
        toast(`Réessayer`, { type: "error", autoClose: 1000 });
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && (
        <Loading />
      )}
      {!loading && (
        <div className="login-page">
          <div className="containerforlogo">
            <img className="Logologin" src={Logo} alt="Logo" />
            <div className="login-container">
              <h2 className="seconnecter">Connexion :</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-groupl">
                  <label htmlFor="username">Nom d'utilisateur :</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-groupl">
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-groupl">
                  <label htmlFor="role">Role :</label>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Administrateur</option>
                    <option value="employe">Employée</option>
                    <option value="validator">Validateur</option>
                  </select>
                  <div className="form-groupl">
                    <button className="btn-login" type="submit">
                    Se Connecter
                    </button>
                    <a href="messagerie" className="forgot-password-link">
                      Mot de passe oublié ?
                    </a>
                  </div>
                </div>
              </form>
              {error && (
                <div
                  className="alert alert-danger"
                  style={{ color: "red", fontSize: "small" }}
                >
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
