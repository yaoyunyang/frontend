<template>
  <div>
    <el-dialog title="我的学习计划" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>经检测本课程带学习的词汇</span>
      <br />
      <span>1690</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.el-dialog__wrapper >>> .el-dialog__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
