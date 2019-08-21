<template>
  <div class="studying-page">
    <div class="top">
      <button class="btn-css" @click="changeBook">切换单词书</button>
    </div>
    <SelectBookDialog v-if="selectBook" @closeChangeBook="closeBook" @getBookId="getSelectBook"></SelectBookDialog>
    <div v-if="hasCategory">
      <div class="test-score">
        <div class="class-name">
          <img src="../assets/class-logo.png" />
          <span>{{className}}</span>
        </div>
        <div class="middle">
          <div class="vs-score">
            <div class="before-test">
              <span class="score-before">{{beforeScore}}</span>
              <span>学前检测</span>
            </div>
            <img src="../assets/vs.png" />
            <div class="after-test">
              <span class="score-after">{{afterScore}}</span>
              <span>学后检测</span>
            </div>
          </div>
        </div>
      </div>
      <div class="schedule">
        <div class="book-range">
          <img src="../assets/book.png" />
          <span>{{category}}：第{{unitName}}单元</span>
        </div>
        <div class="circle-center">
          <el-progress type="circle" v-if="finishAll" :percentage="degree" color="#85E46D"></el-progress>
          <button class="testForAllBtn" v-else @click="testForAll"><span>一测到底 </span></button>
          <div class="circle-center-right">
            <button class="study" @click="toStudy">开始学习</button>
            <button class="force-test" @click="review">巩固测试</button>
            <button class="test" @click="afterTest">学后测试</button>
          </div>
        </div>
      </div>
      <div class="unit">
        <student-unit-circle
          @getUnit="changeUnit"
          v-for="(item, index) in unitInfo"
          :key="index"
          :status="item.status"
          class="unit-css"
          :unit="item.unit"
        ></student-unit-circle>
      </div>
    </div>
    <div class="no-category" v-if="showNoCategory">暂无教材，请先选择教材～</div>
    <button class="study plus" v-if="hasNoBeforeScore" @click="beforeTest">点击进行学前检测</button>
  </div>
</template>

<script>
import StudentUnitCircle from './StudentUnitCircle.vue'
import SelectBookDialog from './SelectBookDialog.vue'
import axios from 'axios'

export default {
  name: '',
  data () {
    return {
      selectBook: false,
      nowBookId: '',
      nowBookName: '',
      nowUnitInfo: [],
      className: '',
      afterScore: '',
      degree: 0,
      unitInfo: '',
      category: '',
      hasCategory: false,
      showNoCategory: false,
      hasNoBeforeScore: false,
      beforeScore: '',
      unitName: '?',
      finishAll: true,
      unitStatus: '',
      hasStudyedWords: []
    }
  },
  props: {
    studentId: {}
  },
  components: {
    StudentUnitCircle,
    SelectBookDialog
  },
  methods: {
    getSelectBook (bookId) {
      localStorage.removeItem('hasStudyedWords')
      this.cookies.set('category_id', bookId)
      this.getUnits()
      this.$emit('frushWords')
    },
    changeUnit (res) {
      this.$message.success('切换单元成功')
      this.unitName = res.unitName
      this.unitStatus = res.unitStatus
    },
    changeBook () {
      this.selectBook = true
    },
    closeBook () {
      this.selectBook = false
    },
    toStudy () {
      if (this.unitStatus === 'unit-finished') {
        this.$message('该单元已学完')
      } else if (this.unitName === '?') {
        this.$message.error('请先选择单元')
      } else {
        let nowTime = new Date()
        let startTime = nowTime.getTime()
        sessionStorage.setItem('startTime', startTime)
        this.$router.push({
          path: '/SpellPage',
          name: 'SpellPage',
          params: {
            unitName: this.unitName,
            category: this.cookies.get('category_id')
          }
        })
      }
    },
    refreshBookName (newBookName) {
      this.nowBookName = newBookName
    },
    refreshBookId (newBookId) {
      this.nowBookId = newBookId
    },
    getUnits () {
      const that = this
      if (this.cookies.get('category_id') === undefined) {
        that.hasCategory = false
        that.showNoCategory = true
        that.hasNoBeforeScore = false
      } else {
        axios
          .get(that.baseUrl + '/words/getunits', {
            params: {
              id: that.cookies.get('id'),
              category_id: this.cookies.get('category_id')
            }
          })
          .then(res => {
            that.className = res.data.class_name
            that.beforeScore = res.data.before_score
            that.afterScore = res.data.after_score
            that.degree = res.data.degree
            that.unitInfo = res.data.unit_info
            that.category = res.data.category_name
            that.numUnit = res.data.num_unit
            if (that.degree === 100) {
              that.finishAll = false
            }
            if (that.beforeScore === -1) {
              that.hasNoBeforeScore = true
              that.hasCategory = false
              that.showNoCategory = false
            } else {
              that.hasNoBeforeScore = false
              that.hasCategory = true
              that.showNoCategory = false
            }
          })
      }
    },
    beforeTest () {
      this.$emit('startBeforeTest', this.cookies.get('category_id'))
    },
    afterTest () {
      let hasStudyedWords = JSON.parse(localStorage.getItem('hasStudyedWords'))
      if (hasStudyedWords === null) {
        this.$message.error('还未进行学习，请先进行学习')
      } else {
        this.$emit('startAfterTest', this.cookies.get('category_id'))
      }
    },
    testForAll () {
      this.$emit('testForAll', this.cookies.get('category_id'))
    },
    review () {
      let hasStudyedWords = JSON.parse(localStorage.getItem('hasStudyedWords'))
      if (hasStudyedWords === null) {
        this.$message.error('还未进行学习，请先进行学习')
      } else {
        let nowTime = new Date()
        let startTime = nowTime.getTime()
        sessionStorage.setItem('startTime', startTime)
        this.$router.push({
          path: '/Review',
          name: 'Review'
        })
      }
    }
  },
  mounted () {
    this.getUnits()
  }
}
</script>

