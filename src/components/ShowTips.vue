<template>
  <div class="show-tips" :currentWord="wordTip">
    <div class="rect-css">
      <div class="one-sample">
        <img src="../assets/student_listen_false.png" class="trumpet" />
        <span class="tip">{{this.wordTip.sentence}}</span>
      </div>
    </div>
    <button class="choice-css" @click="recall">想起来了</button>
    <button class="choice-css" @click="noRecall">没想起来</button>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    wordTip: {}
  },
  methods: {
    recall () {
      this.$emit('recallBtn')
    },
    noRecall () {
      this.$emit('noRecallBtn')
    }
  }
}
</script>

<style scoped>
.show-tips {
  display: inline-flex;
  width: 600px;
  margin-left: 100px;
  flex-direction: column;
}

.rect-css {
  display: flex;
  background: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  margin: 0 0 40px;
}

.one-sample {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.tip {
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
}

.trumpet {
  width: 22px;
  height: 20px;
  margin-left: 10px;
}

.choice-css {
  text-align: left;
  height: 35px;
  border-radius: 30px;
  margin: 10px 0;
  padding-left: 30px;
  background: #fff;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #efefef;
  outline: 0;
}

.choice-css:hover {
  background: #44b4f8;
  color: #fff;
  outline: 0;
}
</style>
