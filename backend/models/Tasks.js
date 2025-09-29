import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    workday: { type: mongoose.Schema.Types.ObjectId, ref: "Workdays", required: true },
    maintask: { type: String, required: true },
    subtasks: [
  { type: String, required: true }
],
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", taskSchema);
export default Tasks;