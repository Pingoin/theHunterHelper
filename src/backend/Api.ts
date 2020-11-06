import dotenv from "dotenv";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import Database from "./Database"

class Api {
    public express: express.Application;
    private db: Database;
    constructor() {
        dotenv.config();
        this.db = Database.getInstance();
        this.express = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    private routes(): void {
        this.express.get("/animals", (req, res) => {
            this.db.getAnimals()
                .then((animals) => { res.json(animals) })
                .catch(console.log);
        });
    }
}

export default new Api().express;