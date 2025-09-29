import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    passkey: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
export default Users;