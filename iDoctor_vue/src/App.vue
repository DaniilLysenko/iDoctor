<template>
  <div id="wrapper">
    <div class="menu-open" v-side-nav:demo="nav">
      <v-icon>menu</v-icon>
    </div>
    <v-side-nav id="demo">
        <ul>
            <li v-for="n in 5" :key="n">
                <a href="#!">Link</a>
            </li>
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
