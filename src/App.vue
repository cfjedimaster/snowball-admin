<template>
  <b-container fluid>
    <b-navbar id="nav" v-if="loggedIn" type="dark" variant="dark" class="mt-3 mb-5">
      <b-navbar-brand href="/">Snowball Admin</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/projects">Projects</b-nav-item>
        <b-nav-item href="/owners">Owners</b-nav-item>
        <b-nav-item href="/orders">Orders</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </b-container>
</template>

<script>
import { userService } from '@/api/user';

export default {
  created() {
    this.$store.dispatch('checkLoginState');
  },
  methods: {
    async logout() {
      console.log('perform logout');
      await this.$store.dispatch('logout');
      this.$router.replace('/login');
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  }
}
</script>
