import mongoose from "mongoose";

const fiche1Schema = new mongoose.Schema({
  Mp: { type: String },
  Lot: { type: String },
  DLC: { type: String },
  Quantite: { type: String },
  Etanchite: { type: String },
  Etiquette: { type: String },
  statut: { type: String, default: "en attente" },
  CodeBarre: { type: String }, 
  createdBy: { type: String },
});


const Fiche1 = mongoose.model("Fiche_employee_stockage", fiche1Schema);

export { Fiche1 };
