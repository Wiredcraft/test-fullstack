<template>
  <div>
    <div style="padding: 10px; overflow: hidden; background: #eee">
      <h1>Talk list</h1>
      <el-button style="float: right" size="mini" @click="addTalk()"
        >add talk
      </el-button>
    </div>
    <div v-for="talk in tableData" :key="talk.id" style="margin-top: 5px">
      <talk
        :title="talk.title"
        :content="talk.content"
        :id="talk.id"
        :number="talk.number"
        @add-number="addNumber"
      ></talk>
    </div>
  </div>
</template>

<script>
import talkModel from "@/global/service/talk";
import talk from "@/components/talk";
export default {
  components: {
    talk
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      search: "",
      total: 0,
      deleteId: ""
    };
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      talkModel.list().then(res => {
        this.tableData = res;
        let totalNum = res.length;
        this.total = totalNum;
      });
    },
    addTalk() {
      this.$router.push({ name: "TalkAdd" });
    },
    addNumber(id) {
      talkModel
        .update(id)
        .then(res => {
          this.$message.info(res);
          this.render();
        })
        .catch(e => {
          this.$message.error(e.message);
        });
    }
  }
};
</script>

<style scoped>
h1 {
  float: left;
}
</style>
