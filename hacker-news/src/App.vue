<template>
  <div id="app">
    <Navigation/>
    <transition name="fade">
      <router-view id="main-content"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from '@/components/MainNavigation.vue';

export default Vue.extend({
  name: 'app',
  components: {
    Navigation,
  },
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main-content {
  padding-top: 8vh;
  width: 100vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transition: opacity 0s;
}
</style>
