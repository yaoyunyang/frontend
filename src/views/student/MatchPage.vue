<template>
  <div ref="page">
    <student-header></student-header>
    <div ref="background" id="compete-background">
      <div class="compete-content">
        <div class="coin">
          <img src="../../assets/student_coin.png" />
          <label>{{coin}}</label>
        </div>
        <div class="tool">
          <student-test-tool @decrease="decrease" @add="add"></student-test-tool>
        </div>
        <div class="right-bar">
          <progress-bar-left leftPercentage="0" ref="rightbar"></progress-bar-left>
        </div>
        <div class="timer">
          <match-timer ref="timer"></match-timer>
        </div>
        <div class="false-time">
          <student-test-false-time ref="error"></student-test-false-time>
        </div>
        <div class="right-portrait">
          <StudentHeadPortrait class="right-avatar" :src="this.cookies.get('info').image"></StudentHeadPortrait>
          <p>{{this.cookies.get('info').name}}</p>
        </div>
        <div class="question-content"><h1>{{questionList[next].question}}</h1></div>
        <div class="button-group">
          <StudentChoiceButton
            :answer="item.answer"
            :key="index"
            :index="index"
            v-for="(item, index) in questionList[next].answerList"
            :right_index="questionList[next].rightIndex"
            class="before-choice"
            v-on:scoreChange="scoreChange"
            ref="choise"
          ></StudentChoiceButton>
        </div>
        <el-button class="exit-the-contest" @click="matchBack">退出</el-button>
      </div>
      <!--提示弹框 -->
      <el-dialog title="提示" :visible.sync="alertVisible" width="30%">
        <span>总得分：{{leftPercentage}} 你将获得{{parseInt(leftPercentage/10)}}金币</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="matchBack">确 定</el-button>
        </span>
      </el-dialog>
      <!--提示弹框 -->
      <el-dialog title="提示" :visible.sync="coinAlertVisible" width="30%">
        <span>金币数量不足</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="coinAlertVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--提示弹框 -->
      <el-dialog title="提示" :visible.sync="unEnableVisible" width="30%">
        <span>错误次数为0，暂不可用</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="unEnableVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import StudentHeader from '../../components/StudentHeader.vue'
import StudentHeadPortrait from '../../components/StudentHeadPortrait.vue'
import StudentChoiceButton from '../../components/StudentChoiceButton.vue'
import ProgressBarLeft from '../../components/ProgressBarLeft'
import MatchTimer from '../../components/MatchTimer'
import StudentTestFalseTime from '../../components/StudentTestFalseTime'
import StudentTestTool from '../../components/StudentTestTool'

