import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../utlis";
import "../css/TableauN.css";
import {
  FaEye,
  FaTrash,
  FaBarcode,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const EditVerifEmballage = ({ verifications, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barcodeSearchTerm, setBarcodeSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Update currentPage when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredVerifications = verifications ? verifications.filter((verif) =>
    (verif.lot && verif.lot.toLowerCase().includes(searchTerm.toLowerCase())) &&
  (verif.CodeBarre && verif.CodeBarre.toLowerCase().includes(barcodeSearchTerm.toLowerCase()))
) : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVerifications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <h2 className="titre1">Dossier des Lots Emballage:</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Chercher par Numéro de Lot"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">
          <FaSearch className="barcode-icon" />
        </button>
        <input
          type="text"
          placeholder="Chercher par Code Barre"
          value={barcodeSearchTerm}
          onChange={(e) => setBarcodeSearchTerm(e.target.value)}
        />
        <button className="search-btn">
          <FaBarcode className="barcode-icon" />
        </button>
      </div>
      <table className="verif-table">
        <thead>
          <tr>
            <th className="header-cell">Numéro de lot :</th>
            <th className="header-cell">Date d'emballage :</th>
            <th className="header-cell">Actions :</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((verif, index) => (
            <tr key={index} className="row">
              <td className="data-cell">{verif.lot}</td>
              <td className="data-cell">{getDate(verif.date)}</td>
              <td className="data-cell">
                <button className="button-link0">
                <Link
                  to={`/vemballage/${verif._id}`}
                  className="lii"
                >
                   Consulter {" "} <FaEye />
                </Link>
                </button>
                <button
                  className="button-link1"
                  onClick={() => handleDelete(verif._id)}
                >
                  Supprimer {" "} <FaTrash /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="buttony" onClick={prevPage} disabled={currentPage === 1}>
          <FaArrowLeft /> Precedente
        </button>
        <button className="buttony"
          onClick={nextPage}
          disabled={currentItems.length < itemsPerPage}
        >
          Suivante <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default EditVerifEmballage;
