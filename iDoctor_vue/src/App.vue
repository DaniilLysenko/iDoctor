<template>
  <div id="wrapper">
    <div class="menu-open" v-side-nav:demo="nav">
      <v-icon>menu</v-icon>
    </div>
    <v-side-nav id="demo">
      <ul class="menu">
        <li v-if="!this.$store.state.isAuth"><router-link to="/registration">Реєстрація</router-link></li>
        <li v-if="!this.$store.state.isAuth"><router-link to="/login">Вхід</router-link></li>
        <li v-if="this.$store.state.isAuth && this.$store.state.type == 'user'"><router-link to="/profile" class="btn">Профіль</router-link></li>
        <li v-if="this.$store.state.isAuth && this.$store.state.type == 'admin'"><router-link to="/admin/panel" class="btn">Адмінка</router-link></li>
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
      this.$store.commit('setUserType', '');
      this.$router.push('/');
    }
  }
}
</script>

<style>
@import '/assets/css/main.css';
</style>
