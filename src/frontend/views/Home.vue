<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Nr<span class="arrow"></span></th>
                <th scope="col">Doku<span class="arrow"></span></th>
                <th scope="col">Ordner<span class="arrow"></span></th>
                <th scope="col">Datum<span class="arrow"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="animal in animals" v-bind:key="animal.animalID">
                <td>{{animal.animalName}}</td>
                <td>{{animal.maxLevel}}</td>
                <td>{{animal.diamondWeight}}</td>
                <td>{{animal.animalClass}}</td>
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
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import axios from "axios";
import animal from "../../shared/animal"

@Component
export default class AddTutorial extends Vue {
    private animals = new Array < animal > ();
    private components = {
        HelloWorld
    };
    mounted() {
        axios
            .get < animal[] > ('/api/animals')
            .then((response) => {
                this.animals = response.data;
            }).catch(console.log)
    }
}
</script>
