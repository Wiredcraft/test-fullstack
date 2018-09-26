<template>
  <form
    id="talkForm"
    ref="talkForm"
    method="post"
    @submit.prevent
    class="box"
  >
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div>
      <label for="title">title</label>
      <input
        id="title"
        name="title"
        v-model="title"
        type="text"
        placeholder="Add your title..."
      >
    </div>
    <div>
      <label for="description">description</label>
      <textarea
        id="description"
        name="description"
        v-model="description"
        rows="5"
        placeholder="Add your description..."
      ></textarea>
    </div>
    <div>
      <label for="username">username</label>
      <input
        id="username"
        name="username"
        v-model="username"
        type="text"
        placeholder="[Optional] Add your username..."
      >
    </div>

    <div>
      <input
        type="submit"
        value="Submit"
        @click="onSubmit"
      >
      <input
        type="submit"
        value="Reset"
        @click="onReset"
      >
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      title: '',
      description: '',
      username: ''
    };
  },
  methods: {
    checkForm() {
      this.errors = [];

      if (!this.title) {
        this.errors.push('Title required.');
      }

      if (!this.description) {
        this.errors.push('Description required.');
      }

      return !!this.errors.length;
    },
    onSubmit() {
      if (this.checkForm()) return;

      return this.$api.lightningTalk.create({
        title: this.title,
        description: this.description,
        username: this.username
      }).then(() => {
        this.$router.replace({
          name: 'newest'
        });
      }).catch((err) => {
        alert(err);
      });
    },
    onReset() {
      this.$refs['talkForm'].reset();
    }
  }
};
</script>

<style scoped>
.box {
  min-width: 210pt;
  max-width: 340pt;
  margin-top: 10pt;
  text-align: left;
}
label {
  display: inline-block;
  margin-top: 6pt;
  color: #000;
}
input[type=text], textarea {
  width: 100%;
  padding: 6pt;
  display: inline-block;
  border: 1pt solid #ccc;
  border-radius: 4pt;
  margin-top: 6pt;
  box-sizing: border-box;
}
input[type=submit] {
  padding: 4pt 8pt;
  border-radius: 4pt;
  cursor: pointer;
  float: left;
  width: 80pt;
  margin-top: 6pt;
  margin-right: 10pt;
}
</style>
