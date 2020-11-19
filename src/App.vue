<template>
  <b-container fluid>
    <b-navbar id="nav" v-if="loggedIn" type="dark" variant="dark" class="mt-3 mb-3">
      <b-navbar-brand href="/">Snowball Admin</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/projects">Projects</b-nav-item>
        <b-nav-item href="/orders">Orders</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </b-container>
</template>

<script>
import { userService } from '@/api/user';

export default {
  computed: {
    loggedIn() {
      return userService.isLoggedIn();
    }
  }
}
</script>
