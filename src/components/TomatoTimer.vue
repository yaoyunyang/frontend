<template>
  <div class="pk-timer" >
    <img src="../assets/tomato-timer.png" />
    <label class="count-down">{{minute}}: {{second}}</label>
  </div>
</template>

<script>
import Bus from '../bus.js'
export default {
  name: '',
  data () {
    return {
      minute: '0',
      second: '25',
      isStart: ''
    }
  },
  mounted () {
    const that = this
    that.minute = that.toTwoChar(parseInt(that.minute))
    that.second = that.toTwoChar(parseInt(that.second))
    that.isStart = setInterval(that.countDown, 1000)
    Bus.$on('showStudy', () => {
      that.minute = '0'
      that.second = '25'
      that.second = that.toTwoChar(parseInt(that.second))
      that.isStart = setInterval(that.countDown, 1000)
    })
  },
  methods: {
    countDown: function () {
      const that = this
      let tempMinute = that.minute
      let tempSecond = that.second
      if (tempSecond > 0) {
        tempSecond -= 1
      } else if (tempSecond <= 0 && tempMinute > 0) {
        tempSecond = 59
        tempMinute -= 1
      }
      if (tempMinute <= 0 && tempSecond <= 0) {
        clearInterval(that.isStart)
        this.$emit('timeToRest')
        Bus.$emit('restNoMusic')
      }
      that.minute = that.toTwoChar(tempMinute)
      that.second = that.toTwoChar(tempSecond)
    },
    toTwoChar: function (number) {
      let str = number.toString()
      if (str.length === 0) {
        str = '00'
      } else if (str.length === 1) {
        str = '0' + str
      }
      return str
    }
  }
}
</script>

<style scoped>
.pk-timer {
  display: inline-block;
  position: relative;
}

.count-down {
  position: absolute;
  right: 0.7em;
  bottom: 0;
  font-size: 2.2em;
  color: #fff;
  font-weight: 500;
  user-select: none;
}
</style>
