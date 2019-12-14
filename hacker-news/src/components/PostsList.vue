<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post._id">
        <Post
          :postData="post"></Post>
      </li>
    </ul>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';

export default {
  name: 'PostList',
  data() {
    return {
      posts: {},
    };
  },
  created() {
    this.getPosts();
  },
  components: {
    Post,
  },
  mthods: {
    getPosts() {
      const uri = 'http://localhost:4000/posts/fetch';
      this.axios.get(uri).then((response) => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
  },
};
</script>

<style scoped>
ul {
  width: 100vw;
}

</style>
