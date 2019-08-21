<template>
  <div class="student-statics">
    <p class="report-title">学习报告</p>
    <p class="report-content">学习报告展现了您最近一周内每天学习的单词次数量、本月学习时间、以及测试成绩等数据</p>
    <StudentChart></StudentChart>
    <StudentTimePieChart></StudentTimePieChart>
    <StudentTestScore></StudentTestScore>
  </div>
</template>

<script>
import StudentChart from './StudentChart.vue'
import StudentTimePieChart from './StudentTimePieChart.vue'
import StudentTestScore from './StudentTestScore.vue'
export default {
  components: {
    StudentChart,
    StudentTimePieChart,
    StudentTestScore
  },
  name: '',
  data () {
    return {}
  }
}
</script>

<style scoped>
.student-statics {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.report-title {
  margin-top: 10px;
  font-size: 18px;
}

.report-content {
  font-size: 13px;
  margin-top: 5px;
}
</style>
