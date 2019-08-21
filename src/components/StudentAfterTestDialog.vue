<template>
  <div class="after-test-dialog">
    <div class="after-test-head">【测试结果】</div>
    <p>本次测试{{score}}分！收获{{coins}}金币！</p>
    <CheckboxGroup v-model="choice" :size="large" class="after-test-checkbox">
      <Checkbox label="Pass"></Checkbox>
      <Checkbox label="Fail"></Checkbox>
    </CheckboxGroup>
    <button class="after-test-button">查看学习计划</button>
    <button class="after-test-button">开始学习</button>
  </div>
</template>

<script>
export default {
  name: 'StudentAfterStudyDialog',
  data () {
    return {
      score: '12',
      coins: '0',
      choice: ['Fail']
    }
  }
}
</script>

<style scoped>
.after-test-head {
  background-color: #1890ff;
  position: absolute;
  top: 0;
  width: 300px;
  text-align: left;
  color: white;
}

.after-test-button {
  background-color: #1890ff;
  width: 130px;
  height: 30px;
  border: none;
  outline: none;
  color: white;
  margin-top: 10px;
  border-radius: 10px;
}

.after-test-dialog {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  font-size: 13px;
  border-radius: 10px;
}

.after-test-dialog p {
  font-size: 18px;
  margin-top: 20px;
}

.after-test-checkbox {
  margin-top: 10px;
}
</style>
