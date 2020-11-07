<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Karte<span class="arrow"></span></th>
                <th scope="col">Tiere<span class="arrow"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="map in maps" v-bind:key="map.mapname">
                <td>{{map.mapName}}</td>
                <td>
                    <ul>
                        <li v-for="animal in map.animals" :key="animal"> {{animal}}</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import axios from "axios";
import Map from "../../shared/map"

@Component
export default class Maps extends Vue {
    private maps = new Array < Map > ();
    private components = {};
    mounted() {
        axios
            .get < Map[] > ('/api/maps')
            .then((response) => {
                this.maps = response.data;
            }).catch(console.log)
    }
}
</script>
