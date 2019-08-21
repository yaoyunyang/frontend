<template>
  <div>
    <div class="background"></div>
    <div class="rest-page">
      <div class="center-part">
        <img src="../../assets/rest-page.png" />
        <div class="center-right">
          <span class="center-right-top-words">嗨一下，帮你保持专注</span>
          <div class="center-right-bottom">
            <img src="../../assets/time-funnel.png" />
            <span class="center-right-bottom-words">{{minute}}: {{second}}</span>
          </div>
        </div>
      </div>
      <div class="bottom-part" :class="isShow" v-if="showBtn">
        <div class="bottom-words bottom-word-plus">5分钟休息时间结束，即将进入下一番茄时间</div>
        <div class="bottom-words">你准备好了吗</div>
        <button @click="goOnStudy">开始专注</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../bus.js'
export default {
  name: '',
  props: {
    isShow: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      minute: '0',
      second: '5',
      isStart: '',
      showBtn: false
    }
  },
  methods: {
    goOnStudy () {
      this.$emit('showStudy')
      Bus.$emit('showStudy')
      Bus.$emit('studyHasMusic')
    },
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
        that.showBtn = true
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
  },
  mounted () {
    const that = this
    that.minute = that.toTwoChar(parseInt(that.minute))
    that.second = that.toTwoChar(parseInt(that.second))
    that.isStart = setInterval(that.countDown, 1000)
  }
}
</script>

<style scoped>
button {
  outline: 0;
}

.rest-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.background {
  background: #d7d7d7;
  opacity: 0.21;
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.center-part {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
}

.center-right {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  color: #333;
}

.center-right-top-words {
  display: inline-block;
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 30px;
}

.center-right-bottom {
  display: inline-flex;
  align-items: center;
}

.center-right-bottom-words {
  display: inline-block;
  margin-left: 20px;
  font-size: 1.2em;
  color: #333;
}

.bottom-part {
  position: absolute;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom-words {
  font-size: 2em;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
}

.bottom-word-plus {
  margin-bottom: 30px;
}

.bottom-part button {
  width: 140px;
  height: 40px;
  background-color: #169bd5;
  color: #fff;
  border-width: 0;
  font-size: 13px;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
}

.bottom-status {
  display: none;
}
</style>
