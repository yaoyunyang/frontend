<template>
  <div ref="page">
    <student-header></student-header>
    <div class="student-rank-page">
      <student-rank
        class="plus"
        imgSrc="/student-study-time-rank.png"
        rankTitle="学习时间(秒)"
        rankDescription="不要小看时间"
        :rankList="timeRankList"
        :firstStudent="timeFirst"
        :secondStudent="timeSecond"
        :thirdStudent="timeThird"
        :thisStudent="timeStudent"
        rankType="time"
      ></student-rank>
      <student-rank
        class="plus"
        imgSrc="/hardworking.png"
        rankTitle="勤奋榜"
        rankDescription="日积月累，积少成多"
        :rankList="wordRankList"
        :firstStudent="wordFirst"
        :secondStudent="wordSecond"
        :thirdStudent="wordThird"
        :thisStudent="wordStudent"
        rankType="word"
      ></student-rank>
      <student-rank
        class="plus"
        imgSrc="/student-coin-rank.png"
        rankTitle="本周金币排行榜"
        rankDescription="知识就是财富"
        :rankList="coinRankList"
        :firstStudent="coinFirst"
        :secondStudent="coinSecond"
        :thirdStudent="coinThird"
        :thisStudent="coinStudent"
        rankType="coin"
      ></student-rank>
    </div>
  </div>
</template>

<script>
import StudentRank from '../../components/StudentRank'
import StudentHeader from '../../components/StudentHeader'
import avatar from '../../assets/student_avatar.png'

const axios = require('axios')
export default {
  name: 'WordCard',
  components: {
    StudentRank,
    StudentHeader
  },
  data () {
    return {
      timeRankList: [],
      wordRankList: [],
      coinRankList: [],
      timeFirst: {},
      timeSecond: {},
      timeThird: {},
      timeStudent: {},
      wordFirst: {},
      wordSecond: {},
      wordThird: {},
      wordStudent: {},
      coinFirst: {},
      coinSecond: {},
      coinThird: {},
      coinStudent: {}
    }
  },
  mounted: function () {
    const that = this
    that.getScreenHeight()
    axios
      .get(that.baseUrl + '/words/gettimerank/', {
        params: {}
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.timeRankList = res['data']
          for (var index = 0; index < that.timeRankList.length; index++) {
            if (
              that.timeRankList[index]['name'] ===
              that.cookies.get('info')['name']
            ) {
              that.timeStudent = that.timeRankList[index]
            }
          }
          if (that.timeRankList.length > 10) {
            that.timeRankList = that.timeRankList.slice(0, 10)
          }
          for (var index1 = 0; index1 < that.timeRankList.length; index1++) {
            if (that.timeRankList[index1]['image'] === 'DEFAULT VALUE') {
              that.timeRankList[index1]['image'] = avatar
            }
          }
          that.timeFirst = that.timeRankList[0]
          that.timeSecond = that.timeRankList[1]
          that.timeThird = that.timeRankList[2]
          if (that.timeRankList.length < 3) {
            that.timeThird = {
              image: avatar
            }
          }
          if (that.timeRankList.length < 2) {
            that.timeSecond = {
              image: avatar
            }
          }
          if (that.timeRankList.length < 1) {
            that.timeFirst = {
              image: avatar
            }
          }
          that.timeRankList.splice(0, 3)
        }
      })

    axios
      .get(that.baseUrl + '/words/getwordrank/', {
        params: {}
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.wordRankList = res['data']
          for (var index = 0; index < that.wordRankList.length; index++) {
            if (
              that.wordRankList[index]['name'] ===
              that.cookies.get('info')['name']
            ) {
              that.wordStudent = that.wordRankList[index]
            }
          }
          if (that.wordRankList.length > 10) {
            that.wordRankList = that.wordRankList.slice(0, 10)
          }
          for (var index1 = 0; index1 < that.wordRankList.length; index1++) {
            if (that.wordRankList[index1]['image'] === 'DEFAULT VALUE') {
              that.wordRankList[index1]['image'] = avatar
            }
          }
          that.wordFirst = that.wordRankList[0]
          that.wordSecond = that.wordRankList[1]
          that.wordThird = that.wordRankList[2]
          if (that.wordRankList.length < 3) {
            that.wordThird = {
              image: avatar
            }
          }
          if (that.wordRankList.length < 2) {
            that.wordSecond = {
              image: avatar
            }
          }
          if (that.wordRankList.length < 1) {
            that.wordFirst = {
              image: avatar
            }
          }
          that.wordRankList.splice(0, 3)
        }
      })
    axios
      .get(that.baseUrl + '/words/getcoinrank/', {
        params: {}
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.coinRankList = res['data']
          for (var index = 0; index < that.coinRankList.length; index++) {
            if (
              that.coinRankList[index]['name'] ===
              that.cookies.get('info')['name']
            ) {
              that.coinStudent = that.coinRankList[index]
            }
          }
          if (that.coinRankList.length > 10) {
            that.coinRankList = that.coinRankList.slice(0, 10)
          }
          for (var index1 = 0; index1 < that.coinRankList.length; index1++) {
            if (that.coinRankList[index1]['image'] === 'DEFAULT VALUE') {
              that.coinRankList[index1]['image'] = avatar
            }
          }
          that.coinFirst = that.coinRankList[0]
          that.coinSecond = that.coinRankList[1]
          that.coinThird = that.coinRankList[2]
          if (that.coinRankList.length < 3) {
            that.coinThird = {
              image: avatar
            }
          }
          if (that.coinRankList.length < 2) {
            that.coinSecond = {
              image: avatar
            }
          }
          if (that.coinRankList.length < 1) {
            that.coinFirst = {
              image: avatar
            }
          }
          that.coinRankList.splice(0, 3)
        }
      })
  },
  methods: {
    getScreenHeight () {
      const outter = this.$refs.page
      outter.style.height = window.innerHeight - 69 + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.student-rank-page {
  display: flex;
  justify-content: center;
  background-image: url('../../assets/student_background.png');
  background-size: 100% 100%;
  height: 100%;
}

.plus {
  margin: 0 10px;
}
</style>
