<template>
  <div class="after-study-dialog">
    <p>巩固刚学的单词，马上进入拼写强化阶段</p>
    <button class="start-spelling">开始拼写</button>
  </div>
</template>

<script>
export default {
  name: 'StudentAfterStudyDialog'
}
</script>

<style scoped>
.start-spelling {
  background-color: #4ac767;
  width: 200px;
  height: 30px;
  border: none;
  outline: none;
  color: white;
  margin-top: 30px;
  border-radius: 10px;
}

.after-study-dialog {
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
