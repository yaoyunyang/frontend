<template>
  <div id="spell-page" ref="page">
    <rest-page v-if="showRest" @showStudy="goOnStudy"></rest-page>
    <div id="spell-background">
      <div class="spell-top">
        <p>当前生词数：{{len}}&nbsp;&nbsp;&nbsp;回想次数：{{recallCount}}</p>
        <div class="timer-music">
          <tomato-timer @timeToRest="restPage"></tomato-timer>
          <student-background-music></student-background-music>
        </div>
      </div>
      <div class="spell-content">
        <div class="spell-interpretation-and-pronunciation">
          <h1>{{curWord}}</h1>
          <div class="listen-button-group">
            <div class="pronunciation-css">['/llsf/']</div>
            <button>
              <img
                class="listen-picture"
                src="../../assets/student_listen_true.png"
                alt="listening"
              />英
            </button>
            <button>
              <img
                class="listen-picture"
                src="../../assets/student_listen_false.png"
                alt="not listening"
              />美
            </button>
          </div>
        </div>
        <key-board v-if="false"></key-board>
        <make-choice v-if="cardOne" @know="knowChoice" @donnotknow="noChoice" @kill="killChoice"></make-choice>
        <show-tips
          :wordTip="curWordInfo"
          v-if="cardTwo"
          @recallBtn="recall"
          @noRecallBtn="noRecall"
        ></show-tips>
        <recall-part
          v-if="cardThree"
          :showTwo="showBtn"
          :wordTip="curWordInfo"
          @nextWord="toNextWord"
          @recallWrong="recallWrongBtn"
          @recallRight="recallRightBtn"
        ></recall-part>
      </div>
    </div>
  </div>
</template>

<script>
import StudentBackgroundMusic from '../../components/StudentBackgroundMusic'
import TomatoTimer from '../../components/TomatoTimer'
import KeyBoard from '../../components/KeyBoard'
import MakeChoice from '../../components/MakeChoice'
import ShowTips from '../../components/ShowTips'
import RestPage from './RestPage'
import axios from 'axios'
import RecallPart from '../../components/RecallPart'

