import express from "express";
import dotenv from "dotenv";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.listen(8000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
