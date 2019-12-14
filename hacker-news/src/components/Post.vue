<template>
  <div>
    <div id="post-main">
      <div id="post-box">
        <div id="post-like">
          <p>{{ index + 1 }}</p>
          <p @click="likePost">&uArr;</p>
        </div>
        <div id="post-body">
          <p>{{ postData.title }}</p>
          <p>{{ postData.description }}</p>
          <p>{{ postData.dateAdded }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Post',
  props: ['index', 'postData'],
  data() {
    return {
    };
  },
  methods: {
    likePost() {
      const post = this.postData;
      post.likesAmount += 1;
      const uri = 'http://localhost:4000/posts/like/';
      this.axios.post(uri, post).then(response => console.log(response.data));
    },
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

#post-box {
  display: grid;
  grid-template-columns: 10vw 1fr;
  grid-template-rows: 100%;
}

#post-like {
  grid-column: 1;
  grid-row: 1;
}

#post-body {
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  justify-self: start;
}
</style>
