<template>
  <div>
    <div id="post-main">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Post',
  props: ['postData'],
  data() {
    return {
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#post-main {
  display: block;
  width: 100%;
  height: 12vh;
  background-color: #F6F6EF;
}
</style>
