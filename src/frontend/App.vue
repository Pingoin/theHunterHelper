<template>
<div id="app">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark" id="nav">
        <a class="navbar-brand" href="#"> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/maps" class="nav-link">Karten</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/callers" class="nav-link">Rufer</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/animals" class="nav-link">Tiere</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/calibers" class="nav-link">Kaliber</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/api/animals" target="_blank">API Tiere</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/api/callers" target="_blank">API Rufer</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/api/calibers" target="_blank">API Kaliber</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/api/maps" target="_blank">API Karten</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="jumbotron text-center" style="margin-bottom: 0">
        <div class="container" style="margin-top: 30px">
            <div class="row">
                <router-view />
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
