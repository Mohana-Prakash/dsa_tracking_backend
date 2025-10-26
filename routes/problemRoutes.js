import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);
router.post("/", createProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

export default router;
