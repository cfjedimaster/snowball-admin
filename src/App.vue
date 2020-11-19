<template>
  <b-container fluid>
    <div id="nav" v-if="loggedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </b-container>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return false;
    }
  }
}
</script>
