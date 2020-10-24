import dotenv from "dotenv";
import path from "path";
import express from "express";
import bodyParser from "body-parser";

class Api {
    public express: express.Application;
    constructor() {
        dotenv.config();
        this.express = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    private routes(): void {
        this.express.get("/example", (req, res) => {
            res.json({
                titel:"Example Data",
                time:new Date().valueOf()
            });
        });
    }

}

export default new Api().express;