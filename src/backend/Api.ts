import dotenv from "dotenv";
import express from "express";
import Database from "./Database";
import cors from "cors";
import Caliber from "../shared/caliber"

export default class Api {
    public express: express.Application;
    private db: Database;
    constructor() {
        dotenv.config();
        const port = process.env.SERVER_PORT;
        this.express = express();
        this.db = Database.getInstance();
        this.express.set("port", process.env.port || port);
        
        this.middleware();
        this.routes();
        this.express.listen(port, () => {
            console.log(`Server running on port: ${port}`);
          });                               
    }
    private middleware(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }
    private routes(): void {
        
        this.express.get("/api/animals", (req, res) => {
            let mapID="";
            console.log(req.query);
            if (req.query.mapID){
                mapID=req.query.mapID.toString();
                console.log(mapID);
            }
            this.db.getAnimals(mapID)
                .then((animals) => { res.json(animals) })
                .catch(console.log);
        });
        this.express.get("/api/calibers", (req, res) => {
            this.db.getCalibers()
                .then((calibers) =>{ res.json(calibers) })
                .catch(console.log);
        });
        this.express.put("/api/calibers/:caliberID",(req,res)=>{
            let caliber:Caliber =JSON.parse(req.query.caliber as string);
            this.db.pushCaliber(caliber).catch(console.log);
            console.log(caliber);
            res.send("Penis");
        });





        this.express.get("/api/maps", (req, res) => {
            this.db.getMaps()
                .then((maps) =>{ res.json(maps) })
                .catch(console.log);
        });
        this.express.get("/api/callers", (req, res) => {
            this.db.getCallers()
                .then((callers) =>{ res.json(callers) })
                .catch(console.log);
        });
        
        this.express.use(express.static("./dist/frontend/"));
    }
}
