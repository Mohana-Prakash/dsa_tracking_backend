import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    leetCodeNo: {
      type: Number,
      required: [true, "Leetcode Problem No. is required"],
    },
    pattern: { type: String, required: [true, "Pattern is required"] },
    idea: { type: String, required: [true, "Idea is required"] },
    steps: { type: String, required: [true, "Steps are required"] },

    timeComplexity: {
      type: String,
      required: [true, "Time Complexity is required"],
    },
    spaceComplexity: {
      type: String,
      required: [true, "Space Complexity is required"],
    },
    code: { type: String, required: [true, "Code is required"] },
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);
