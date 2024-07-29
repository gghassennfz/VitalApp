import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaFileMedical,
  FaHome,
  FaReceipt,
  FaTable,
  FaUserPlus,
  FaUserTie,
  FaUserShield,
  FaEnvelope,
  FaBalanceScale,
  FaFolder,
  FaFileArchive,
  FaFilePowerpoint,
  FaBuilding,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Sidebar.css";

const Sidebar = ({ children, role, isOpen }) => {
  const { pathname } = useLocation();
  if (pathname === "/") return children;
  if (pathname === "/messagerie") return children;

  const [addDocDropdownOpen, setAddDocDropdownOpen] = useState(false);
  const [dossierDropdownOpen, setDossierDropdownOpen] = useState(false);
  const [fichesDropdownOpen, setFichesDropdownOpen] = useState(false);
  const [ajouterFicheDropdownOpen, setAjouterFicheDropdownOpen] = useState(false); // Added state for Ajouter Fiche dropdown

  const toggleAddDocDropdown = () => {
    setAddDocDropdownOpen(!addDocDropdownOpen);
    setDossierDropdownOpen(false);
    setFichesDropdownOpen(false);
    setAjouterFicheDropdownOpen(false);
  };

  const toggleDossierDropdown = () => {
    setDossierDropdownOpen(!dossierDropdownOpen);
    setAddDocDropdownOpen(false);
    setFichesDropdownOpen(false);
    setAjouterFicheDropdownOpen(false);
  };

  const toggleFichesDropdown = () => {
    setFichesDropdownOpen(!fichesDropdownOpen);
    setAddDocDropdownOpen(false);
    setDossierDropdownOpen(false);
    setAjouterFicheDropdownOpen(false);
  };

  const toggleAjouterFicheDropdown = () => {
    setAjouterFicheDropdownOpen(!ajouterFicheDropdownOpen);
    setAddDocDropdownOpen(false);
    setDossierDropdownOpen(false);
    setFichesDropdownOpen(false);
  };

  useEffect(() => {
    // Save dropdown state to local storage
    localStorage.setItem("addDocDropdownOpen", JSON.stringify(addDocDropdownOpen));
    localStorage.setItem("dossierDropdownOpen", JSON.stringify(dossierDropdownOpen));
    localStorage.setItem("fichesDropdownOpen", JSON.stringify(fichesDropdownOpen));
    localStorage.setItem("ajouterFicheDropdownOpen", JSON.stringify(ajouterFicheDropdownOpen));
  }, [addDocDropdownOpen, dossierDropdownOpen, fichesDropdownOpen, ajouterFicheDropdownOpen]);

  let menuItem = [];

  if (role === "validator") {
    menuItem = [
      {
        path: "/validateur",
        name: "Accueil",
        icon: <FaHome />,
      },
      {
        icon: <FaReceipt />,
        name: "Fiches",
        dropdown: [
          {
            path: "/fiches1/validateur",
            name: "Fiches Stockage",
          },
          {
            path: "/fiches2/validateur",
            name: "Fiches Pese",
          },
        ],
      },
      {
        name: "Ajouter Doc",
        icon: <FaFileMedical />,
        dropdown: [
          {
            name: "Doc Nettoyage",
            path: "/verificationNettoyage",
          },
          {
            name: "Doc Pese",
            path: "/verifpese",
          },
          {
            name: "Doc Fabrication",
            path: "/veriffab",
          },
          {
            name: "Doc Emballage",
            path: "/verifemballage",
          },
        ],
      },
      {
        path: "/comment",
        name: "Dossier Lots",
        icon: <FaFolder />,
        dropdown: [
          {
            name: "Lots Nettoyage",
            path: "/nettoyage",
          },
          {
            name: "Lots Pese",
            path: "/pese",
          },
          {
            name: "Lots Fabrication",
            path: "/fabrication",
          },
          {
            name: "Lots Emballage",
            path: "/emballage",
          },
        ],
      },
    ];
  }

  if (role === "admin") {
    menuItem = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
      },
      {
        path: "/adduser",
        name: "Ajouter Utilisateur",
        icon: <FaUserPlus />,
      },
      {
        path: "/display-employees",
        name: " Employees",
        icon: <FaUserTie />,
      },
      {
        path: "/display-validators",
        name: " Validateurs",
        icon: <FaUserShield />,
      },
      {
        path: "/admin-messagerie",
        name: " Messagerie",
        icon: <FaEnvelope />,
      },
      {
        name: "Ajouter Doc",
        icon: <FaFileMedical />,
        dropdown: [
          {
            name: "Document Nettoyage",
            path: "/verificationNettoyage",
          },
          {
            name: "Document Pese",
            path: "/verifpese",
          },
          {
            name: "Doc Fabrication",
            path: "/veriffab",
          },
          {
            name: "Doc Emballage",
            path: "/verifemballage",
          },
        ],
      },
      {
        path: "/comment",
        name: "Dossier Lots",
        icon: <FaTable />,
        dropdown: [
          {
            name: "Lots Nettoyage",
            path: "/nettoyage",
          },
          {
            name: "Lots Pese",
            path: "/pese",
          },
          {
            name: "Lots Fabrication",
            path: "/fabrication",
          },
          {
            name: "Lots Emballage",
            path: "/emballage",
          },
        ],
      },
    ];
  }

  if (role === "employe") {
    menuItem = [
      {
        path: "/home",
        name: "Accueil",
        icon: <FaHome />,
      },
      {
        name: "Ajouter Fiche",
        icon: <FaBuilding />,
        dropdown: [
          {
            path: "/addfiche1",
            name: "Fiche Stockage",
          },
          {
            path: "/addfiche2",
            name: "Fiche Pese",
          },
        ],
      },
      {
        path: "/fiches1",
        name: "Fiches Stockage",
        icon: <FaFileArchive />,
      },
      {
        path: "/fiches2",
        name: "Fiches Pese",
        icon: <FaFilePowerpoint />,
      },
    ];
  }

  const toggle = () =>
    isOpen
      ? null
      : document.getElementById("root").classList.toggle("active");

  return (
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "0px" }} className="sidebar">
        <div className="top_section">
          <img
            className="logo"
            style={{
              height: isOpen ? "9rem" : "0px",
              width: isOpen ? "9rem" : "0px",
            }}
            src={logo}
            alt="Logo"
          />
          <div
            style={{
              marginLeft: isOpen ? "25px" : "-40px",
              marginTop: isOpen ? "15px" : "35px",
            }}
            className="bars"
          ></div>
        </div>
        {menuItem.map((item, index) => (
          <div key={index}>
            {item.dropdown ? (
              <div
                className="link1"
                onClick={() =>
                  item.name === "Ajouter Doc"
                    ? toggleAddDocDropdown()
                    : item.name === "Dossier Lots"
                    ? toggleDossierDropdown()
                    : item.name === "Fiches"
                    ? toggleFichesDropdown()
                    : toggleAjouterFicheDropdown()
                }
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
                <div className="icon">
                  {item.name === "Ajouter Doc" ? (
                    addDocDropdownOpen ? (
                      <FaAngleUp
                        className="up1"
                        style={{ display: isOpen ? "block" : "none" }}
                      />
                    ) : (
                      <FaAngleDown
                        className="down1"
                        style={{ display: isOpen ? "block" : "none" }}
                      />
                    )
                  ) : item.name === "Dossier Lots" ? (
                    dossierDropdownOpen ? (
                      <FaAngleUp
                        className="up"
                        style={{ display: isOpen ? "block" : "none" }}
                      />
                    ) : (
                      <FaAngleDown
                        className="down"
                        style={{ display: isOpen ? "block" : "none" }}
                      />
                    )
                  ) : item.name === "Fiches" ? (
                    fichesDropdownOpen ? (
                      <FaAngleUp
                        className="up3"
                        style={{ display: isOpen ? "block" : "none" }}
                      />
                    ) : (
                      <FaAngleDown
                        className="down3"
                        style={{ display: isOpen ? "block" : "none" }}
                      />
                    )
                  ) : ajouterFicheDropdownOpen ? (
                    <FaAngleUp
                      className="up4"
                      style={{ display: isOpen ? "block" : "none" }}
                    />
                  ) : (
                    <FaAngleDown
                      className="down4"
                      style={{ display: isOpen ? "block" : "none" }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.path}
                className="link1"
                activeclassname="active"
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            )}
            {((item.name === "Ajouter Doc" && addDocDropdownOpen) ||
              (item.name === "Dossier Lots" && dossierDropdownOpen) ||
              (item.name === "Fiches" && fichesDropdownOpen) ||
              (item.name === "Ajouter Fiche" && ajouterFicheDropdownOpen)) && (
              <div className="dropdown">
                {item.dropdown.map((dropdownItem, idx) => (
                  <NavLink
                    key={idx}
                    to={dropdownItem.path}
                    className="link1"
                    activeclassname="active"
                  >
                    <div className="icon">{dropdownItem.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {dropdownItem.name}
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <main style={{ marginLeft: isOpen ? "0px" : "-19px" }}>{children}</main>
    </div>
  );
};

export default Sidebar;
