import express from 'express';
import { Fiche2 } from '../models/Fiche2.js';
const router = express.Router();
import { verifyUser } from './auth.js';

router.post('/add',  async (req, res) => {
    try {
        const { Responsable, Ref, Produit, Mp, Datepese, Equipement,Poids ,createdBy } = req.body;
        const newFiche2 = new Fiche2({
            Responsable,
            Ref,
            Produit,
            Mp,
            Datepese,
            Equipement,
            Poids,
            createdBy,
        });
        await newFiche2.save();
        return res.json({ added: true });
    } catch (err) {
        return res.json({ message: "Error in adding fiche" });
    }
});

router.get('/fiches2', async (req, res) => {
    try {
        const fiches2 = await Fiche2.find();
        return res.json(fiches2);
    } catch (err) {
        return res.json(err);
    }
});

router.get("/fiches2/:IDuser", verifyUser, async (req, res) => {
    try {
      const createdBy = req.params.IDuser;
      const fiches2 = await Fiche2.find({ createdBy });
      return res.json(fiches2);
    } catch (err) {
      return res.json(err);
    }
  });
  

router.get('/fiche2/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const fiche2 = await Fiche2.findById(id);
        return res.json(fiche2);
    } catch (err) {
        return res.json(err);
    }
});

router.put('/fiche2/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFiche2 = await Fiche2.findByIdAndUpdate(id, req.body);
        return res.json({ updated: true, fiche2: updatedFiche2 });
    } catch (err) {
        return res.json(err);
    }
});

router.delete('/fiche2/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFiche2 = await Fiche2.findByIdAndDelete(id);
        return res.json({ deleted: true, fiche1: deletedFiche2 });
    } catch (err) {
        return res.json(err);
    }
});

export { router as Fiche2Router };
