<template>
  <div id="wrapper">
    <div class="menu-open" v-side-nav:demo="nav">
      <v-icon>menu</v-icon>
    </div>
    <v-side-nav id="demo">
      <ul class="menu">
        <li v-if="!this.$store.state.isAuth"><router-link to="/registration">Реєстрація</router-link></li>
        <li v-if="!this.$store.state.isAuth"><router-link to="/login">Вхід</router-link></li>
        <li v-if="this.$store.state.isAuth && this.$store.state.type == 'user'"><router-link to="/profile">Профіль</router-link></li>
        <li v-if="this.$store.state.isAuth && this.$store.state.type == 'user'"><router-link :to="'/card/'+id">Картка</router-link></li>
        <li v-if="this.$store.state.isAuth && this.$store.state.type == 'doctor'"><router-link to="/doctor/cabinet">Кабінет</router-link></li>
        <li v-if="this.$store.state.isAuth && this.$store.state.type == 'admin'"><router-link to="/admin/panel">Адмінка</router-link></li>
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
      nav: {edge: 'right'},
      id: ''
    }
  },
  methods: {
    logout() {
      this.$store.commit('setJwt', '');
      this.$store.commit('setAuth', false);
      this.$store.commit('setUserType', '');
      this.$router.push('/');
    }
  },
  created: function(){
    this.axios.get('http://localhost:3000/user/get')
    .then(response => {
      this.id = response.data.id
    });
  }
}
</script>

<style>
@import '/assets/css/main.css';
</style>
