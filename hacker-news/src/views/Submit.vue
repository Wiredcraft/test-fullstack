<template>
  <div>
    <form v-on:submit.prevent="addPost"
      id="registerPostForm">
        <label>Title:</label>
        <input type="text" v-model="post.title" required/>
        <label>Description:</label>
        <input type="text" v-model="post.description" required/>
        <input type="submit"
          class="btn btn-primary"
          value="Add Post"/>
    </form>
  </div>
</template>

<script>

export default {
  name: 'addPost',
  data() {
    return {
      post: {},
    };
  },
  methods: {
    addPost() {
      this.post.dateAdded = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      const uri = 'http://localhost:4000/posts/add';
      this.axios.post(uri, this.post).then(response => console.log(response.data));
    },
  },
};
</script>

<style scoped>
#registerPostForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
