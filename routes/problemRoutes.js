import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);
router.post("/", adminAuth, createProblem);
router.put("/:id", adminAuth, updateProblem);
router.delete("/:id", adminAuth, deleteProblem);

export default router;