const PERGROUP = 7
export default {
  name: 'Spell',
  components: {
    StudentBackgroundMusic,
    TomatoTimer,
    KeyBoard,
    MakeChoice,
    ShowTips,
    RestPage,
    RecallPart
  },
  data () {
    return {
      recallCount: 0,
      showRest: false,
      curGroupWords: [],
      curWord: '',
      len: '',
      cardOne: true,
      cardTwo: false,
      cardThree: false,
      curWordInfo: '',
      showBtn: '',
      sequenceHandle: '',
      unitName: 1,
      category: '',
      wordId: '',
      wordType: 1,
      wordLevel: 0,
      learnTime: '',
      dateNow: '',
      allWords: [],
      numGroup: 0,
      curGroup: 0
    }
  },
  watch: {
    curGroupWords () {
      this.len = this.curGroupWords.length
      this.curWord = this.curGroupWords[0]['word']
      this.curWordInfo = this.curGroupWords[0]
      this.wordId = this.curGroupWords[0]['word_id']
      this.wordType = this.curGroupWords[0]['type']
      this.wordLevel = this.curGroupWords[0]['level']
    }
  },
  methods: {
    goOnStudy () {
      this.showRest = false
    },
    restPage () {
      this.showRest = true
    },
    setDate () {
      let day = new Date()
      const year = day.getFullYear()
      const month = day.getMonth() + 1
      const date = day.getDate()
      let currentDate = year + '-' + month + '-' + date
      this.dateNow = currentDate
    },
    knowChoice () {
      this.sequenceHandle = this.sequenceHandle + '1'
      this.showBtn = true
      this.cardTwo = false
      this.cardOne = false
      this.cardThree = true
    },
    noChoice () {
      this.sequenceHandle = this.sequenceHandle + '0'
      this.cardOne = false
      this.cardTwo = true
      this.cardThree = false
    },
    killChoice () {
      this.sequenceHandle = this.sequenceHandle + '2'
      this.changeTypeLevel(3, 0, this.dateNow)
    },
    recall () {
      this.recallCount = this.recallCount + 1
      this.sequenceHandle = this.sequenceHandle + '1'
      this.wordLevel = this.wordLevel + 1
      if (this.sequenceHandle === '01') {
        this.showBtn = false
        this.cardTwo = false
        this.cardOne = false
        this.cardThree = true
      } else if (this.sequenceHandle.startsWith('00') || this.sequenceHandle.startsWith('10')) {
        this.sequenceHandle = ''
        this.changeTypeLevel(2, this.wordLevel, this.dateNow)
      }
    },
    noRecall () {
      this.recallCount = this.recallCount + 1
      this.sequenceHandle = this.sequenceHandle + '0'
      this.wordLevel = this.wordLevel + 1
      if (this.sequenceHandle.startsWith('00') || this.sequenceHandle.startsWith('10')) {
        this.showBtn = false
        this.cardTwo = false
        this.cardOne = false
        this.cardThree = true
      }
    },
    toNextWord () {
      if (this.wordLevel === 4) {
        this.changeTypeLevel(3, 0, this.dateNow)
      } else if (this.wordLevel > 2) {
        this.sequenceHandle = ''
        this.changeTypeLevel(2, this.wordLevel, this.dateNow)
      } else if (this.sequenceHandle === '01') {
        this.sequenceHandle = ''
        this.changeTypeLevel(2, this.wordLevel, this.dateNow)
      } else if (this.sequenceHandle.startsWith('00') || this.sequenceHandle.startsWith('10')) {
        this.cardTwo = true
        this.cardOne = false
        this.cardThree = false
      }
    },
    recallWrongBtn () {
      this.sequenceHandle = this.sequenceHandle + '0'
      if (this.sequenceHandle.startsWith('10')) {
        this.showBtn = false
        this.cardTwo = false
        this.cardOne = false
        this.cardThree = true
      }
    },
    recallRightBtn () {
      this.sequenceHandle = this.sequenceHandle + '1'
      if (this.sequenceHandle === '11') {
        const dateNow = this.setDate()
        this.changeTypeLevel(3, 0, dateNow)
      }
    },
    getScreenHeight: function () {
      const outter = this.$refs.page
      outter.style.height = window.innerHeight + 'px'
    },
    getUnitWords: function (unitName, categoty) {
      const that = this
      axios
        .get(that.baseUrl + '/words/getgroupwords', {
          params: {
            id: that.cookies.get('id'),
            unit: unitName,
            category_id: categoty
          }
        })
        .then(res => {
          localStorage.setItem('hasStudyedWords', JSON.stringify(res.data.words))
          that.allWords = res.data.words
          that.numGroup = that.allWords.length / PERGROUP
          that.curGroupWords = res.data.words.slice(that.curGroup, (that.curGroup + 1) * PERGROUP)
          that.curWord = res.data.words[0]['word']
          that.curWordInfo = res.data.words[0]
          that.len = res.data.words.length
          that.wordId = res.data.words[0]['word_id']
          that.wordType = res.data.words[0]['type']
          that.wordLevel = res.data.words[0]['level']
          that.learnTime = res.data.words[0]['learn_time']
        })
    },
    changeTypeLevel (wordType, wordLevel, learnTime) {
      const that = this
      axios
        .get(that.baseUrl + '/words/changewordtypelevel', {
          params: {
            id: that.cookies.get('id'),
            word_id: that.wordId,
            word_type: wordType,
            word_level: wordLevel,
            learn_time: learnTime
          }
        })
        .then(res => {
          that.curGroupWords[0]['type'] = wordType
          that.curGroupWords[0]['level'] = wordLevel
          that.curGroupWords[0]['learn_time'] = learnTime
          if (wordType === 3 || wordLevel === 3) {
            that.abortWord()
          } else {
            that.putBack()
          }
        })
    },
    abortWord () {
      const that = this
      if (that.len > 1) {
        that.curGroupWords.shift()
        that.sequenceHandle = ''
        this.cardTwo = false
        this.cardOne = true
        this.cardThree = false
      } else {
        if (that.curGroup + 1 < that.numGroup - 1) {
          that.curGroup = that.curGroup + 1
          that.curGroupWords = that.allWords.slice(that.curGroup * PERGROUP, (that.curGroup + 1) * PERGROUP)
        } else if (that.curGroup + 1 < that.numGroup) {
          that.curGroup = that.curGroup + 1
          that.curGroupWords = that.allWords.slice(that.curGroup * PERGROUP)
        } else {
          let nowTime = new Date()
          let stopTime = nowTime.getTime()
          let startTime = sessionStorage.getItem('startTime')
          let sumTime = Math.floor((stopTime - startTime) / 1000)
          axios
            .get(that.baseUrl + '/words/updatetime', {
              params: {
                id: that.cookies.get('id'),
                study_time: sumTime
              }
            })
            .then(res => {
              that.$router.push({
                path: '/StudentMain',
                name: 'StudentMain'
              })
            })
        }
      }
    },
    putBack () {
      let word = this.curGroupWords.shift()
      this.curGroupWords.push(word)
      this.cardTwo = false
      this.cardOne = true
      this.cardThree = false
    }
  },
  mounted () {
    this.setDate()
    this.unitName = this.$route.params.unitName
    this.category = this.$route.params.category
    this.getUnitWords(this.unitName, this.category)
    this.getScreenHeight()
  }
}
</script>

<style scoped>
#spell-background {
  background: url('../../assets/student_study_background.png');
  background-size: 100% 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.spell-content {
  background: white;
  border-radius: 5px;
  width: 960px;
  height: 550px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
}

.spell-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 960px;
  margin-bottom: 20px;
}

p.spell-top {
  font-size: 15px;
  color: #000;
}

.spell-interpretation-and-pronunciation {
  width: 500px;
  text-align: left;
  margin: 40px 0 50px;
}

.spell-interpretation-and-pronunciation button {
  background-color: #f9f9f9;
  border-radius: 10px;
  width: 80px;
  border: none;
  outline: none;
  height: 30px;
  text-align: left;
  font-size: medium;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listen-button-group {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.pronunciation-css {
  font-size: 18px;
  color: #4b4b4b;
  margin-right: 35px;
}

.spell-interpretation-and-pronunciation button:hover {
  background-color: #fff6e6;
}

.listen-picture {
  width: 18px;
  height: 15px;
  margin-right: 10px;
}

.timer-music {
  display: flex;
  align-items: center;
  width: 210px;
  justify-content: space-between;
}

.recall {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
