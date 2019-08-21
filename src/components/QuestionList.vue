<template>
  <div class="qeustion-list" :category="category_id" :type="testType">
    <div class="test-header">
      <img src="../assets/class-icon.png" class="class-icon" />
      <span class="test-title">{{testTitle}}</span>
      <pk-timer class="timer-css" @timeOver="timeOut"></pk-timer>
    </div>
    <div
      class="one-question"
      v-for="(item,numIndex) in questionList"
      :key="numIndex"
      @change="whichGroup(numIndex)"
    >
      <question-card
        v-show="showItem(numIndex)"
        @choice="whichOne"
        :index="numIndex+1"
        :word="item.title"
        :choiceA="item.choices[0]"
        :choiceB="item.choices[1]"
        :choiceC="item.choices[2]"
        :choiceD="item.choices[3]"
      ></question-card>
    </div>
    <button v-if="showLastQuestion" class="last-button" @click="toLastGroup">上一组</button>
    <button v-if="showNextQuestion" class="next-button" @click="toNextGroup">下一组</button>
    <button v-if="showSubmit" class="next-button" @click="submit">提交</button>
  </div>
</template>

<script>
import QuestionCard from './QuestionCard'
import PkTimer from './PkTimer'
import axios from 'axios'
const BEFORETEST = 1
const AFTERTEST = 2
const TESTFORALL = 3
export default {
  name: 'StudentBarDown',
  components: {
    QuestionCard,
    PkTimer
  },
  data: function () {
    return {
      questionCurPage: 0,
      perQuestionNum: 3,
      numQuestions: '',
      questionList: '',
      showLastQuestion: false,
      showNextQuestion: true,
      showSubmit: false,
      answers: [],
      choice: '',
      indexChoice: '',
      testTitle: '学前测试',
      backUrl: '/words/testbeforestudy',
      backSetDataUrl: '/words/setbeforestudyscore'
    }
  },
  props: {
    category_id: {},
    testType: {}
  },
  methods: {
    timeOut () {
      let rightNum = 0
      let wrongNum = 0
      for (let i = 0; i < this.answers.length; i++) {
        if (
          parseInt(this.questionList[i]['correct_index']) === this.answers[i]
        ) {
          rightNum = rightNum + 1
        } else {
          wrongNum = wrongNum + 1
        }
      }
      const score = Math.floor((rightNum / this.questionList.length) * 100)
      this.$alert('时间结束', '', {
        confirmButtonText: '确定',
        showClose: false
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '你的得分：' + score
          })
          this.transformScore(score)
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '你的得分：' + score
          })
        })
    },
    showItem (numIndex) {
      return (
        numIndex >= this.questionCurPage * this.perQuestionNum &&
        numIndex < (this.questionCurPage + 1) * this.perQuestionNum
      )
    },
    whichOne (res) {
      this.choice = res
    },
    whichGroup (res) {
      this.answers[res] = this.choice
    },
    toNextGroup () {
      this.questionCurPage = this.questionCurPage + 1
      this.showPage()
    },
    toLastGroup () {
      this.questionCurPage = this.questionCurPage - 1
      this.showPage()
    },
    showPage () {
      const that = this
      if (
        that.questionCurPage === 0 &&
        (that.questionCurPage + 1) * that.perQuestionNum > that.numQuestions
      ) {
        that.showNextQuestion = false
        that.showLastQuestion = false
        that.showSubmit = false
      } else if (
        that.questionCurPage === 0 &&
        (that.questionCurPage + 1) * that.perQuestionNum < that.numQuestions
      ) {
        that.showNextQuestion = true
        that.showLastQuestion = false
        that.showSubmit = false
      } else if (
        that.questionCurPage > 0 &&
        (that.questionCurPage + 1) * that.perQuestionNum < that.numQuestions
      ) {
        that.showNextQuestion = true
        that.showLastQuestion = true
        that.showSubmit = false
      } else if (
        that.questionCurPage > 0 &&
        (that.questionCurPage + 1) * that.perQuestionNum >= that.numQuestions
      ) {
        that.showNextQuestion = false
        that.showLastQuestion = true
        that.showSubmit = true
      }
    },
    submit () {
      let rightNum = 0
      let wrongNum = 0
      for (let i = 0; i < this.answers.length; i++) {
        if (
          parseInt(this.questionList[i]['correct_index']) === this.answers[i]
        ) {
          rightNum = rightNum + 1
        } else {
          wrongNum = wrongNum + 1
        }
      }
      const score = Math.floor((rightNum / this.questionList.length) * 100)
      this.$confirm('是否确认提交?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        showClose: false
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '你的得分：' + score
          })
          this.transformScore(score)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          })
        })
    },
    getQuestions () {
      const that = this
      axios
        .get(that.baseUrl + that.backUrl, {
          params: {
            id: that.cookies.get('id'),
            category_id: that.category_id
          }
        })
        .then(res => {
          that.questionList = res.data.list
          that.numQuestions = res.data.list.length
        })
    },
    transformScore (scoreTemp) {
      const that = this
      axios
        .get(that.baseUrl + that.backSetDataUrl, {
          params: {
            id: that.cookies.get('id'),
            category_id: that.cookies.get('category_id'),
            score: scoreTemp
          }
        })
        .then(() => {
          that.$emit('getBeforeScore', scoreTemp)
        })
    }
  },
  mounted () {
    if (this.testType === BEFORETEST) {
      this.testTitle = '学前测试'
      this.backUrl = '/words/testbeforestudy'
      this.backSetDataUrl = '/words/setbeforestudyscore'
      this.getQuestions()
    } else if (this.testType === AFTERTEST) {
      this.testTitle = '学后测试'
      this.backUrl = '/words/testafterstudy'
      this.backSetDataUrl = '/words/setafterstudyscore'
      this.getQuestions()
    } else if (this.testType === TESTFORALL) {
      this.testTitle = '一测到底'
      this.backUrl = '/words/testforall'
      this.backSetDataUrl = '/words/blank'
      this.getQuestions()
    }
  }
}
</script>

<style scoped>
.class-icon {
  margin-left: 20px;
  margin-top: 10px;
}

.test-title {
  font-weight: 550;
  color: #333;
  font-size: 13px;
  position: absolute;
  margin-top: 15px;
  margin-left: 10px;
}

.timer-css {
  margin-left: 452px;
}

.test-header {
  border-bottom: 1.5px solid #efe5e5;
}

.next-button,
.last-button {
  width: 125px;
  height: 27px;
  vertical-align: center;
  border-radius: 6px;
  color: white;
  font-size: 12px;
  font-weight: 900;
  position: absolute;
  bottom: 12px;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.next-button {
  background-color: #5bc767;
  right: 12px;
}

.last-button {
  background-color: #f55a5a;
  right: 157px;
}

.next-button:hover {
  background-color: #2fb63f;
}

.last-button:hover {
  background-color: #eb6565;
}
</style>
