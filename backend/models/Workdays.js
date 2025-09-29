import mongoose from "mongoose";

const workdaySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    date: { type: String, required: true }, // e.g., "09/27" for September 27th
  },
  { timestamps: true }
);

const Workdays = mongoose.model("Workdays", workdaySchema);
export default Workdays;