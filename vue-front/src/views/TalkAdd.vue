<template>
  <div>
    <h1 style="margin-bottom:40px">add talk</h1>
    <el-form
      status-icon
      :model="talkForm"
      :rules="rules"
      ref="talkForm"
      class="demo-ruleForm"
    >
      <el-form-item label="please talk title" prop="title">
        <el-input v-model="talkForm.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="please talk content" prop="content">
        <el-input
          type="textarea"
          v-model="talkForm.content"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addtalk()">submit</el-button>
        <el-button @click="resetForm('talkForm')">reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import talkModel from "@/global/service/talk";

export default {
  data() {
    return {
      talkForm: {
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "enter title", trigger: "blur" }],
        content: [{ required: true, message: "enter content", trigger: "blur" }]
      }
    };
  },
  methods: {
    addtalk() {
      let title = this.talkForm.title;
      let content = this.talkForm.content;

      if (!title || !content) {
        this.$message.error("params required");
        return;
      }

      talkModel
        .insert({ title, content })
        .then(() => {
          this.$router.replace({ name: "Talk" });
          this.$message.success("talk created");
        })
        .catch(() => {
          this.$message.error("failed");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style></style>
