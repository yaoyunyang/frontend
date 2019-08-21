<template>
  <div class="pk-timer">
    <img src="../assets/pk-clock.png" />
    <label class="count-down">{{minute}}: {{second}}</label>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    whichTimer: {}
  },
  data () {
    return {
      minute: '0',
      second: '45',
      isStart: ''
    }
  },
  mounted () {
    const that = this
    that.minute = that.toTwoChar(parseInt(that.minute))
    that.second = that.toTwoChar(parseInt(that.second))
    that.isStart = setInterval(that.countDown, 1000)
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
        this.$emit('timeOver')
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
  right: 0.9em;
  bottom: 0.15em;
  font-size: 1.8em;
  color: #f5a641;
  font-weight: 500;
  user-select: none;
}
</style>
