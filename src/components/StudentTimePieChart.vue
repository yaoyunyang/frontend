<template>
  <div class="piechart">
    <p>本月学习时间统计（总计：{{totaltime}}秒）</p>
    <ve-pie :data="time" :settings="charSettings" width="400px" height="400px"></ve-pie>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'StudentTimePieChart',
  data () {
    this.charSettings = {
      radius: 70,
      offsetY: 150
    }
    return {
      totaltime: '80',
      time: {
        columns: ['内容', '时间'],
        rows: []
      }
    }
  },
  methods: {
    showPieChart () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showpiechart/', {
          params: {
            studentId: that.cookies.get('id')
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.time['rows'] = res['data']
            that.totaltime = res['data'][0]['时间'] + res['data'][1]['时间']
          }
        })
    }
  },
  mounted: function () {
    this.showPieChart()
  }
}
</script>

<style scoped>
.piechart {
  width: 400px;
  height: 300px;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}
</style>
