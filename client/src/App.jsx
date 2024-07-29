// App.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFiche1 from "./components/AddFiche1";
import AddFiche2 from "./components/AddFiche2";
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";
import DeleteFiche1 from "./components/DeleteFiche1";
import DisplayUsers from "./components/Displayusers";
import EditFiche1 from "./components/EditFiche1";
import EditFiche2 from "./components/EditFiche2";
import EditVemballage from "./components/EditVEmballage";
import EditVeriPese from "./components/EditVerifpese";
import EditVfabrication from "./components/EditVfabrication";
import EditVnettoayge from "./components/EditVnettoyage";
import EditUser from "./components/Edituser";
import Emballage from "./components/Emballage";
import Fabrication from "./components/Fabrication";
import Fiche1Card from "./components/Fiche1Card";
import Fiches2 from "./components/Fiche2";
import Fiches1 from "./components/Fiches1";
import Fiches1Validateur from "./components/Fiches1Validateur";
import Fiches2Validateur from "./components/Fiche2Validateur";
import ForgetPassword from "./components/ForgetPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Nettoyage from "./components/Nettoyage";
import Pese from "./components/Pese";
import Sidebar from "./components/Sidebar";
import UsersDisplay from "./components/UsersDisplay";
import Validateur from "./components/Validateur";
import VerifFab from "./components/VerifFab";
import VerificationNettoyage from "./components/VerifNettoyage";
import VerifPese from "./components/VerifPese";
import Verifemballage from "./components/Verifemballage";
import Stat from "./components/stat";
import Codebar from "./components/Codebar";
// import 'bootstrap/dist/css/bootstrap.css';

import AdminMessagerie from "./components/AdminMessagerie";
import "./index.css";

function App() {
  const [role, setRole] = useState("");
  const [IDuser, setIDuser] = useState(""); // State for IDuser
  const [username, setUsername] = useState(""); // State for username
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Update username state if it exists in local storage
    }
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
          setIDuser(res.data.IDuser);
        } else {
          setRole("");
          setIDuser("");
        }
      })
      .catch((err) =>
        console.error("Error fetching authentication status:", err)
      );

    // Fetch unread message count
    if (role === "admin") {
      axios
        .get("http://localhost:3001/message/messages")
        .then((res) => {
          const unreadMessages = res.data.filter((message) => !message.read);
          setUnreadCount(unreadMessages.length);
        })
        .catch((err) => {
          console.error("Error fetching unread messages:", err);
        });
    }
  }, [role]);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-left" />
      <Sidebar role={role} isOpen={sidebarOpen}>
        <Navbar
          role={role}
          IDuser={IDuser}
          username={username}
          toggleSidebar={toggleSidebar}
          unreadCount={unreadCount}
        />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/fiches1"
            element={<Fiches1 role={role} IDuser={IDuser} />}
          />
          <Route path="/fiches1/validateur" element={<Fiches1Validateur role={role} />} />
          <Route path="/fiches2/validateur" element={<Fiches2Validateur role={role} />} />
          <Route path="/fiches2" element={<Fiches2 IDuser={IDuser} role={role} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edit/:userType/:id" element={<EditUser />} />
          <Route path="/logout" element={<Logout setRole={setRole} />} />
          <Route path="/addfiche1" element={<AddFiche1 IDuser={IDuser} />} />
          <Route path="/addfiche2" element={<AddFiche2 IDuser={IDuser} />} />
          <Route path="/fiche1/:id" element={<EditFiche1 />} />
          <Route path="/fiche2/:id" element={<EditFiche2 />} />
          <Route path="/delete/:id" element={<DeleteFiche1 />} />
          <Route
            path="/"
            element={
              <Login
                setRoleVar={setRole}
                setIDuserVar={setIDuser}
                setUsernameVar={setUsername}
              />
            } // Pass setUsernameVar
          />{" "}
          <Route path="/messagerie" element={<ForgetPassword />} />
          <Route
            path="/verificationNettoyage"
            element={<VerificationNettoyage />}
          />
          <Route path="/nettoyage" element={<Nettoyage />} />
          <Route path="/fabrication" element={<Fabrication />} />
          <Route path="/emballage" element={<Emballage />} />
          <Route path="/verifpese" element={<VerifPese />} />
          <Route path="/verifemballage" element={<Verifemballage />} />
          <Route path="/pese" element={<Pese />} />
          <Route path="/validateur" element={<Validateur />} />
          <Route path="/vnettoyage/:id" element={<EditVnettoayge />} />
          <Route path="/vfabrication/:id" element={<EditVfabrication />} />
          <Route path="/vpese/:id" element={<EditVeriPese />} />
          <Route path="/vemballage/:id" element={<EditVemballage />} />
          <Route
            path="/display-employees"
            element={<DisplayUsers userType="employe" />}
          />
          <Route
            path="/display-validators"
            element={<DisplayUsers userType="validator" />}
          />
          <Route path="/fiche1/:id" element={<Fiche1Card />} />
          <Route path="/veriffab" element={<VerifFab />} />
          <Route path="/userpage" element={<UsersDisplay />} />
          <Route path="/stat" element={<Stat />} />
          <Route
            path="/admin-messagerie"
            element={<AdminMessagerie updateUnreadCount={setUnreadCount} />}
          />
          <Route path="/codebar" element={<Codebar />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
