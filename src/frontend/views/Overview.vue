<template>
  <div class="home col-xl-12">
    <select @change="changeMap($event.target.value)" v-model="map">
      <option v-for="map in maps" :key="map.mapName" :value="map.mapName">{{ map.mapName }}</option>
    </select>
    <b-table-simple hover striped small caption-top>
      <b-thead head-variant="dark">
        <tr>
          <th class="calibers">Kaliber<span class="arrow"></span></th>
          <th v-for="animal in animals" :key="animal.animalID">{{ animal.animalName }} ({{ animal.animalClass }})<span class="arrow"></span></th>
        </tr>
      </b-thead>
      <tbody>
        <template v-for="caliber in calibers">
          <tr v-for="ammo in caliber.ammos" :key="caliber.caliberID + ammo.ammoType">
            <td>{{ caliber.caliberID }} {{ ammo.ammoType }}</td>
            <td
              v-for="animal in animals"
              :key="animal.animalID"
              :class="ammo.minClass <= animal.animalClass && ammo.maxClass >= animal.animalClass ? 'true' : 'false'"
            >
              {{ ammo.minClass }}-{{ ammo.maxClass }}
            </td>
          </tr>
        </template>
      </tbody>
    </b-table-simple>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import animal from "../../shared/animal";
import Caliber from "../../shared/caliber";
import Map from "../../shared/map";
import router from "../router";

@Component
export default class Overview extends Vue {
  private animals = new Array<animal>();
  private calibers = new Array<Caliber>();
  private maps = new Array<Map>();
  private map = "Hirschfelden";
  private components = {};
  private getAnimals(map: string) {
    axios
      .get<animal[]>("/api/animals", {
        params: {
          mapID: map,
        },
      })
      .then((response) => {
        this.animals = response.data;
      })
      .catch(console.log);
  }

  mounted() {
    window.addEventListener("popstate", this.fetchData);
    this.fetchData();
  }

  private changeMap(map: string): void {
    this.getAnimals(map);
    map = map.replaceAll(" ", "_");
    router.push("/overview/" + map);
  }

  public fetchData() {
    if (this.$route.params.map) {
      this.map = this.$route.params.map.replaceAll("_", " ");
    }
    this.getAnimals(this.map);
    axios
      .get<Caliber[]>("/api/calibers")
      .then((response) => {
        this.calibers = response.data;
      })
      .catch(console.log);
    axios.get<Map[]>("/api/maps").then((response) => {
      this.maps = response.data;
    });
  }
}
</script>
