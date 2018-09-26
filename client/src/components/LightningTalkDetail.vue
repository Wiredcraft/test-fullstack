<template>
  <div class="box">
    <div class="wrapper">
      <div class="up" @click="upToggle">
        <span v-if="talk.upped" class="primary-color">&#9650;</span>
        <span v-else>&#9650;</span>
      </div>
      <div class="title-wrapper">
        <div class="title">{{ talk.title }}</div>
        <div class="meta" v-if="talk.upCounts && talk.uper">{{ talk.upCounts }} points by {{ talk.uper.username }} {{ talk.uper.timeago }}</div>
        <div class="meta" v-else>no points yet</div>
      </div>
    </div>
    <div class="description">{{ talk.description }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      talk: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    upToggle() {
      const handler = this.talk.upped ?
        this.$api.lightningTalk.down :
        this.$api.lightningTalk.up;
      return handler({
        id: this.talk.id
      }).then(() => {
        this.talk.upped = !this.talk.upped;
        return this.fetchData();
      }).catch((err) => {
        alert(err);
      });
    },
    fetchData() {
      return this.$api.lightningTalk.detail({
        id: this.$route.params.id
      }).then((res) => {
        this.talk = res.data;
      }).catch((err) => {
        alert(err);
      });
    }
  }
};
</script>

<style scoped>
.box {
  padding-top: 10pt;
}
.wrapper {
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
}
.wrapper > div {
  margin-right: 10pt;
}
.wrapper > div:last-child {
  margin-right: 0;
}
.up {
  color: #888;
  cursor: pointer;
}
.title {
  color: #000;
  font-size: 12pt;
  line-height: 14pt;
}
.meta {
  font-size: 10pt;
  line-height: 12pt;
}
.description {
  margin-top: 16pt;
}
</style>
