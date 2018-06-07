<template>
  <div id="wrapper">
    <div class="menu-open" v-side-nav:demo="nav">
      <v-icon>menu</v-icon>
    </div>
    <v-side-nav id="demo">
      <ul>
        <li v-if="!isAuth"><router-link to="/registration">Реєстрація</router-link></li>
        <li v-if="!isAuth"><router-link to="/login">Вхід</router-link></li>
        <li v-if="isAuth"><router-link to="/profile">Профіль</router-link></li>
      </ul>
    </v-side-nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nav: {edge: 'right'},
      isAuth: this.$store.state.isAuth
    }
  }
}
</script>

<style>
@import '/assets/css/main.css';
</style>
