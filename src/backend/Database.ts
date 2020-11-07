import lokijs from "lokijs";
import dotenv from "dotenv";
import animal from "../shared/animal";
import imports from "../../data.json";
import Caliber, { Ammo, WeaponType } from "../shared/caliber";
import Map from "../shared/map";
import Caller from "../shared/caller";
/**
 *
 * 
 * @export
 * @class Dokus
 */
export default class Database {
  private static instance: Database;
  private animals!: lokijs.Collection<animal>;
  private maps!:lokijs.Collection<Map>;
  private calibers!:lokijs.Collection<Caliber>;
  private callers!:lokijs.Collection<Caller>;
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
  }
  private databaseInitialize() {

    this.animals = this.db.getCollection<animal>("animals");
    this.maps=this.db.getCollection<Map>("maps");
    this.calibers=this.db.getCollection<Caliber>("calibers");
    this.callers=this.db.getCollection<Caller>("callers");

    if (this.animals === null) {
      this.animals = this.db.addCollection("animals");
      this.animals.insert(imports.animals);
    } else {
      console.log("Animals found");
    }

    if (this.maps === null) {
      this.maps = this.db.addCollection("maps");
      this.maps.insert(imports.maps);
    } else {
      console.log("Maps found");
    }

    if (this.calibers === null) {
      this.calibers = this.db.addCollection("calibers");
      let tmpCalibers=new Array<Caliber>();
      imports.calibers.forEach((caliber)=>{
        const tmpCaliber:Caliber={
          caliberID: caliber.caliberID,
          ammos: caliber.ammos,
          weaponType:caliber.weaponType as WeaponType
        }
        tmpCalibers.push(tmpCaliber);
      })
      this.calibers.insert(tmpCalibers);
    } else {
      console.log("Calibers found");
    }

    if (this.callers === null) {
      this.callers = this.db.addCollection("callers");
      this.callers.insert(imports.callers);
    } else {
      console.log("Callers found");
    }
  } 

  public async getAnimals(mapID = "", animalID = ""): Promise<animal[]> {
    return new Promise<animal[]>((resolve, reject) => {
      let request: any = {};
      if (animalID != "") {
        request = { animalID: animalID };
      }
      resolve(this.animals.find(request));
    });
  }
  public async getCalibers(): Promise<Caliber[]> {
    return new Promise<Caliber[]>((resolve, reject) => {
      let request: any = {};
      resolve(this.calibers.find(request));
    });
  }
  public async getMaps(): Promise<Map[]> {
    return new Promise<Map[]>((resolve, reject) => {
      let request: any = {};
      resolve(this.maps.find(request));
    });
  }
  public async getCallers(): Promise<Caller[]> {
    return new Promise<Caller[]>((resolve, reject) => {
      let request: any = {};
      resolve(this.callers.find(request));
    });
  }
}
