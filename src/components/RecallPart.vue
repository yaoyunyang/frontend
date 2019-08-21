<template>
  <div class="recall-part">
    <div class="word-explanation" :showWhich="showTwo" :currentWord="wordTip">
      <span>单词解释：</span>
      <div class="explanation-css">{{wordTip.explains}}</div>
    </div>
    <div class="sentences">
      <span class="out-rect">例句</span>
      <div class="rect-border">
        <div v-for="item in sentences" :key="item">
          <div class="one-sample">
            <div class="first-english">
              <img class="listen-img" src="../assets/student_listen_true.png" />
              <span>{{wordTip.sentence}}</span>
            </div>
            <div class="second-chinese">
              <span>{{wordTip.chinese}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tail-btn">
      <div v-if="this.showTwo">
        <button class="btn-css green" @click="recallRight">回想正确</button>
        <button class="btn-css red" @click="recallWrong">回想错误</button>
      </div>
      <button class="btn-css green next" v-else @click="nextWord">下一个</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      explanations: ['adj: 暂时的，临时的', 'n: 临时工'],
      sentences: [1, 2]
    }
  },
  props: {
    showTwo: {},
    wordTip: {}
  },
  methods: {
    nextWord () {
      this.$emit('nextWord')
    },
    recallRight () {
      this.$emit('recallRight')
    },
    recallWrong () {
      this.$emit('recallWrong')
    }
  }
}
</script>

<style scoped>
.recall-part {
  width: 600px;
  margin-left: 100px;
  height: 380px;
  display: inline-flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
}

.explanation-css {
  display: flex;
}

.word-explanation span,
.out-rect {
  font-size: 1.2em;
  font-weight: 800;
  margin-bottom: 8px;
  display: inline-block;
  display: flex;
}

.sentences {
  margin-top: 20px;
}

.rect-border {
  width: 600px;
  background: #f9f9f9;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.one-sample {
  margin-bottom: 15px;
}

.first-english {
  display: flex;
  align-items: center;
}

.first-english span {
  font-size: 12px;
}

.second-chinese {
  margin-left: 32.5px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.listen-img {
  margin-right: 10px;
  width: 22.5px;
  height: 20px;
}

.tail-btn {
  width: 270px;
  float: right;
  position: absolute;
  bottom: 20px;
  right: 0;
}

.btn-css {
  width: 120px;
  height: 30px;
  color: white;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 900;
  outline: 0;
  padding: 0;
}

.green {
  background: #5cc867;
  float: left;
}

.green:hover {
  background: #68d873;
}

.red {
  background: #f55a5a;
  float: right;
}

.red:hover {
  background: #eb6565;
}

.next {
  float: right;
}
</style>
