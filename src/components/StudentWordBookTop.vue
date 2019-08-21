<template>
  <div class="student-word-book-top">
    <div class="word-book-top">
      <div class="word-book-top-left">
        <label class="review-text">复习顺序:</label>
        <a @click="colorSequence" class="select-order" :style="{color : knowColor}">熟悉程度</a>
        <a @click="letterSequence" class="select-order" :style="{color : letterColor}">字母排序</a>
      </div>
      <div class="word-book-top-right">
        <div class="one-block">
          <div class="circle red"></div>
          <label>生词</label>
        </div>
        <div class="one-block">
          <div class="circle blue"></div>
          <label>熟悉</label>
        </div>
        <div class="one-block">
          <div class="circle green"></div>
          <label>熟练</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'StudentWordBookTop',
  data () {
    return {
      orderByLetter: true,
      orderByColor: true,
      letterColor: '#727272',
      knowColor: '#727272'
    }
  },
  methods: {
    letterSequence () {
      if (this.letterColor !== '#5cc865') {
        this.$emit('orderByLetter', this.orderByLetter)
        this.letterColor = '#5cc865'
        this.knowColor = '#727272'
      }
    },
    colorSequence () {
      if (this.knowColor !== '#5cc865') {
        this.$emit('orderByColor', this.orderByColor)
        this.knowColor = '#5cc865'
        this.letterColor = '#727272'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.student-word-book-top {
  width: 630px;
}

.word-book-top {
  display: flex;
  justify-content: space-between;
  margin: 10px 36px 10px 28px;
}

.one-block,
.word-book-top,
.word-book-top-left,
.word-book-top-right {
  display: flex;
  align-items: center;
}

.review-text {
  color: #000;
  font-size: 14px;
  margin-bottom: 3px;
}

.select-order {
  display: inline-block;
  text-decoration: none;
  font-size: 12px;
  color: #727272;
  margin-left: 20px;
}

.select-order:focus {
  color: #5cc865;
}

.one-block {
  margin-left: 30px;
  color: #727272;
  font-size: 14px;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.red {
  background-color: #f28d6f;
}

.green {
  background-color: #8be575;
}

.blue {
  background-color: #84d2fa;
}
</style>
