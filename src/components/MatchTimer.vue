<template>
  <div class="pk-timer">
    <img src="../assets/match-timer.png" />
    <div class="time">
      <label class="count-down">{{second}}</label>
    </div>
    <span class="time-second">s</span>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      second: '6',
      isStart: ''
    }
  },
  mounted () {
    const that = this
    that.isStart = setInterval(that.countDown, 1000)
  },
  methods: {
    countDown: function () {
      const that = this
      if (that.second > 0) {
        that.second -= 1
      }
    }
  }
}
</script>

<style scoped>
.pk-timer {
  display: inline-block;
  position: relative;
}

.time {
  position: absolute;
  width: 60px;
  right: 60px;
  height: 30px;
  bottom: 30px;
  font-size: 35px;
  color: #fff;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.time-second {
  display: inline-block;
  position: absolute;
  bottom: 15px;
  right: 37px;
  font-size: 40px;
  color: #fff;
  font-weight: 500;
  padding-bottom: 1px;
}
</style>
