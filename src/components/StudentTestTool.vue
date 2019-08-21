<template>
  <div>
    <div class="tool-header">
      <p>道具</p>
    </div>
    <div class="tool-footer">
      <div class="decrease-tool" @click="decreaseError">
        <div class="decrease-tool-border">
          <img src="../assets/student_decrease_false_times.png" alt="decrease flase times" />
        </div>
        <p>错误次数-1</p>
        <div class="info">
          <h3>消耗10金币</h3>
        </div>
      </div>
      <div class="add-tool" @click="addTime">
        <div class="add-tool-border">
          <img src="../assets/student_add_answer_time.png" alt="add answer time" />
        </div>
        <p>答题时间+5s</p>
        <div class="info">
          <h3>消耗5金币</h3>
        </div>
      </div>
    </div>
    <!--提示弹框 -->
    <el-dialog title="提示" :visible.sync="alertVisible" width="30%">
      <span>{{pkResult}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alertVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentTestTool',
  components: {},
  methods: {
    decreaseError: function () {
      this.$emit('decrease', 0)
    },
    addTime: function () {
      this.$emit('add', 0)
    }
  },
  props: {},
  data () {
    return {
      alertVisible: false
    }
  }
}
</script>

<style scoped>
.tool-header {
  background-color: #2eb4ff;
  width: 150px;
  height: 47px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.tool-footer {
  background-color: #eff9ff;
  width: 150px;
  height: 300px;
  display: block;
  padding-left: 35px;
  padding-top: 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.decrease-tool {
  text-align: center;
  width: 80px;
  height: 120px;
  font-size: 13px;
  color: #2eb4ff;
}

.decrease-tool .info {
  position: relative;
  margin-top: -104px;
  width: 81px;
  height: 105px;
  text-align: center;
  padding-top: 41px;
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}

.add-tool .info {
  position: relative;
  margin-top: -104px;
  width: 81px;
  height: 105px;
  text-align: center;
  padding-top: 41px;
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}

.decrease-tool .info:hover {
  opacity: 1;
}

.add-tool {
  width: 80px;
  text-align: center;
  color: #ff6900;
  font-size: 13px;
}

.add-tool .info:hover {
  opacity: 1;
}

.decrease-tool-border {
  width: 80px;
  height: 80px;
  background-color: #2eb4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 3px;
}

.add-tool-border {
  width: 80px;
  height: 80px;
  border: 4px solid #ff6900;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 3px;
}

.tool-footer img {
  width: 50px;
  height: 50px;
}
</style>
