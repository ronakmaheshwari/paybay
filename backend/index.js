import express from "express";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import { router } from "./routes/index.js";
import cors from "cors";
import { JWT_SECRET, PORT } from "./config.js";

const app = express();
const port = PORT || 3000; 
const jwtpass = JWT_SECRET;

app.use(cors());
app.use(express.static("public")); 
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
