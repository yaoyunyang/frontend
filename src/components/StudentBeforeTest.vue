<template>
  <div>
    <p class="zero-line">初中核心词</p>
    <div class="student-before-test">
      <p class="first-line">3分钟测出你的词汇掌握水平</p>
      <p class="second-line">根据检测结果定制针对性学习方案</p>
      <p class="third-line">你需要在3分钟内完成一下题目，请保持专注</p>
      <button class="start-test-button">立即开始</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentBeforeTest',
  data () {
    return {}
  }
}
</script>

<style scoped>
.zero-line {
  font-weight: 900;
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.start-test-button {
  background-color: #1890ff;
  width: 80px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 5px;
  color: white;
}

.first-line {
  font-weight: 900;
  font-size: 12px;
  color: #a7a7a7;
  margin-bottom: 15px;
}

.second-line {
  font-weight: 400;
  font-size: 13px;
  color: #a7a7a7;
  margin-bottom: 80px;
}

.third-line {
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 20px;
}

.student-before-test {
  flex-direction: column;
  height: 660px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
