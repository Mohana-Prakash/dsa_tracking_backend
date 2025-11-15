import express from "express";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/admin-login", async (req, res) => {
  try {
    const email = req.body.email.trim();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
      expiresIn: "5d",
    });

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
