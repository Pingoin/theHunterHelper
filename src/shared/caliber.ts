export default interface Caliber {
    caliberID: string;
    ammos: Ammo[];
    weaponType: WeaponType;
}

export interface Ammo {
    ammoType: string;
    ammoRange: number;
    minClass: number;
    maxClass: number;
    penetration: number;
    expansion: number;
    costs: number;
}

export enum WeaponType {
    Pistole = "Pistole",
    Gewehr = "Gewehr",
    Flinte = "Flinte",
    Bogen = "Bogen"
}

export interface Weapon{
    name:string;
}