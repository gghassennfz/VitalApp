import express from "express";
import { VerificationEmb } from "../models/Vemballage.js";
import { VerificationFab } from "../models/Vfabrication.js";
import { VerificationNett } from "../models/Vnettoyage.js";
import { VerificationPese } from "../models/Vpese.js";
import mongoose from 'mongoose';

const router = express.Router();

router.get("/:codeBarre", async (req, res) => {
  try {
    const { codeBarre } = req.params;

    if (!codeBarre) {
      return res.status(400).json({ message: "CodeBarre parameter is required" });
    }

    const collections = [VerificationEmb, VerificationFab, VerificationNett, VerificationPese];
    const queries = collections.map(collection => collection.findOne({ CodeBarre: codeBarre }).lean());

    const results = await Promise.all(queries);

    const [emb, fab, nett, pese] = results;
    const allResults = { emb, fab, nett, pese };

    const filteredResults = Object.fromEntries(
      Object.entries(allResults).filter(([key, value]) => value !== null)
    );

    if (Object.keys(filteredResults).length === 0) {
      return res.status(404).json({ message: "No document found with the given CodeBarre" });
    }

    return res.json(filteredResults);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export { router as SearchRouter };
