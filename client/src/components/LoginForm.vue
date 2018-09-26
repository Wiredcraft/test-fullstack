<template>
  <form
    id="login"
    method="post"
    @submit.prevent
    novalidate="true"
    class="box"
  >
    <div v-if="showTips">
      <b>SignUp succedeed, just click SignIn button to logIn yourself</b>
    </div>
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        v-model="email"
        type="email"
      >
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        v-model="password"
        type="password"
      >
    </div>
    <div>
      <input
        type="submit"
        value="SignIn"
        @click="onSignIn"
      >
      <input
        type="submit"
        value="SignUp"
        @click="onSignUp"
      >
    </div>
  </form>
</template>

<script>
import auth from '../middlewares/authentication';

export default {
  data() {
    return {
      showTips: false,
      errors: [],
      email: '',
      password: ''
    };
  },
  methods: {
    checkForm() {
      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }

      return !!this.errors.length;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    onSignIn() {
      if (this.checkForm()) return;

      return auth.login(
        this.email,
        this.password
      ).then(() => {
        if (this.$route.query.redirect) {
          this.$router.replace({
            path: this.$route.query.redirect
          });
        } else {
          this.$router.replace({
            name: 'home'
          });
        }
      }).catch((err) => {
        alert(err);
      });
    },
    onSignUp() {
      if (this.checkForm()) return;

      return this.$api.user.signup({
        email: this.email,
        password: this.password
      }).then((res) => {
        this.showTips = true;
        setTimeout(() => {
          this.showTips = false
        }, 5000);
      }).catch((err) => {
        alert(err);
      });
    }
  }
};
</script>

<style scoped>
.box {
  border: 1pt solid #eee;
  padding: 20pt;
  min-width: 180pt;
  max-width: 240pt;
  margin: auto;
  margin-top: 60pt;
  overflow: hidden;
}
label {
  display: inline-block;
  margin-top: 6pt;
}
input {
  width: 100%;
  padding: 6pt;
  border: 1pt solid #ccc;
  border-radius: 4pt;
  margin-top: 6pt;
  box-sizing: border-box;
}
input[type=submit] {
  padding: 4pt 8pt;
  border-radius: 4pt;
  cursor: pointer;
  float: left;
  width: 80pt;
  margin-right: 10pt;
}
</style>
