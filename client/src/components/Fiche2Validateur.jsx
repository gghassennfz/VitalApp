import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fiche2CardValidateur from './Fiche2CardValidateur';
import '../css/Fiche1.css';

const Fiches2 = ({ role }) => {
  const [fiches2, setFiches2] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/fiche2/fiches2')
      .then(res => {
        setFiches2(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
   <div className="hero">
    <div className="appc">
    <div className="work">
     <div className="Displayfiche">
      {fiches2.map((fiche2, index) => ( // Change fiches to fiches1
        <Fiche2CardValidateur key={fiche2._id} fiche2={fiche2} role={role} />
      ))}
    </div>
   </div>
    </div>
   </div>
  );
};

export default Fiches2;
