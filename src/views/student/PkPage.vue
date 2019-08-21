<template>
  <div ref="page">
    <student-header></student-header>
    <div ref="background" id="compete-background">
      <div class="compete-content">
        <div class="left-bar">
          <progress-bar-left leftPercentage="0" ref="leftbar"></progress-bar-left>
        </div>
        <div class="right-bar">
          <progress-bar-right rightPercentage="0" ref="rightbar"></progress-bar-right>
        </div>
        <div class="timer">
          <match-timer ref="timer"></match-timer>
        </div>
        <div class="left-portrait">
          <StudentHeadPortrait class="left-avatar" src="/student_avatar.png" ref="robot"></StudentHeadPortrait>
          <p>小花</p>
        </div>
        <div class="right-portrait">
          <StudentHeadPortrait class="right-avatar" :src="this.cookies.get('info').image" ></StudentHeadPortrait>
          <p>{{this.cookies.get('info').name}}</p>
        </div>
        <div class="question-content"><h1>{{questionList[next].question}}</h1></div>
        <div class="button-group">
          <StudentChoiceButton
            :answer="item.answer"
            :key="index"
            :index="index"
            v-for="(item, index) in questionList[next].answerList"
            class="before-choice"
            :right_index="questionList[next].rightIndex"
            v-on:scoreChange="scoreChange"
            ref="choise"
          ></StudentChoiceButton>
        </div>
        <el-button class="exit-the-contest" @click="matchBack">退出</el-button>
      </div>
      <!--提示弹框 -->
      <el-dialog title="提示" :visible.sync="alertVisible" width="30%">
        <span>{{pkResult}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="matchBack">确 定</el-button>
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
import ProgressBarRight from '../../components/ProgressBarRight'
import MatchTimer from '../../components/MatchTimer'

const axios = require('axios')
export default {
  name: 'PkPage',
  components: {
    StudentHeader,
    StudentHeadPortrait,
    StudentChoiceButton,
    ProgressBarRight,
    ProgressBarLeft,
    MatchTimer
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
      leftPercentage: 0,
      rightPercentage: 0,
      next: 0,
      idList: [],
      chosedList: [],
      stringList: '',
      alertVisible: false,
      addTimer: '',
      iniTimer: '',
      showTimer: '',
      pkResult: '',
      matchId: '',
      matchMessage: ''
    }
  },
  methods: {
    coinChange (val) {
      const that = this
      axios.get(that.baseUrl + '/words/coinchange/', {
        params: {
          studentId: that.cookies.get('id'),
          coinChange: val
        }
      })
    },
    matchBack () {
      this.alertVisible = false
      this.$router.push({
        path: '/StudentMain',
        name: 'StudentMain'
      })
    },
    con () {
      this.$refs.rightbar.rightPercentage = this.rightPercentage
      this.$refs.leftbar.leftPercentage = this.leftPercentage
    },
    add () {
      this.$refs.timer.second = 6
      let currentTime = this.questionList[this.next].rightIndex
      let currentRobot = this.questionList[this.next].robotIndex
      this.$refs.choise[currentTime].$refs.button.className = 'before-choice'
      this.$refs.choise[currentRobot].$refs.trueImageR.className = 'img'
      this.$refs.choise[currentRobot].$refs.falseImageR.className = 'img'
      this.next += 1
      if (this.next === 10) {
        this.alertVisible = true
        this.saveScore()
        for (let i = 0; i < 10; i++) {
          this.stringList =
            this.stringList + this.idList[i] + ' ' + this.chosedList[i] + ' '
        }
        if (this.rightPercentage > this.leftPercentage) {
          this.pkResult =
            '你获得了胜利，你将得到' + this.matchMessage.reward + '金币'
          this.coinChange(parseInt(this.matchMessage.reward))
        } else if (this.rightPercentage < this.leftPercentage) {
          this.pkResult = '你失败了，再接再厉哦'
        } else {
          this.pkResult = '哎呀，平局'
        }
        if (this.rightPercentage >= 80) {
          this.upPkList()
        }
      }
    },
    scoreChange (val, index) {
      this.chosedList.push(String(index))
      this.rightPercentage = this.rightPercentage + val
      let currentTime = this.questionList[this.next].rightIndex
      let currentRobot = this.questionList[this.next].robotIndex
      this.$refs.choise[currentTime].$refs.button.className = 'true-choice'
      if (currentTime === currentRobot) {
        this.leftPercentage += 10
        this.$refs.choise[currentRobot].$refs.trueImageR.className = 'true-left'
      } else {
        this.$refs.choise[currentRobot].$refs.falseImageR.className =
          'false-left'
      }
      this.$refs.rightbar.rightPercentage = this.rightPercentage
      this.$refs.leftbar.leftPercentage = this.leftPercentage
      this.addTimer = setTimeout(this.add, 1000)
    },
    getScreenHeight: function () {
      const background = this.$refs.background
      const outter = this.$refs.page
      outter.style.height = window.innerHeight + 'px'
      const totalHeight = window.innerHeight - 69
      background.style.height = totalHeight + 'px'
    },
    pkList: function () {
      const that = this
      axios
        .get(that.baseUrl + '/words/pklist/', {
          params: {
            studentId: that.cookies.get('id')
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.questionList = res['data']
            that.questionList.push(res['data'][0])
            that.idList = res['id']
          }
        })
    },
    upPkList: function () {
      const that = this
      axios.get(that.baseUrl + '/words/uppklist/', {
        params: {
          idAnswer: that.stringList
        }
      })
    },
    showTime () {
      if (this.$refs.timer.second === 0) {
        this.chosedList.push(String(1))
        this.rightPercentage = this.rightPercentage + 0
        let currentTime = this.questionList[this.next].rightIndex
        let currentRobot = this.questionList[this.next].robotIndex
        this.$refs.choise[currentTime].$refs.button.className = 'true-choice'
        if (currentTime === currentRobot) {
          this.leftPercentage += 10
          this.$refs.choise[currentRobot].$refs.trueImageR.className =
            'true-left'
        } else {
          this.$refs.choise[currentRobot].$refs.falseImageR.className =
            'false-left'
        }
        this.$refs.rightbar.rightPercentage = this.rightPercentage
        this.$refs.leftbar.leftPercentage = this.leftPercentage
        this.addTimer = setTimeout(this.add, 1000)
      }
    },
    saveScore () {
      const that = this
      axios.get(that.baseUrl + '/words/savescore/', {
        params: {
          matchId: that.matchMessage.name,
          studentId: that.cookies.get('id'),
          score: that.rightPercentage
        }
      })
    }
  },
  mounted: function () {
    const that = this
    that.matchMessage = that.$route.query.matchMessage
    that.getScreenHeight()
    that.pkList()
    that.iniTimer = setInterval(that.con, 10)
    that.showTimer = setInterval(that.showTime, 1010)
  }
}
</script>

<style scoped>
#compete-background {
  background: url('../../assets/student_background.png');
  text-align: center;
  background-size: cover;
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

.left-portrait {
  position: absolute;
  left: 90px;
  top: 35px;
  font-size: 15px;
}

.right-portrait {
  position: absolute;
  right: 90px;
  top: 35px;
  font-size: 15px;
}

.question-content {
  font-size: 20px;
  margin-top: 160px;
  margin-left: 230px;
  width: 500px;
  height: 80px;
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
  right: -180px;
  bottom: -50px;
  font-size: 13px;
}

.button-group {
  margin-top: 30px;
  width: 500px;
  margin-left: 230px;
}

.left-bar {
  position: absolute;
  left: 100px;
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
</style>
