<template>
  <div class="make-choice">
    <button class="choice-css" @click="knowBtn">认识</button>
    <button class="choice-css" @click="noBtn">不认识</button>
    <button class="choice-css" @click="killBtn">kill it(烂熟)</button>
  </div>
</template>

<script>
const KNOW = 1
const DONNOTKNOW = 2
const KILL = 3
export default {
  name: '',
  methods: {
    knowBtn () {
      this.$emit('know', KNOW)
    },
    noBtn () {
      this.$emit('donnotknow', DONNOTKNOW)
    },
    killBtn () {
      this.$emit('kill', KILL)
    }
  }
}
</script>

<style scoped>
.make-choice {
  display: inline-flex;
  width: 600px;
  margin-left: 100px;
  flex-direction: column;
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
  outline: 0;
}

.choice-css:hover {
  background: #44b4f8;
  color: #fff;
  outline: 0;
}
</style>
