<template>
  <div>
    <div class="input-keyboard">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="checkSpell">
          <el-input :value="ruleForm.spellWord" autofocus="true" :correctInput="correctInputWord"></el-input>
        </el-form-item>
      </el-form>
      <ul class="key-board">
        <div class="first-line">
          <li v-for="item in lst1" :key="item" class="word" @click="selectWord">{{item}}</li>
        </div>
        <div class="second-line">
          <li v-for="item in lst2" :key="item" class="word" @click="selectWord">{{item}}</li>
        </div>
        <div class="third-line">
          <li v-for="item in lst3" :key="item" class="word" @click="selectWord">{{item}}</li>
          <li class="word space-css" @click="selectWord">space</li>
          <li class="word delete-css" @click="selectWord">x</li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'

export default {
  name: '',
  props: {
    deleteCss: {
      type: String,
      default: ''
    },
    correctInputWord: {}
  },
  data () {
    const validateWord = (rule, value, callback) => {
      const that = this
      let isError =
        that.ruleForm.spellWord.length ===
          that.correctInputWord.toLowerCase().length &&
        that.ruleForm.spellWord !== that.correctInputWord.toLowerCase()
      let isRight =
        that.ruleForm.spellWord === that.correctInputWord.toLowerCase()
      if (isError) {
        callback(new Error(' '))
      } else if (isRight) {
        callback()
        setTimeout(function () {
          that.$emit('checkRight')
          that.ruleForm.spellWord = ''
        }, 1000)
      }
    }
    return {
      lst1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      lst2: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      lst3: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ruleForm: {
        spellWord: ''
      },
      rules: {
        checkSpell: [{ validator: validateWord, trigger: 'change' }]
      }
    }
  },
  methods: {
    selectWord: function (res) {
      const that = this
      const selectWord = res.path[0].innerText.toLowerCase()
      if (selectWord === 'x') {
        that.ruleForm.spellWord = that.ruleForm.spellWord.slice(0, -1)
      } else if (selectWord === 'space') {
        that.ruleForm.spellWord = that.ruleForm.spellWord + ' '
      } else {
        that.ruleForm.spellWord = that.ruleForm.spellWord + selectWord
      }
    }
  },

  watch: {}
}
</script>
<style scoped>
.input-keyboard {
  display: inline-flex;
  flex-direction: column;
}

.key-board {
  width: 700px;
  background-color: white;
  display: inline-flex;
  padding: 40px 0;
  flex-direction: column;
  align-items: center;
}

.word {
  width: 58px;
  height: 55px;
  background-color: #f9f9f9;
  float: left;
  margin: 5px 5px;
  list-style: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: #333233;
  user-select: none;
}

.delete-css {
  width: 58px;
  font-size: 2.8em;
  color: red;
  background-color: #fadede;
  padding-bottom: 5px;
  font-weight: 300;
}

.space-css {
  width: 108px;
  font-size: 2em;
  color: rgb(58, 117, 173);
  background-color: #a7d1d8;
  padding-bottom: 5px;
  font-weight: 300;
}

.word:hover {
  background-color: #44b4f8;
  color: #fff;
  cursor: pointer;
}

.first-line {
  width: 680px;
}

.word .first-line,
.second-line,
.third-line {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.second-line {
  width: 613px;
}

.third-line {
  width: 680px;
}

.demo-ruleForm {
  width: 600px;
  display: inline-block;
}

.el-form >>> .el-icon-circle-check::before {
  content: url('../assets/correct-icon.png');
}

.el-form >>> .el-icon-circle-close::before {
  content: url('../assets/wrong-icon.png');
}

.el-form >>> .el-input__icon {
  width: 36px;
  margin-right: 10px;
  margin-top: 3px;
}

.el-form >>> .el-input__inner {
  height: 70px;
}

.el-form >>> .el-form-item.is-success .el-input__inner {
  border-color: #5bc459;
}
</style>
