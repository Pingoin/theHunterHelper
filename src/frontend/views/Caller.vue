<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <b-table-simple hover striped small caption-top>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th scope="col">Rufer<span class="arrow"></span></b-th>
          <b-th scope="col">Reichweite<span class="arrow"></span></b-th>
          <b-th scope="col">Tiere<span class="arrow"></span></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="caller in callers" v-bind:key="caller.callerID">
          <b-td>{{ caller.callerID }}</b-td>
          <b-td>{{ caller.range }}</b-td>
          <b-td>
            <ul>
              <li v-for="animal in caller.animals" :key="animal">{{ animal }}</li>
            </ul>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import caller from "../../shared/caller";

@Component
export default class Caliber extends Vue {
  private callers = new Array<caller>();
  private components = {};
  mounted() {
    axios
      .get<caller[]>("/api/callers")
      .then((response) => {
        this.callers = response.data;
      })
      .catch(console.log);
  }
}
</script>
