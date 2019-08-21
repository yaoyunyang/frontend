<template>
  <div class="question-card">
    <div>
      <span class="order-number" :num="index">{{index}}、</span>
      <span class="question-title" :title="word">{{word}}</span>
    </div>
    <el-radio-group v-model="radio" @change="$emit('choice', radio)">
      <el-radio :label="0" border>
        <span class="choice-pre" :aChoice="choiceA">A.</span>
        {{choiceA}}
      </el-radio>
      <br />
      <el-radio :label="1" border>
        <span class="choice-pre" :bChoice="choiceB">B.</span>
        {{choiceB}}
      </el-radio>
      <br />
      <el-radio :label="2" border>
        <span class="choice-pre" :cChoice="choiceC">C.</span>
        {{choiceC}}
      </el-radio>
      <br />
      <el-radio :label="3" border>
        <span class="choice-pre" :dChoice="choiceD">D.</span>
        {{choiceD}}
      </el-radio>
      <br />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  data () {
    return {
      radio: ''
    }
  },
  props: {
    choiceA: {},
    choiceB: {},
    choiceC: {},
    choiceD: {},
    index: {},
    word: {}
  }
}
</script>

<style scoped>
.question-card {
  margin-top: 10px;
  margin-left: 20px;
}

.question-title,
.order-number {
  color: #333;
  font-size: 12px;
  font-weight: 700;
}

.el-radio {
  margin-top: 10px;
  width: 250px;
  height: 30px;
  background-color: #fefeff;
  padding-top: 0;
  color: #373644;
  border-radius: 16px;
  display: flex;
  align-items: center;
}

.choice-pre {
  margin-right: 10px;
}

.el-radio >>> .el-radio__label {
  font-size: 11px;
  padding-left: 8px;
}

.el-radio >>> .el-radio__input {
  display: none;
}

.el-radio.is-bordered.is-checked {
  background: #ebf8fe;
}
</style>
