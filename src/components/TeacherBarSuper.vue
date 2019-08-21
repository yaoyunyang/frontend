<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="2" class="el-menu-vertical-demo" :default-openeds="openeds">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>我的信息</span>
          </template>
          <el-menu-item-group>
            <router-link to="/NewTeacher">
              <el-menu-item index="1-1">管理教师账号</el-menu-item>
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
