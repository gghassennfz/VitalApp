import { faSignOutAlt, faUserCircle, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { FaBell } from "react-icons/fa"; // Import the notification icon

const Navbar = ({ role, IDuser, username, toggleSidebar, unreadCount }) => {
  const { pathname } = useLocation();
  const [count, setCount] = useState(unreadCount);
  
  // Update the count state when the unreadCount prop changes
  useEffect(() => {
    setCount(unreadCount);
  }, [unreadCount]);

  if (pathname === "/") return null;
  if (pathname === "/messagerie") return null;

  const handleMouseLeave = () => {
    // Define the behavior when the mouse leaves the Profile details
    // For example, you can hide the Profile details here
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="bars" onClick={toggleSidebar}>
          <FaBars />
        </div>
      </div>
      <div className="navbar-center">
        {role === "employe" && <h2 className="navbar-brand">Employe</h2>}
        {role === "validator" && <h2 className="navbar-brand">Validateur</h2>}
        {role === "admin" && <h2 className="navbar-brand">Administrateur</h2>}
      </div>
      <div className="navbar-right">
      {role === "admin" && (
  // Conditionally render the notification icon for admin
  <a href="/admin-messagerie" className="notification-icon">
    <FaBell />
    {count > 0 && <div className="unread-count">{count}</div>}
  </a>
)}
        <div className="Profile-container">
          <FontAwesomeIcon className="Profile" icon={faUserCircle} />
          {IDuser && (
            <div className="Profile-details" onMouseLeave={handleMouseLeave}>
              <span className="ProfileText">
  <FontAwesomeIcon icon={faHashtag} />
  {" "}Username: {username}
</span>
              <br />
              <span className="ProfileText"> <FontAwesomeIcon icon={faUser} /> {" "}ID: {IDuser}</span>
              <br />
              <Link to="/logout" className="ProfileText" >
                <FontAwesomeIcon icon={faSignOutAlt} />
                {" "}Déconnexion
              </Link>
            </div>
          )}
          {role === "admin" && (
            <div className="Profile-details">
              <Link to="/logout" className="ProfileText">
                <FontAwesomeIcon icon={faSignOutAlt} />
                {" "} Déconnexion
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
