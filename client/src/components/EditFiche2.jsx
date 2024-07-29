import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditFiche2 = () => {
    const [Responsable, setResponsable] = useState('');
    const [Ref, setRef] = useState('');
    const [Produit, setProduit] = useState('');
    const [Mp, setMp] = useState('');
    const [Datepese, setDatepese] = useState('');
    const [Equipement, setEquipement] = useState('');
    const [Poids, setPoids] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/fiche2/fiche2/${id}`)
        .then(res => {
            setResponsable(res.data.Responsable);
            setRef(res.data.Ref);
            setProduit(res.data.Produit);
            setMp(res.data.Mp);
            setDatepese(res.data.Datepese);
            setEquipement(res.data.Equipement);
            setPoids(res.data.Poids);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/fiche2/fiche2/${id}`, {
            Responsable,
            Ref,
            Produit,
            Mp,
            Datepese,
            Equipement,
            Poids,
        })
        .then(res => {
            if(res.data.updated) {
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
                <h2>Edit Fiche2</h2>
                <div className="form-group">
                    <label htmlFor="Responsable">Responsable de Pesé:</label>
                    <input type="text" id="Responsable" name="Responsable" value={Responsable}
                    onChange={(e) => setResponsable(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Ref">Référence:</label>
                    <input type="text" id="Ref" name="Ref" value={Ref}
                    onChange={(e) => setRef(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Produit">Produit:</label>
                    <input type="text" id="Produit" name="Produit" value={Produit}
                    onChange={(e) => setProduit(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Mp">Matiére Premiére:</label>
                    <input type="text" id="Mp" name="Mp" value={Mp}
                    onChange={(e) => setMp(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Datepese">Date de Pesé:</label>
                    <input type="text" id="Datepese" name="Datepese" value={Datepese}
                    onChange={(e) => setDatepese(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Equipement">Equipement-utilisé:</label>
                    <input type="text" id="Equipement" name="Equipement" value={Equipement}
                    onChange={(e) => setEquipement(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Poids">Poids:</label>
                    <input type="text" id="Poids" name="Poids" value={Poids}
                    onChange={(e) => setPoids(e.target.value)}/>
                </div>
                <button type="submit" className='btn-addst'>Modifier </button>
            </form>
        </div>
            </div>
        </div>
       </div>
    );
}

export default EditFiche2;
