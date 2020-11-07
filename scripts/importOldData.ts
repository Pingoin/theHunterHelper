import fs from "fs";
import animal from "../src/shared/animal"
import Calibers, { Ammo, WeaponType } from "../src/shared/caliber"
import Map from "../src/shared/map"
import caller from "../src/shared/caller"
import database from "./thh.json";


let final={
    calibers: new Array<Calibers>(),
    maps: new Array<Map>(),
    animals:new Array<animal>(),
    callers:new Array<caller>()

}

database.caliber.forEach((caliber: any) => {
    let tmp: Calibers = {
        caliberID: caliber.caliberName,
        ammos: [],
        weaponType: WeaponType.Bogen
    }
    switch (caliber.weaponTypeID) {
        case 1:
            tmp.weaponType = WeaponType.Pistole;
            break;
        case 2:
            tmp.weaponType = WeaponType.Gewehr;
            break;
        case 3:
            tmp.weaponType = WeaponType.Flinte;
            break;
        case 4:
            tmp.weaponType = WeaponType.Bogen;
            break;
        default:
            tmp.weaponType = WeaponType.Gewehr;
            break;
    }
    database.ammo.forEach((ammo: any) => {
        if (ammo.caliberID == caliber.caliberID) {
            let tmpAmmo: Ammo = {
                ammoType: "",
                ammoRange: parseInt(ammo.ammoRange),
                minClass: parseInt(caliber.minClass),
                maxClass: parseInt(caliber.maxClass),
                penetration: parseInt(ammo.penetration),
                expansion: parseInt(ammo.expansion),
                costs: parseInt(ammo.costs)
            }
            if (ammo.minClass) tmpAmmo.minClass =parseInt( ammo.minClass);
            if (ammo.maxClass) tmpAmmo.maxClass =parseInt( ammo.maxClass);

            database.ammoType.forEach((type: any) => {
                if (ammo.ammoTypeID == type.ammoTypeID) {
                    tmpAmmo.ammoType = type.ammoTypeName;
                }
            });

            tmp.ammos.push(tmpAmmo);
        }
    });
    final.calibers.push(tmp);
});

database.map.forEach((map: any) => {
    let tmpMap: Map = {
        mapName: map.mapName,
        animals: []
    }
    const ids=database.animalMap.filter((conn:any)=>conn.mapID==map.mapID).map(id=>id.animalID);
    tmpMap.animals=database.animal.filter(an=>ids.includes(an.animalID)).map(an=>an.ID);
    final.maps.push(tmpMap);
});

database.animal.forEach(animal=>{
    let tmpAnimal:animal={
        animalID: animal.ID,
        animalName: animal.animalName,
        maxLevel: parseInt(animal.maxLevel),
        minTrophyRating: parseFloat(animal.minTrophyRating),
        maxTrophyRating: parseFloat(animal.maxTrophyRating),
        diamondWeight: parseFloat(animal.diamondWeight),
        animalClass: parseInt(animal.animalClass),
        maps:[],
        caller:[]
    }
    const idsMaps=database.animalMap.filter(mapid=> mapid.animalID==animal.animalID).map(x=>x.mapID);
    tmpAnimal.maps=database.map.filter(map=>idsMaps.includes(map.mapID)).map(x=>x.mapName);

    const idsCaller=database.animalCaller.filter(callerid=> callerid.animalID==animal.animalID).map(x=>x.callerID);
    tmpAnimal.caller=database.caller.filter(caller=>idsCaller.includes(caller.callerID)).map(x=>x.callerName);

    final.animals.push(tmpAnimal);
});

database.caller.forEach(caller=>{
    let tmpCaller:caller={
        callerID: caller.callerName,
        range: parseInt(caller.callerRange),
        duration: parseInt(caller.duration),
        strength: parseInt(caller.strength),
        animals:[]
    }
    
    tmpCaller.animals=final.animals.filter(animal=>animal.caller.includes(tmpCaller.callerID)).map(x=>x.animalID);
    final.callers.push(tmpCaller);
});

fs.promises.writeFile("../data.json", JSON.stringify(final));