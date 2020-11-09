<template>
<div class="home col-xl-12">
    <select @change="getAnimals($event.target.value)">
        <option v-for="map in maps" :key="map.mapName">{{map.mapName}}</option>
    </select>
    <table class="table table-striped table-hover table-header-rotated">
        <thead>
            <tr>
                <th scope="col" class="calibers">Kaliber<span class="arrow"></span></th>
                <th scope="col" v-for="animal in animals" :key="animal.animalID">
                    {{ animal.animalName }} <span class="arrow"></span>
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-for="caliber in calibers">
                <tr :key="caliber.caliberID">
                    <td :colspan="animals.length+1">{{ caliber.caliberID }}</td>
                </tr>
                <tr v-for="ammo in caliber.ammos" :key="caliber.caliberID+ammo.ammoType">
                    <td>{{ammo.ammoType}}</td>
                    <td scope="col" v-for="animal in animals" :key="animal.animalID" :class="((ammo.minClass<=animal.animalClass)&&(ammo.maxClass>=animal.animalClass))?'true':'false'">{{ammo.minClass}}-{{ammo.maxClass}}/{{animal.animalClass}}</td>
                </tr>
            </template>
        </tbody>
    </table>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";
import axios from "axios";
import animal from "../../shared/animal";
import Caliber from "../../shared/caliber";
import Map from "../../shared/map";

@Component
export default class Home extends Vue {
    private animals = new Array < animal > ();
    private calibers = new Array < Caliber > ();
    private maps = new Array < Map > ();
    private components = {};
    private getAnimals(map: string) {
        axios
            .get < animal[] > ("/api/animals", {
                params: {
                    mapID: map
                }
            })
            .then((response) => {
                this.animals = response.data;
            })
            .catch(console.log);
    }
    mounted() {
        this.getAnimals("");
        axios
            .get < Caliber[] > ("/api/calibers")
            .then((response) => {
                this.calibers = response.data;
            })
            .catch(console.log);
        axios
            .get < Map[] > ("/api/maps")
            .then((response) => {
                this.maps = response.data;
            });
    }
    private onChange(event: any) {
        console.log(event.target.value)
    }
}
</script>
