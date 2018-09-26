<template>
  <div class="box">
    <ul v-if="talks.length">
      <li v-for="(talk, index) in talks" :key="talk.id" class="wrapper">
        <div class="no">{{ index + (page - 1) * size + 1 }}.</div>
        <div class="up" @click="upToggle(index)">
          <span v-if="talk.upped" class="primary-color">&#9650;</span>
          <span v-else>&#9650;</span>
        </div>
        <div class="content">
          <div class="title">
            <router-link :to="{ name: 'talk', params: { id: talk.id } }">{{ talk.title }}</router-link>
          </div>
          <div class="meta" v-if="talk.upCounts && talk.uper">{{ talk.upCounts }} points by <i>{{ talk.uper.username }}</i> {{ talk.uper.timeago }}</div>
          <div class="meta" v-else>no points yet</div>
        </div>
      </li>
    </ul>
    <div v-else class="empty">There's no talk data yet, click <router-link to="/submit"><b class="primary-color">submit</b></router-link> and add one</div>

    <div class="bottom" @click="getMore" v-if="hasMore">More&gt;</div>
  </div>
</template>

<script>
import auth from '../middlewares/authentication';

export default {
  data() {
    return {
      loading: false,
      talks: [],
      page: 1,
      size: 10,
      hasMore: true
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    '$route': 'refreshData'
  },
  methods: {
    upToggle(index) {
      if (!auth.loggedIn()) {
        return this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath }
        });
      }

      const talk = this.talks[index];
      const handler = talk.upped ?
        this.$api.lightningTalk.down :
        this.$api.lightningTalk.up;

      return handler({
        id: talk.id
      }).then(() => {
        talk.upped = !talk.upped;
        return this.refreshData()
      }).catch((err) => {
        alert(err);
      });
    },
    refreshData() {
      this.page = 1;
      this.talks = [];
      this.hasMore = true;
      this.fetchData();
    },
    fetchData() {
      if (this.loading) return;

      this.loading = true;
      return this.$api.lightningTalk.list({
        filter: {
          order: this.$route.name === 'newest' ?
            'createdAt DESC' :
            'upCounts DESC',
          skip: (this.page - 1) * this.size,
          limit: this.size
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.length == 0) {
          this.hasMore = false;
          if (this.page > 1) {
            this.page -= 1;
          }
          return;
        }

        this.talks = res.data;
        if (this.talks.length < this.size) this.hasMore = false;
      }).catch((err) => {
        alert(err);
      });
    },
    getMore() {
      if (this.hasMore) {
        this.page += 1;
        return this.fetchData();
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
}
ul li {
  padding-top: 10pt;
}
.wrapper { display: flex;
  flex-wrap: no-wrap;
  align-items: center;
}
.wrapper a {
  color: #000;
  text-decoration: none;
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
.primary-color {
  color: #ff6600;
}
.meta {
  font-size: 10pt;
  line-height: 12pt;
}
.empty {
  margin-top: 12pt;
}
a {
  text-decoration: none;
}
.bottom {
  position: absolute;
  bottom: 50pt;
  cursor: pointer;
}
</style>
