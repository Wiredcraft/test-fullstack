<template>
  <div class="home">
    <PostList></PostList>
  </div>
</template>

<script>
import PostList from '@/components/PostsList.vue';

export default {
  name: 'home',
  components: {
    PostList,
  },
};
</script>
