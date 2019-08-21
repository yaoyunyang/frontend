<template>
  <div class="student-chart">
    <ve-histogram :data="chartData" :settings="chartSettings" width="400px" height="300px"></ve-histogram>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  components: {},
  name: '',
  data () {
    this.chartSettings = {
      showLine: ['趋势曲线']
    }
    return {
      chartData: {}
    }
  },
  methods: {
    showWeekWords () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showweekwords/', {
          params: {
            studentId: that.cookies.get('id')
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.chartData = res['data']
          }
        })
    }
  },
  mounted: function () {
    this.showWeekWords()
  }
}
</script>

<style scoped>
.student-chart {
  width: 500px;
  margin-top: 10px;
}
</style>
