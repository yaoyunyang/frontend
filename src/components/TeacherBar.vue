<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="2" class="el-menu-vertical-demo" :default-openeds="openeds">
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>学习管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/ClassList">
              <el-menu-item index="2-1">班级列表</el-menu-item>
            </router-link>
            <router-link to="/StudentList">
              <el-menu-item index="2-2">学生名册</el-menu-item>
            </router-link>
            <router-link to="/ScoreStatistic">
              <el-menu-item index="2-3">学习统计</el-menu-item>
            </router-link>
            <router-link to="/wordMatch">
              <el-menu-item index="2-4">单词比赛</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="toLogin">退出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    toLogin: function () {
      this.$router.push('/')
    }
  },
  data () {
    return {
      openeds: ['1', '2', '3']
    }
  }
}
</script>

<style scoped>
.el-col-12 {
  width: 100% !important;
}

.el-row {
  width: 200px !important;
}
</style>
