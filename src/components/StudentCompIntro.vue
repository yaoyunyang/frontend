<template>
  <div class="student-comp-Intro">
    <div class="comp-top-css">
      <div class="comp-name">{{thisMatch.matchName}}</div>
      <div class="comp-time">
        <div class="comp-time-top">
          <img src="../assets/student-comp-intro-time.png" />
          <span class="comp-time-top-right">比赛状态</span>
        </div>
        <div class="comp-time-bottom">{{thisMatch.status}}</div>
      </div>
      <div class="comp-range">
        <div class="comp-range-top">
          <img src="../assets/student-comp-intro-range.png" />
          <span class="comp-range-top-right">比赛范围</span>
        </div>
        <div class="comp-range-bottom">{{matchMessage.organization}}</div>
      </div>
      <div class="comp-content">
        <div class="comp-content-top">
          <img src="../assets/student-comp-intro-content.png" />
          <span class="comp-content-top-right">比赛规则</span>
        </div>
        <div class="comp-content-bottom">
          <ul>
            <li>收费:{{matchMessage.fee}}</li>
            <li>使用教材:{{matchMessage.word_book}}</li>
            <li>题型:{{matchMessage.question}}</li>
            <li v-if="matchMessage.tool">可以使用道具</li>
          </ul>
        </div>
      </div>
      <div class="comp-award">
        <div class="comp-award-top">
          <img src="../assets/student-comp-intro-award.png" />
          <span class="comp-award-top-right">比赛奖励</span>
        </div>
        <div
          class="comp-award-bottom"
        >{{matchMessage.reward_limt}}的{{matchMessage.reward_num}}获得{{matchMessage.reward}}金币</div>
      </div>
      <div class="comp-rule">
        <div class="comp-rule-top">
          <img src="../assets/student-comp-intro-rule.png" />
          <span class="comp-rule-top-right">比赛类型</span>
        </div>
        <div class="comp-rule-bottom">{{matchMessage.type}}</div>
      </div>
    </div>
    <div class="comp-btn">
      <button class="comp-btn-join" v-if="ableToJoin" @click="feeChoose">开始比赛</button>
      <button class="comp-btn-challenge" @click="backList">比赛列表</button>
    </div>
    <!--提示弹框 -->
    <el-dialog title="提示" :visible.sync="alertVisible" width="30%">
      <span>此次比赛需花费{{matchMessage.fee}}金币，是否继续参加？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alertVisible = false">取 消</el-button>
        <el-button type="primary" @click="startFeeMatch">确 定</el-button>
      </span>
    </el-dialog>
    <!--提示弹框 -->
    <el-dialog title="提示" :visible.sync="coinAlertVisible" width="30%">
      <span>金币数量不足</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="coinAlertVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'StudentCompIntro',
  data () {
    return {
      ableToJoin: false,
      matchMessage: {},
      alertVisible: false,
      coinAlertVisible: false,
      coin: ''
    }
  },
  props: ['thisMatch'],
  methods: {
    coinChange (val) {
      const that = this
      axios
        .get(that.baseUrl + '/words/coinchange/', {
          params: {
            studentId: that.cookies.get('id'),
            coinChange: val
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.coin = res['data']
          }
        })
    },
    backList () {
      this.$emit('backList')
    },
    startMatch () {
      if (this.thisMatch.type === 'pk排位') {
        axios.get(this.baseUrl + '/words/hasmatch/', {
          params: {
            studentId: this.cookies.get('id'),
            matchName: this.thisMatch.matchName
          }
        })
        this.$router.push({
          path: '/PkPage',
          name: 'PkPage',
          query: {
            matchMessage: this.matchMessage
          }
        })
      } else {
        axios.get(this.baseUrl + '/words/hasmatch/', {
          params: {
            studentId: this.cookies.get('id'),
            matchName: this.thisMatch.matchName
          }
        })
        this.$router.push({
          path: '/MatchPage',
          name: 'MatchPage',
          query: {
            matchMessage: this.matchMessage
          }
        })
      }
    },
    startFeeMatch () {
      if (this.matchMessage.fee > this.coin) {
        this.alertVisible = false
        this.coinAlertVisible = true
      } else {
        this.alertVisible = false
        this.coinChange(-1 * this.matchMessage.fee)
        this.startMatch()
      }
    },
    feeChoose () {
      if (this.matchMessage.fee !== 0) {
        this.alertVisible = true
      } else {
        this.startMatch()
      }
    }
  },
  mounted: function () {
    const that = this
    that.coinChange(0)
    if (this.thisMatch.status === '进行中') {
      this.ableToJoin = true
    }
    axios
      .get(that.baseUrl + '/words/getamatch/', {
        params: {
          match_id: that.thisMatch.matchName
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.matchMessage = res['data'][0]
        }
      })
  }
}
</script>

<style scoped>
.student-comp-Intro {
  width: 250px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
}

.comp-name {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 30px;
}

.comp-top-css {
  width: 250px;
  margin: 20px 0 0 0;
}

.comp-time,
.comp-range,
.comp-content,
.comp-award,
.comp-rule {
  margin-bottom: 18px;
}

.comp-time-top,
.comp-range-top,
.comp-content-top,
.comp-award-top,
.comp-rule-top {
  display: flex;
  margin-bottom: 8px;
}

.comp-time-top-right,
.comp-range-top-right,
.comp-content-top-right,
.comp-award-top-right,
.comp-rule-top-right {
  font-size: 15px;
  color: #000;
  margin-left: 10px;
}

.comp-time-bottom,
.comp-range-bottom,
.comp-content-bottom,
.comp-award-bottom,
.comp-rule-bottom {
  color: #878787;
  margin-left: 30px;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.comp-btn {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 164px;
}

.comp-btn-join,
.comp-btn-challenge {
  width: 200px;
  height: 40px;
  border-radius: 40px;
  font-size: 15px;
  color: #fff;
}

.comp-btn-join {
  background-color: #4ac767;
  outline: none;
  border: none;
  box-shadow: #dff5e4 0 0 6px 6px;
  margin-bottom: 20px;
}

.comp-btn-join:hover {
  background-color: #7de487;
}

.comp-btn-challenge {
  background-color: #ffb128;
  border: none;
  outline: none;
  box-shadow: #ffedcc 0 0 6px 6px;
}

.comp-btn-challenge:hover {
  background-color: #eec076;
}
</style>
