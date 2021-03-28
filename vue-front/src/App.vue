<template>
  <div id="app">
    <el-container>
      <el-container style="height: 100vh; border: 1px solid #eee">
        <el-container style="background-color:#eee">
          <el-header style="text-align: right; font-size: 12px"> </el-header>
          <el-main style="margin: 20px;background-color: #fff;">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      
    }
  },
  components: {
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #999;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-title {
  background-color: #409EFF;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
}

.v-breadcrumb{
  line-height: 30px !important;
  background: #fff;
  padding-left: 20px; 
}
</style>
