<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Originalname<span class="arrow"></span></th>
                <th scope="col">Name<span class="arrow"></span></th>
                <th scope="col">Max Level<span class="arrow"></span></th>
                <th scope="col">min/max Trophäenwertung<span class="arrow"></span></th>
                <th scope="col">Diamandgewicht<span class="arrow"></span></th>
                <th scope="col">Klasse<span class="arrow"></span></th>
                <th scope="col">Karten<span class="arrow"></span></th>
                <th scope="col">Lockrufer<span class="arrow"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="animal in animals" v-bind:key="animal.animalID">
                <td>{{animal.animalID}}</td>
                <td>{{animal.animalName}}</td>
                <td>{{animal.maxLevel}}</td>
                <td>{{animal.minTrophyRating}}/{{animal.maxTrophyRating}}</td>
                <td>{{animal.diamondWeight}}</td>
                <td>{{animal.animalClass}}</td>

                <td>
                    <ul>
                        <li v-for="map in animal.maps" :key="map">{{map}}</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li v-for="caller in animal.caller" :key="caller">{{caller}}</li>
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
import animal from "../../shared/animal"

@Component
export default class Home extends Vue {
    private animals = new Array < animal > ();
    private components = {};
    mounted() {
        axios
            .get < animal[] > ('/api/animals')
            .then((response) => {
                this.animals = response.data;
            }).catch(console.log)
    }
}
</script>
