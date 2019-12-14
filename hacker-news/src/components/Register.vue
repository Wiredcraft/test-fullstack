<template>
  <div>
    <form v-on:submit.prevent="addUser"
      id="registerUserForm">
        <label>Login:</label>
        <input type="text" v-model="user.login" required/>
        <label>Password:</label>
        <input type="password" v-model="user.password" required/>
        <input type="submit"
          class="btn btn-primary"
          value="Register"/>
    </form>
  </div>
</template>

<script>

export default {
  name: 'register',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    addUser() {
      this.user.dateAdded = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      const uri = 'http://localhost:4000/users/add';
      this.axios.post(uri, this.user).then(response => console.log(response.data));
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
#registerUserForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
