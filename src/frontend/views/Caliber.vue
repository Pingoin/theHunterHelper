<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link to="/editCaliber/">Neues Kaliber</router-link>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Kaliber<span class="arrow"></span></th>
          <th scope="col">Wapon Type<span class="arrow"></span></th>
          <th scope="col">Ammos<span class="arrow"></span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="caliber in calibers" v-bind:key="caliber.caliberID">
          <th>
            <router-link :to="'/editCaliber/' + caliber.caliberID">{{ caliber.caliberID }}</router-link>
          </th>
          <td>{{ caliber.weaponType }}</td>
          <td>
            <ul>
              <li v-for="ammo in caliber.ammos" :key="ammo.ammoType">{{ ammo.ammoType }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import caliber from "../../shared/caliber";
import router from "../router";
@Component
export default class Caliber extends Vue {
  private calibers = new Array<caliber>();
  private components = {};
  mounted() {
    axios
      .get<caliber[]>("/api/calibers")
      .then((response) => {
        this.calibers = response.data;
      })
      .catch(console.log);
  }
}
</script>
