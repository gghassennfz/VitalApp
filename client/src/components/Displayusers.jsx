import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Add this import

const DisplayUsers = ({ userType }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${userType}/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [userType]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/${userType}/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
         <div className="cadre">
         <h2 className="titre1">
            {userType === "employe" ? "Employees" : "Validateurs"}
          </h2>
          <div className="search-container1">
            <input
              type="text"
              placeholder="Chercher par Nom d'utilisateur"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
          <table className="tableP">
            <thead>
              <tr>
                <th className="header-cell">Nom d'utilisateur</th>
                <th className="header-cell">IDentifiant</th>
                <th className="header-cell">Zone</th>
                <th className="header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="data-cell">{user.username}</td>
                  <td className="data-cell">{user.IDuser}</td>
                  <td className="data-cell">{user.zone}</td>
                  <td className="data-cell">
                    <Link to={`/edit/${userType}/${user._id}`}>
                      <button className="edituser">Modifier</button>
                    </Link>
                    <button
                      className="deleteuser"
                      onClick={() => handleDelete(user._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
