<template>
    <nav id="top-nav">
      <div id="top-nav-wrapper">
        <img id="top-nav__img" :src="logoImgPath" alt="LogoImg">
        <p id="top-nav__title">Hacker News</p>
        <ul class="top-nav-links">
          <li>
            <router-link :to="{ name: 'new' }" class="router-link">New</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'past' }" class="router-link">Past</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'comments' }" class="router-link">Comments</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ask' }" class="router-link">Ask</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'show' }" class="router-link">Show</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'jobs' }" class="router-link">Jobs</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'submit' }" class="router-link">Submit</router-link>
          </li>
        </ul>
        <p id="top-nav__account">
          <router-link
            :to="{ name: 'login' }"
            class="router-link">
            Login
          </router-link>
        </p>
      </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopNav',
  data() {
    return {
      logoImgPath: '/img/hnlogo.jpg',
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#top-nav-wrapper {
  display: grid;
  grid-template-columns: 8vw 1fr 10vw;
  grid-template-rows: 4vh 4vh;
  grid-template-areas:
    "logo title login"
    "logo nav login";
  background-color: #FF6600;
}

#top-nav__img {
  grid-area: logo;
  width: 22px;
  height: 22px;
  align-self: center;
  justify-self: center;
}

#top-nav__title {
  grid-area: title;
  color: black;
  align-self: center;
  justify-self: start;
  font-weight: bold;
}

.top-nav-links {
  grid-area: nav;
  display: flex;
  justify-content: start;
  align-items: center;
  color: black;
}

.top-nav-links li {
  list-style: none;
  padding-right: 8px;
  padding-left: 8px;
  border-right: 1px solid black;
}

.top-nav-links li:first-child {
  padding-left: 0;
}

.top-nav-links li:last-child {
  border-right: none;
}

.top-nav-links .router-link {
  color: black;
  text-decoration: none;
  font-size: calc(1px + 2vmin);
}

#top-nav__account {
  grid-area: login;
  align-self: center;
  justify-self: center;
  text-decoration: none;
  color: black;
}

#top-nav__account .router-link {
  color: black;
  text-decoration: none;
  font-size: calc(1px + 2vmin);
  font-weight: bold;
}

@media screen and (max-width: 768px) {
}
</style>
