import lokijs from "lokijs";
import dotenv from "dotenv";
import { promises as fileSystem } from "fs";
import path from "path";
import animal from "../shared/animal";

/**
 *
 * 
 * @export
 * @class Dokus
 */
export default class Database {
  private static instance: Database;
  private animals!: lokijs.Collection<animal>;
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
  private db: lokijs;
  constructor() {
    dotenv.config();
    this.db = new lokijs("database.json", {
      autoload: true,
      autoloadCallback: this.databaseInitialize.bind(this),
      autosave: true,
      autosaveInterval: 4000,
    });
    this.databaseInitialize();
  }
  private databaseInitialize() {

    this.animals = this.db.getCollection<animal>("animals");

    if (this.animals === null) {
      this.animals = this.db.addCollection("animals");
      fileSystem
        .readFile(
          path.normalize("./common/json/animals.json"),
          { encoding: "utf8" }
        )
        .then((json) => {
          this.animals.insert(JSON.parse(json));
        })
        .catch(console.error);
    } else {
      console.log("Animals found");
    }
  }
  public async getTestdata(): Promise<animal[]> {
    return new Promise<animal[]>((resolve, reject) => {
      resolve(this.animals.chain().data());
    });
  }
  public async getAnimals(mapID = "", animalID = ""): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let request: any = {
        type: "animal",
      };
      if (animalID != "") {
        request = { animalID: animalID };
      }
      resolve(this.db.getCollection("animals").find(request));
    });
  }
  public async request(request: string, data = ""): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      switch (request) {
        case "allAnimals":
          resolve(this.db.getCollection("animals").find({ type: "animal" }));
          break;
        default:
          break;
      }
    });
  }
}
