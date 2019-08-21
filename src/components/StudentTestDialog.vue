<template>
  <div class="test-dialog">
    <p>马上进入下一回合，冲鸭！</p>
    <button class="start-studying">开始学习</button>
  </div>
</template>

<script>
export default {
  name: 'StudentAfterStudyDialog',
  data () {
    return {}
  }
}
</script>

<style scoped>
.start-studying {
  background-color: #4ac767;
  width: 200px;
  height: 30px;
  border: none;
  outline: none;
  color: white;
  margin-top: 30px;
  border-radius: 10px;
}

.test-dialog {
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
</style>
