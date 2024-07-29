import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Fiche2Card from './Fiche2Card'; // Assuming you have a component named Fiche2Card
import '../css/Fiche1.css'; // Assuming you have corresponding CSS

const Fiches2 = ({ role ,IDuser }) => {
  const [fiches2, setFiches2] = useState([]);

  
  useEffect(() => {
    axios.get(`http://localhost:3001/fiche2/fiches2/${IDuser}`)
      .then(res => {
        setFiches2(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [IDuser]);
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
        <div className='Displayfiche'>
      {fiches2.map(fiche2 => {
        return <Fiche2Card key={fiche2.id} fiche2={fiche2} role={role}></Fiche2Card>;
      })}
    </div>
        </div>
      </div>
    </div>
  );
}

export default Fiches2;
