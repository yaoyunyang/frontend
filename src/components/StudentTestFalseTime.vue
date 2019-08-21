<template>
  <div class="test-false">
    <p>错误</p>
    <p>{{falsetime}}次</p>
  </div>
</template>

<script>
export default {
  name: 'StudentTestFalseTime',
  components: {},
  data () {
    return {
      falsetime: 0
    }
  }
}
</script>

<style scoped>
.test-false {
  background-color: #ff6363;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border: 4px solid white;
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
}
</style>
