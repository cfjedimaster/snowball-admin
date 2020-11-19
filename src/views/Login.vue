<template>

  <b-row align-v="center" align-h="center" class="vh-100">
    <b-col cols="6" >

      <b-form @submit.prevent="login">
        <b-row class="mb-3">
          <b-col>
            <label for="email">Email:</label>
          </b-col>
          <b-col>
            <b-form-input
            id="email"
            v-model="email"
            type="email"
            required
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col>
            <label for="password">Password:</label>
          </b-col>
          <b-col>
            <b-form-input id="password" v-model="password" type="password" required></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col></b-col>
          <b-col><b-button type="submit" variant="primary">Login</b-button></b-col>
        </b-row>

      </b-form>
    </b-col>
  </b-row>

</template>

<script>
import { userService } from '@/api/user';

export default {
  data() {
    return {
      email:'',
      password:''
    }
  },
  methods: {
    login() {
      if(this.email === '' || this.password === '') return;
      console.log('attempt login');
      console.log('userService', userService);
      userService.login(this.email, this.password);
    }
  }
}
</script>
