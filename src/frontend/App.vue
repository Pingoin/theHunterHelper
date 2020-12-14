<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">The Hunter Helper</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
          <b-nav-item to="/maps" exact exact-active-class="active">Maps</b-nav-item>
          <b-nav-item to="/overview" exact exact-active-class="active">Übersicht</b-nav-item>
          <b-nav-item to="/callers" exact exact-active-class="active">Rufer</b-nav-item>
          <b-nav-item to="/animals" exact exact-active-class="active">Tiere</b-nav-item>
          <b-nav-item to="/calibers" exact exact-active-class="active">Munition</b-nav-item>
          <b-nav-item href="/api/animals" target="_blank">API Tiere</b-nav-item>
          <b-nav-item href="/api/callers" target="_blank">API Rufer</b-nav-item>
          <b-nav-item href="/api/calibers" target="_blank">API Munition</b-nav-item>
          <b-nav-item href="/api/maps" target="_blank">API Karten</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container style="margin-top: 30px">
      <b-row>
        <router-view />
      </b-row>
    </b-container>
  </div>
</template>
