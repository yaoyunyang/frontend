<template>
  <div id="spell-page" ref="page">
    <div id="spell-background">
      <div class="spell-top">
        <p>为测试单词数数：{{numWords}}&nbsp;&nbsp;&nbsp;拼写次数：{{spellCount}}</p>
        <div class="timer-music">
          <student-background-music></student-background-music>
        </div>
      </div>
      <div class="spell-content">
        <div class="spell-interpretation-and-pronunciation">
          <h1>{{curWord}}</h1>
          <div class="listen-button-group">
            <div class="pronunciation-css">[这是音标]</div>
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
        <key-board :correctInputWord="correctWord" @checkRight="next"></key-board>
      </div>
      <button class="exit" @click="toMain">退出</button>
    </div>
  </div>
</template>

<script>
import StudentBackgroundMusic from '../../components/StudentBackgroundMusic'
import KeyBoard from '../../components/KeyBoard'
import axios from 'axios'

export default {
  name: 'Spell',
  components: {
    StudentBackgroundMusic,
    KeyBoard
  },
  data () {
    return {
      correctWord: '',
      curWord: '',
      numWords: 0,
      spellCount: 0,
      allWords: [],
      index: 0,
      wordLength: 0
    }
  },
  watch: {
    index () {
      this.curWord = this.allWords[this.index]['explains']
      this.correctWord = this.allWords[this.index]['word']
    }
  },
  methods: {
    next () {
      if (this.index + 1 === this.wordLength) {
        alert('测试完毕')
      } else {
        this.index = this.index + 1
        this.numWords = this.numWords - 1
      }
    },
    getReviewWords () {
      const that = this
      axios
        .get(that.baseUrl + '/words/getallthree', {
          params: {
            category_id: this.cookies.get('category_id')
          }
        })
        .then(res => {
          that.allWords = res.data.words
          that.wordLength = res.data.words.length
          that.numWords = res.data.words.length
          that.curWord = that.allWords[0]['explains']
          that.correctWord = that.allWords[0]['word']
        })
    },
    toMain () {
      let nowTime = new Date()
      let stopTime = nowTime.getTime()
      let startTime = sessionStorage.getItem('startTime')
      let sumTime = Math.floor((stopTime - startTime) / 1000)
      axios
        .get(this.baseUrl + '/words/updatespelltime', {
          params: {
            id: this.cookies.get('id'),
            study_time: sumTime
          }
        }).then(() => {
          this.$router.push({
            path: '/StudentMain',
            name: 'StudentMain'
          })
        })
    }
  },
  mounted () {
    this.getReviewWords()
  }
}
</script>

<style scoped>
.exit {
  width: 160px;
  height: 40px;
  border-radius: 5px;
  border-width: 0;
  color: #fff;
  font-weight: 900;
  font-size: 16px;
  outline: 0;
  background-color: #50b63b;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  align-self: flex-end;
  margin-right: 60px;
  margin-bottom: 30px;
}

.exit:hover {
  background-color: #51a83f;
}

#spell-background {
  background: url('../../assets/student_study_background.png');
  background-size: cover;
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
  margin-bottom: 20px;
}

.spell-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 960px;
  margin-bottom: 20px;
  margin-top: 20px;
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
