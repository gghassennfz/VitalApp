import express from "express";
import { VerificationNett } from "../models/Vnettoyage.js";
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';


router.post("/add", async (req, res) => {
  try {
    const { Produit, Lot, Dp, activities } = req.body;
    const CodeBarre = uuidv4();
    const newVerificationNett = new VerificationNett({
      Produit,
      Lot,
      Dp,
      CodeBarre,
      activities,
    });
    await newVerificationNett.save();
    return res.json({ added: true });
  } catch (err) {
    return res.json({ message: "Error in adding verification" });
  }
});

router.get("/vnettoyage", async (req, res) => {
  try {
    const verifications = await VerificationNett.find();
    return res.json(verifications);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/vnettoyage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationNett.findById(id);
    return res.json({ verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.get("/vnettoyage/code/:codeBarre", async (req, res) => {
  try {
    const codeBarre = req.params.codeBarre;
    const verification = await VerificationNett.findOne({ CodeBarre: codeBarre });
    if (!verification) {
      return res.status(404).json({ message: 'No verification found with the given code barre' });
    }
    return res.json({ verification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/vnettoyage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationNett.findByIdAndUpdate(
      id,
      req.body
    );
    return res.json({ updated: true, verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/vnettoyage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVerification = await VerificationNett.findByIdAndDelete(id);
    return res.json({ deleted: true, verification: deletedVerification });
  } catch (err) {
    return res.json(err);
  }
});

export { router as VnettoyageRouter };
