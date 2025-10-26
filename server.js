import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mohanaprakash:Mathematics%4017@cluster0.dxecs1x.mongodb.net/dsa_notes?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/problems", problemRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
