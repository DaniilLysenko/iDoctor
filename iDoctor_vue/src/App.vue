<template>
  <div id="wrapper">
    <div class="menu-open" v-side-nav:demo="nav">
      <v-icon>menu</v-icon>
    </div>
    <v-side-nav id="demo">
      <ul>
        <li v-if="!this.$store.state.isAuth"><router-link to="/registration">Реєстрація</router-link></li>
        <li v-if="!this.$store.state.isAuth"><router-link to="/login">Вхід</router-link></li>
        <li v-if="this.$store.state.isAuth"><router-link to="/profile">Профіль</router-link></li>
        <button class="btn logout" v-if="this.$store.state.isAuth" @click="logout">Вийти</button>
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
      nav: {edge: 'right'}
    }
  },
  methods: {
    logout() {
      this.$store.commit('setJwt', '');
      this.$store.commit('setAuth', false);
      this.$router.push('/');
    }
  }
}
</script>

<style>
@import '/assets/css/main.css';
</style>