<style scoped>
.testForAllBtn {
  width: 126px;
  height: 126px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 900;
  outline: 0;
  color: #fff;
  background-color: #5bc767;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.5s;
  border: none;
  text-align: center;
}

.testForAllBtn span::after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.testForAllBtn:hover span::after {
  opacity: 1;
  right: 0;
}

.testForAllBtn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.testForAllBtn:hover span {
  padding-right: 15px;
}

button {
  cursor: pointer;
}

.studying-page {
  display: inline-block;
  width: 630px;
  height: 660px;
  padding: 15px;
}

.top {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #eee;
  padding-right: 50px;
}

.test-score {
  height: 150px;
}

.schedule {
  height: 230px;
  display: flex;
  flex-direction: column;
}

.unit {
  height: 140px;
  margin-top: 20px;
}

.unit-css {
  margin: 10px 8.2px 10px 0;
  cursor: pointer;
}

.btn-css {
  width: 150px;
  height: 35px;
  margin-left: 150px;
  border-radius: 5px;
  background-color: #f9f9f9;
  border-width: 0;
  outline: 0;
}

.btn-css:hover {
  background-color: #ebe9e9;
}

.class-name,
.book-range {
  display: flex;
  align-items: center;
  margin: 15px 0;
  font-size: 12px;
  color: #181818;
}

.class-name img,
.book-range img {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.middle {
  display: flex;
  justify-content: center;
}

.vs-score {
  display: inline-flex;
  width: 240px;
  justify-content: space-between;
}

.after-test,
.before-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.score-before {
  font-size: 3em;
  color: #f5ac41;
}

.score-after {
  font-size: 3em;
  color: #999;
}

.circle-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-left: 80px;
  padding-right: 50px;
}

.circle-center-right {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.study,
.force-test,
.test {
  width: 150px;
  height: 32px;
  border-radius: 20px;
  border-width: 0;
  color: #fff;
  font-weight: 900;
  font-size: 14px;
  outline: 0;
}

.study {
  background-color: #5bc767;
  box-shadow: #dff5e4 0 0 3px 3px;
}

.study:hover {
  background-color: #72d35f;
}

.force-test {
  background-color: #f6b042;
  box-shadow: #ffedcc 0 0 3px 3px;
}

.force-test:hover {
  background-color: #f5be65;
}

.test {
  background-color: #69bfe0;
  box-shadow: #d1f5ec 0 0 3px 3px;
}

.test:hover {
  background-color: #73cef1;
}

.no-category {
  font-size: 25px;
  margin-top: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus {
  margin-top: 250px;
  margin-left: 200px;
  width: 200px;
  height: 50px;
  border-radius: 10px;
}
</style>
