<template>
  <div class="talk">
    <div class="title-line">
      <span>
        {{ title }}
      </span>
      <span class="poll-numeber"
        >poll amount:{{ number }}</span
      >
    </div>

    <div class="content-line">
      <span>
        {{ content }}
      </span>

      <el-button type="primary" @click="addNumber(id)"
        >Poll!
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Talk",
  props: ["id", "title", "content", "number"],
  methods: {
    addNumber(id) {
      this.$emit("add-number", id);
    }
  }
};
</script>

<style scoped>
.talk {
  margin: 10px auto;
  border: 1px solid #000;
}
  .title-line{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content-line{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .poll-numeber {
    color: rgb(208, 148, 148);
    font-size: 14px;
  }
</style>
