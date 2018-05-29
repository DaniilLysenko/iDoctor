<template>
  <div id="wrapper">
    <div class="menu-open" v-side-nav:demo="nav">
      <v-icon>menu</v-icon>
    </div>
    <v-side-nav id="demo">
      <ul>
        <li><router-link to="/registration">Реєстрація</router-link></li>
        <li><router-link to="/login">Вхід</router-link></li>
        <li><router-link to="/simptom">Симптом</router-link></li>
        <li><router-link to="/cart">Оформлення карточки</router-link></li>
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
      nav: {
        edge: 'right'
      }
    }
  }
}
</script>

<style>
@import '/assets/css/main.css';
</style>