const axios = require('axios')
export default {
  name: 'PkPage',
  components: {
    StudentHeader,
    StudentHeadPortrait,
    StudentChoiceButton,
    ProgressBarLeft,
    MatchTimer,
    StudentTestFalseTime,
    StudentTestTool
  },
  data () {
    return {
      questionList: [
        {
          question: 'test',
          answerList: [
            {
              id: '1',
              answer: '我很好'
            },
            {
              id: '1',
              answer: '要你管'
            },
            {
              id: '1',
              answer: '测试'
            },
            {
              id: '1',
              answer: '没关系'
            }
          ],
          rightIndex: 2,
          robotIndex: 1
        }
      ],
      coin: 100,
      next: 0,
      leftPercentage: 0,
      addTimer: '',
      iniTimer: '',
      showTimer: '',
      alertVisible: false,
      coinAlertVisible: false,
      unEnableVisible: false,
      matchMessage: ''
    }
  },
  methods: {
    matchBack () {
      this.alertVisible = false
      this.$router.push({
        path: '/StudentMain',
        name: 'StudentMain'
      })
    },
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
    con () {
      this.$refs.rightbar.leftPercentage = this.leftPercentage
    },
    change () {
      this.$refs.timer.second = 6
      let currentTime = this.questionList[this.next].rightIndex
      this.$refs.choise[currentTime].$refs.button.className = 'before-choice'
      this.next += 1
    },
    scoreChange (val, index) {
      this.leftPercentage = this.leftPercentage + val
      let currentTime = this.questionList[this.next].rightIndex
      this.$refs.choise[currentTime].$refs.button.className = 'true-choice'
      this.$refs.rightbar.leftPercentage = this.leftPercentage
      this.addTimer = setTimeout(this.change, 1000)
      if (val === 0) {
        this.$refs.error.falsetime += 1
        if (this.$refs.error.falsetime >= 3) {
          this.alertVisible = true
          this.saveScore()
          this.coinChange(parseInt(this.leftPercentage / 10))
        }
      }
    },
    getScreenHeight () {
      const background = this.$refs.background
      const outter = this.$refs.page
      outter.style.height = window.innerHeight + 'px'
      const totalHeight = window.innerHeight - 69
      background.style.height = totalHeight + 'px'
    },
    decrease (val) {
      if (this.coin < 10) {
        this.coinAlertVisible = true
      } else {
        if (this.$refs.error.falsetime === 0) {
          this.unEnableVisible = true
        } else {
          this.coin -= 10
          this.coinChange(-10)
          this.$refs.error.falsetime -= 1
        }
      }
    },
    add (val) {
      if (this.coin < 5) {
        this.coinAlertVisible = true
      } else {
        this.coin -= 5
        this.coinChange(-5)
        this.$refs.timer.second += 5
      }
    },
    testList: function () {
      const that = this
      axios
        .get(that.baseUrl + '/words/testlist/', {
          params: {
            matchId: that.matchMessage.name
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.questionList = res['data']
          }
        })
    },
    showTime () {
      if (this.$refs.timer.second === 0) {
        this.$refs.error.falsetime += 1
        if (this.$refs.error.falsetime >= 3) {
          this.alertVisible = true
        }
        this.leftPercentage = this.leftPercentage + 0
        let currentTime = this.questionList[this.next].rightIndex
        this.$refs.choise[currentTime].$refs.button.className = 'true-choice'
        this.$refs.rightbar.leftPercentage = this.leftPercentage
        this.addTimer = setTimeout(this.change, 1000)
      }
    },
    saveScore () {
      const that = this
      axios.get(that.baseUrl + '/words/savescore/', {
        params: {
          matchId: that.matchMessage.name,
          studentId: that.cookies.get('id'),
          score: that.leftPercentage
        }
      })
    }
  },
  mounted: function () {
    const that = this
    that.matchMessage = that.$route.query.matchMessage
    that.getScreenHeight()
    that.testList()
    that.iniTimer = setInterval(that.con, 10)
    that.showTimer = setInterval(that.showTime, 1010)
    that.coinChange(0)
  }
}
</script>

<style scoped>
#compete-background {
  background: url('../../assets/student_background.png');
  text-align: center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.compete-content {
  background: white;
  border-radius: 5px;
  width: 960px;
  height: 550px;
  display: block;
  background-image: url('../../assets/student_compete_top.png');
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  justify-content: center;
}

.right-portrait {
  position: absolute;
  right: 90px;
  top: 35px;
  font-size: 15px;
}

.false-time {
  position: absolute;
  left: 90px;
  top: 35px;
}

.question-content {
  font-size: 15px;
  margin-top: 160px;
  margin-left: 220px;
  width: 500px;
  height: 120px;
  display: flex;
  justify-content: center;
}

.exit-the-contest {
  position: absolute;
  width: 150px;
  height: 35px;
  background-color: #4ac767;
  border: none;
  color: white;
  right: 0;
  bottom: -40px;
  font-size: 13px;
}

.button-group {
  margin-top: 30px;
  width: 500px;
  margin-left: 230px;
}

.tool {
  position: absolute;
  left: 53px;
  top: 180px;
}

.right-bar {
  position: absolute;
  right: 100px;
  top: 180px;
}

.timer {
  position: absolute;
  right: 382px;
  top: 40px;
}

.coin {
  display: flex;
  align-items: center;
  position: absolute;
  top: 134px;
  left: 105px;
}

.coin label {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}
</style>
