<template>
  <el-tabs tab-position="left" class="outter">
    <el-tab-pane label="正在学习">
      <studying-page
        v-if="showStudyingPage"
        @frushWords="frushWordsBook"
        @startBeforeTest="toTest"
        @startAfterTest="toAfterTest"
        @testForAll="toTestForAll"
      ></studying-page>
      <question-list
        :testType="testType"
        v-else
        :category_id="category"
        @getBeforeScore="getBeforeScoreFun"
      ></question-list>
    </el-tab-pane>
    <el-tab-pane label="学习统计">
      <StudentStaticsPage></StudentStaticsPage>
    </el-tab-pane>
    <el-tab-pane label="单词本" class="word-page">
      <student-word-book-top @orderByLetter="letterOrder" @orderByColor="colorOrder"></student-word-book-top>
      <div class="word-list">
        <word-card
          v-for="(item, index) in allWords"
          :key="index"
          :name="item.word"
          :explains="item.explains"
          :cardColor="changeCardColor(item.status)"
        ></word-card>
      </div>
      <div class="btn-group">
        <button class="last-button" @click="lastGroup" v-show="showLast">上一组</button>
        <button class="next-button" @click="nextGroup" v-show="showNext">下一组</button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="单词比赛" class="compeition-intro-page">
      <CompBriefIntro></CompBriefIntro>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import StudentWordBookTop from './StudentWordBookTop'
import WordCard from './WordCard'
import StudyingPage from './StudyingPage'
import StudentStaticsPage from './StudentStaticsPage'
import CompBriefIntro from './CompBriefIntro'
import axios from 'axios'
import QuestionList from './QuestionList'

const BEFORETEST = 1
const AFTERTEST = 2
const TESTFORALL = 3
export default {
  name: 'StudentBarDown',
  data () {
    return {
      showNext: true,
      showLast: false,
      PER_PAGE: 12,
      orderLetter: '',
      orderColor: '',
      showStudyingPage: true,
      category: '',
      allWords: '',
      curPage: 0,
      num: 0,
      showAfterTest: false,
      showBeforeTest: false,
      testType: 1
    }
  },
  components: {
    StudentWordBookTop,
    WordCard,
    StudyingPage,
    StudentStaticsPage,
    QuestionList,
    CompBriefIntro
  },
  mounted () {
    this.id = this.cookies.get('id')
    this.initPage()
  },
  methods: {
    frushWordsBook () {
      this.group()
    },
    getBeforeScoreFun (score) {
      this.showStudyingPage = true
      if (score > 80) {
        axios.get(this.baseUrl + '/words/setthree', {
          params: {
            id: this.cookies.get('id'),
            category_id: this.cookies.get('category_id')
          }
        })
      }
    },
    toTest (categoryTrans) {
      this.category = categoryTrans
      this.testType = BEFORETEST
      this.showStudyingPage = false
    },
    toAfterTest (categoryTrans) {
      this.category = categoryTrans
      this.testType = AFTERTEST
      this.showStudyingPage = false
    },
    toTestForAll (categoryTrans) {
      this.category = categoryTrans
      this.testType = TESTFORALL
      this.showStudyingPage = false
    },
    nextGroup () {
      const that = this
      that.curPage = that.curPage + 1
      that.group()
    },
    lastGroup () {
      const that = this
      that.curPage = that.curPage - 1
      that.group()
    },
    group () {
      const that = this
      if (that.curPage === 0 && (that.curPage + 1) * that.PER_PAGE > that.num) {
        that.showNext = false
        that.showLast = false
      } else if (
        that.curPage === 0 &&
        (that.curPage + 1) * that.PER_PAGE < that.num
      ) {
        that.showNext = true
        that.showLast = false
      } else if (
        that.curPage > 0 &&
        (that.curPage + 1) * that.PER_PAGE < that.num
      ) {
        that.showNext = true
        that.showLast = true
      } else if (
        that.curPage > 0 &&
        (that.curPage + 1) * that.PER_PAGE > that.num
      ) {
        that.showNext = false
        that.showLast = true
      }
      axios
        .get(that.baseUrl + '/words/getwordsbook', {
          params: {
            id: this.cookies.get('id'),
            category_id: this.cookies.get('category_id'),
            curPage: that.curPage,
            orderLetter: that.orderLetter,
            orderColor: that.orderColor
          }
        })
        .then(res => {
          that.allWords = res.data.word
          that.curPage = res.data.cur_page
        })
    },
    letterOrder (isOrderByLetter) {
      const that = this
      that.curPage = 0
      that.orderLetter = isOrderByLetter
      that.orderColor = ''
      that.group()
    },
    colorOrder (isOrderByColor) {
      const that = this
      that.curPage = 0
      that.orderColor = isOrderByColor
      that.orderLetter = ''
      that.group()
    },
    changeCardColor (status) {
      if (status === 1) {
        return '#F28C6D'
      } else if (status === 2) {
        return '#85D2FA'
      } else {
        return '#8AE574'
      }
    },
    initPage () {
      const that = this
      axios
        .get(that.baseUrl + '/words/getwordsbook', {
          params: {
            id: this.cookies.get('id'),
            category_id: this.cookies.get('category_id'),
            curPage: that.curPage,
            orderLetter: '',
            orderColor: ''
          }
        })
        .then(res => {
          that.allWords = res.data.word
          that.curPage = res.data.cur_page
          that.num = res.data.num
        })
    }
  }
}
</script>

<style scoped>
.outter {
  display: inline-block;
  margin-top: 20px;
}

.el-tabs >>> .el-tabs__nav-wrap.is-left {
  box-shadow: #cdedef 0 0 5px 5px;
  background-color: white;
}

.word-list {
  display: inline-block;
}

.el-tabs >>> .el-tabs__active-bar,
.el-tabs__nav-wrap::after {
  display: none;
}

.el-tabs >>> .el-tabs__nav-wrap {
  width: 300px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.el-tabs >>> .el-tabs__item {
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  width: 260px;
  justify-content: center;
  text-align: center !important;
  color: #797979 !important;
}

.el-tabs >>> .el-tabs__item:focus {
  color: #fff !important;
  background-color: #5bc767;
}

.el-tabs >>> .el-tabs__content {
  width: 630px;
  min-height: 660px;
  border-radius: 10px;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.el-tabs >>> .el-tabs__header {
  margin: 160px 30px 0 0 !important;
}

.el-tabs >>> .el-tabs__nav-wrap.is-left::after {
  visibility: hidden;
}

.word-page {
  display: flex;
  flex-direction: column;
}

.btn-group {
  width: 330px;
  position: absolute;
  bottom: 40px;
  right: 36px;
}

.next-button,
.last-button {
  width: 160px;
  height: 38px;
  vertical-align: center;
  background-color: #5bc767;
  border-radius: 6px;
  color: white;
  font-weight: 400;
  font-size: 14px;
  border: 0;
  outline: 0;
  box-shadow: #dff5e4 0 0 6px 6px;
  cursor: pointer;
}

.next-button {
  float: right;
}

.last-button {
  float: left;
}

.next-button:hover {
  background-color: #2fb63f;
}

.last-button:hover {
  background-color: #2fb63f;
}

/* competition */
.compeition-intro-page {
  display: flex;
  justify-content: space-around;
}
</style>
