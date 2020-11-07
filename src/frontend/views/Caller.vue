<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Rufer<span class="arrow"></span></th>
                <th scope="col">Reichweite<span class="arrow"></span></th>
                <th scope="col">Tiere<span class="arrow"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="caller in callers" v-bind:key="caller.callerID">
                <td>{{caller.callerID}}</td>
                <td>{{caller.range}}</td>
                <td>
                    <ul>
                        <li v-for="animal in caller.animals" :key="animal"> {{animal}}</li>
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
import caller from "../../shared/caller"

@Component
export default class Caliber extends Vue {
    private callers = new Array < caller > ();
    private components = {};
    mounted() {
        axios
            .get < caller[] > ('/api/callers')
            .then((response) => {
                this.callers = response.data;
            }).catch(console.log)
    }
}
</script>
