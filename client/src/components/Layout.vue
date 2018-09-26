<template>
  <div class="container">
    <ul class="menu">
      <li>
        <router-link to="/talks">talks</router-link>
      </li>
      <li>
        <router-link to="/newest">newest</router-link>
      </li>
      <li>
        <router-link to="/submit">submit</router-link>
      </li>
      <li class="right" @click="toggle">
        <span>{{ authenticated ? 'logout' : 'login' }}</span></li
      >
    </ul>

    <router-view></router-view>
    <footer>
      <div class="sep"></div>
      <div class="center">You see what you want to see</div>
    </footer>
  </div>
</template>

<script>
import auth from '../middlewares/authentication';

export default {
  data() {
    return {
      authenticated: false
    };
  },
  created() {
    this.authenticated = auth.loggedIn();
  },
  methods: {
    toggle() {
      if (auth.loggedIn()) {
        auth.logout();
        this.authenticated = false;
        this.$router.push({ name: 'home' });
      } else {
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath }
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  font-family: Verdana, Geneva, sans-serif;
  font-size: 10pt;
  color: #828282;
  margin-top: 8pt;
  padding: 0 10%;
  min-width: 240pt;
}
.menu {
  overflow: hidden;
  background-color: #ff6600;
  padding: 0;
  margin: 0;
}
.menu a {
  text-decoration: none;
  color: #000;
}
.menu > li {
  float: left;
  list-style: none;
  padding: 4pt 6pt;
}
.menu > li:hover {
  background-color: #ff6600 !important;
  cursor: pointer;
}
.menu > li:focus {
  outline: none;
}
.menu > li a.router-link-active {
  color: #fff;
}
.menu > li:last-child.is-active {
  color: #000;
}
.right {
  float: right !important;
  color: #000;
}
.center {
  text-align: center;
}
footer {
  position: absolute;
  bottom: 20pt;
  left: 10%;
  right: 10%;
}
.sep {
  border: 2px solid #ff6600;
  margin-bottom: 5pt;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .container {
    padding: 0;
    margin: 0;
  }
  .box {
    padding: 10pt;
  }
  footer {
    left: 0;
    right: 0;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .container {
    padding: 0 15%;
  }
  footer {
    left: 15%;
    right: 15%;
  }
}
</style>
