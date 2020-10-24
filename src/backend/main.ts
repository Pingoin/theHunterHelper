import express from "express";
import bodyParser from "body-parser";
import path from "path";
import Api from "./Api";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", process.env.port || port);
app.use(express.static("./dist/frontend/"));
app.use("/api", Api);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });                               