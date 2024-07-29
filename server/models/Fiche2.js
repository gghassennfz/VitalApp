import mongoose from "mongoose";

const fiche2Schema = new mongoose.Schema({
  Responsable: { type: String },
  Ref: { type: String },
  Produit: { type: String },
  Mp: { type: String },
  Datepese: { type: String },
  Equipement: { type: String },
  Poids: { type: String },
  statut: { type: String, default: " en attente " },
  createdBy: { type: String },
 
});

const Fiche2 = mongoose.model("Fiche_employee_pese", fiche2Schema);

export { Fiche2 };
