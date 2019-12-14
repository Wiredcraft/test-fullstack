<template>
  <div>
    <ul>
      <li v-for="(post, index) in posts" :key="post._id">
        <Post
          :index="index"
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
  methods: {
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
