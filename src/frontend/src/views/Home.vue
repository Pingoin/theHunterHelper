<template>
<div class="home col-xl-12">
    <form id="app" @submit="checkForm">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        </p>

        <p>
            <label for="caliberID">Kaliberbezeichnung</label>
            <input id="caliberID" v-model="caliber.caliberID" type="text" name="caliberID">
        </p>

        <p>
            <label for="weaponType">Waffentyp</label>
            <select id="weaponType" v-model="caliber.weaponType" name="weaponType">
                <option>Gewehr</option>
                <option>Pistole</option>
                <option>Gewehr</option>
                <option>Bogen</option>
            </select>
        </p>

        <template v-for="ammo in caliber.ammos">
            <div :key="caliber.caliberID+ammo.ammoType">
                <hr />
                <p>
                    <label for="ammoType">Munitionstyp</label>
                    <input id="ammoType" v-model="ammo.ammoType" type="text" name="ammoType">
                </p>
                <p>
                    <label for="ammoRange">effektive Reichweite</label>
                    <input id="ammoRange" v-model="ammo.ammoRange" type="number" name="ammoRange" min="0">
                </p>
                <p>
                    <label for="minClass">Minimale Klasse</label>
                    <input id="minClass" v-model="ammo.minClass" type="number" name="minClass" min="0">
                </p>
                <p>
                    <label for="maxClass">Maximale Klasse</label>
                    <input id="maxClass" v-model="ammo.maxClass" type="number" name="maxClass" min="0">
                </p>
                <p>
                    <label for="penetration">Durchschlagskraft</label>
                    <input id="penetration" v-model="ammo.penetration" type="number" name="penetration" min="0">
                </p>
                <p>
                    <label for="expansion">Aufpilzung</label>
                    <input id="expansion" v-model="ammo.expansion" type="number" name="expansion" min="0">
                </p>
                <p>
                    <label for="costs">Kosten</label>
                    <input id="costs" v-model="ammo.costs" type="number" name="costs" min="0">
                </p>
                 <p><button type="button" v-on:click="removeAmmo(ammo)">Entfernen</button></p>
            </div>
        </template>
        <p><button type="button" v-on:click="addAmmo()">Neue Munition</button></p>
        <p><button type="button" v-on:click="send()">abschicken</button></p>
    </form>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import animal from "../../../shared/animal";
import Caliber, { WeaponType, Ammo } from "../../../shared/caliber";
import Map from "../../../shared/map";

@Component
export default class Home extends Vue {
  private errors: string[] = [];
  private name: string = "";
  private age: number = 0;
  private movie: string = "";
  private isEditing: boolean = false;
  private caliber: Caliber = {
    caliberID: "",
    ammos: [],
    weaponType: WeaponType.Gewehr,
  };

  mounted() {
    axios
      .get<Caliber>("/api/calibers/.50")
      .then((response) => {
        this.caliber = response.data;
      })
      .catch(console.log);
  }
  private send(){
      alert(JSON.stringify(this.caliber));
  }
  private removeAmmo(ammo: Ammo) {
    this.caliber.ammos.splice(this.caliber.ammos.indexOf(ammo), 1);
  }
  private addAmmo() {
    this.caliber.ammos.push({
      ammoType: "Patrone",
      ammoRange: 0,
      minClass: 0,
      maxClass: 0,
      penetration: 0,
      expansion: 0,
      costs: 0,
    });
  }
  private checkForm(e: unknown) {
    if (this.name && this.age) {
      return true;
    }

    this.errors = [];

    if (!this.name) {
      this.errors.push("Name required.");
    }
    if (!this.age) {
      this.errors.push("Age required.");
    }

    //e.preventDefault();
  }
}
</script>
