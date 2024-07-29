import React, { useState } from "react";
import axios from "axios"; // Add import statement for Axios
import { toast } from "react-toastify";
import "../css/Messagerie.css";


const Messagerie = () => {
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!email || !userID || !message) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
  
    const idRegex = /^\d{4}$/;
    if (!idRegex.test(userID)) {
      setError("L'identifiant de l'utilisateur doit être composé de 4 chiffres");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez vérifier votre adresse e-mail");
      return;
    }
  
    axios
      .post("http://localhost:3001/message/add", {
        email,
        userID,
        message,
      })
      .then((res) => {
        if (res.data.added) {
          toast.success("Le message a été envoyé !", {
            autoClose: 3000 // Set the duration to 5 seconds (5000 milliseconds)
          });
          setTimeout(() => {
            window.location.reload(); // Reload the page after 5 seconds
          }, 3000); // Wait for 5 seconds before reloading
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="login-page">
      <div className="messagerie-container">
        <h1 className="titre-messagerie">Réinitialiser les Identifiants !</h1>
        <h2 className="text-messagerie">Si vous avez perdu vos informations de connexion, entrez votre email personnel et identifiant, puis envoyez un message à l'administrateur pour réinitialiser vos informations.</h2>
        <div className="form-messagerie">
          {error && <div className="alert">{error}</div>}
          <form>
            <div className="form-messagerie">
              <label className="label-messagerie" htmlFor="email">Adresse e-mail personnelle :</label>
              <input
                className="input-messagerie"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-messagerie">
              <label className="label-messagerie" htmlFor="userID">Identifiant d'utilisateur :</label>
              <input
                className="input-messagerie"
                type="text"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                maxLength={4}
              />
            </div>
            <div className="form-messagerie">
              <label className="label-messagerie" htmlFor="message">Objet du message :</label>
              <textarea
                className="textera-messagerie"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
            </div>
          </form>
          <button type="submit" className="btn-send" onClick={handleSubmit}>
            Envoyer
          </button>
        </div>
        <a href="/" className="forgot-password-link">Retour à la page de connexion</a>
      </div>
    </div>
  );
};

export default Messagerie;
