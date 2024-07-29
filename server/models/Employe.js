import mongoose from "mongoose";

const employeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zone: { type: String, required: true },
  IDuser: { type: Number, required: true, unique: true },
  role: { type: String, default: "employee" },
});

const employeModel = mongoose.model("Employe", employeSchema);
export { employeModel as Employe };
