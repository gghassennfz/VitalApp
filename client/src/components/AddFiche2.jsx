import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFiche1 = ({IDuser}) => {
    const [Responsable, setResponsable] = useState('');
    const [Ref, setRef] = useState('');
    const [Produit, setProduit] = useState('');
    const [Mp, setMp] = useState('');
    const [Datepese, setDatepese] = useState('');
    const [Equipement, setEquipement] = useState('');
    const [Poids, setPoids] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/fiche2/add', {
            Responsable,
            Ref,
            Produit,
            Mp,
            Datepese,
            Equipement,
            Poids,
            createdBy: IDuser
        })
        .then(res => {
            if(res.data.added) {
                navigate('/fiches2');
            } else {
                console.log(res);
            }
        })
        .catch(err => console.log(err));
    }

    return (
      <div className="hero">
        <div className="appc">
            <div className="work">
            <div className="employe-form-container">
            <form className="employe-form" onSubmit={handleSubmit}>
            <h2 className="title">Fiche de pese</h2>                <div className="form-group">
                    <label htmlFor="Responsable">Responsable de Pesé :</label>
                    <input type="text" id="Responsable" name="Responsable" 
                    onChange={(e) => setResponsable(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Ref">Référence :</label>
                    <input type="text" id="Ref" name="Ref" 
                    onChange={(e) => setRef(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Produit">Produit :</label>
                    <input type="text" id="Produit" name="Produit" 
                    onChange={(e) => setProduit(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Mp">Matiére Premiére :</label>
                    <input type="text" id="Mp" name="Mp" 
                    onChange={(e) => setMp(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Datepese">Date de Pesé :</label>
                    <input type="date" id="Datepese" name="Datepese" 
                    onChange={(e) => setDatepese(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Equipement">Equipement-utilisé :</label>
                    <input type="text" id="Equipement" name="Equipement" 
                    onChange={(e) => setEquipement(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Poids">Poids :</label>
                    <input type="text" id="Poids" name="Poids" 
                    onChange={(e) => setPoids(e.target.value)}/>
                </div>
                <button type="submit" className='btn-addst'>Ajouter  </button>
            </form>
        </div>
            </div>
        </div>
      </div>
    );
}

export default AddFiche1;
