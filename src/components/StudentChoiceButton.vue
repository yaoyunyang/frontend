<template>
  <div id="choice" ref="button">
    <img class="img" src="../assets/student_true.png" alt="true answer" ref="trueImage" />
    <el-button round @click="retu" class="before-choice">{{ answer }}</el-button>
    <img class="img" src="../assets/student_false.png" alt="false answer" ref="falseImage" />
    <img class="img" src="../assets/student_true.png" alt="true answer" ref="trueImageR" />
    <img class="img" src="../assets/student_false.png" alt="false answer" ref="falseImageR" />
  </div>
</template>

<script>
export default {
  name: 'StudentChoiceButton',
  props: ['index', 'answer', 'right_index'],
  data () {
    return {
      seen: false,
      timer: ''
    }
  },
  methods: {
    change: function () {
      this.$refs.button.className = 'before-choice'
      this.$refs.trueImage.className = 'img'
      this.$refs.falseImage.className = 'img'
    },
    back: function () {
      this.$emit('scoreChange', 0, this.index)
      this.$refs.falseImage.className = 'false-right'
    },
    add: function () {
      this.$emit('scoreChange', 10, this.index)
      this.$refs.trueImage.className = 'true-right'
    },
    retu: function () {
      if (this.index !== this.right_index) {
        this.$refs.button.className = 'select-choice'
        this.timer = setTimeout(this.back, 1000)
        this.timer = setTimeout(this.change, 2000)
      } else {
        this.$refs.button.className = 'select-choice'
        this.timer = setTimeout(this.add, 1000)
        this.timer = setTimeout(this.change, 2000)
      }
    }
  }
}
</script>

<style scoped>
.img {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
}

.true-right {
  position: absolute;
  bottom: 4px;
  right: -49px;
  visibility: visible;
}

.false-right {
  position: absolute;
  bottom: 4px;
  right: -34px;
  visibility: visible;
}

.false-left {
  position: absolute;
  top: 22px;
  left: -30px;
  visibility: visible;
}

.true-left {
  position: absolute;
  top: 16px;
  left: -46px;
  visibility: visible;
}

.false-choice img {
  position: absolute;
  bottom: 0;
  right: 0;
  visibility: visible;
}

.true-choice {
  position: relative;
}

.true-choice button {
  width: 500px;
  background: #4ac767;
  height: 42px;
  margin-top: 15px;
  margin-left: 0;
}

.before-choice {
  position: relative;
}

.before-choice button {
  width: 500px;
  background: white;
  height: 42px;
  margin-top: 15px;
  margin-left: 0;
}

.false-choice {
  position: relative;
}

.false-choice button {
  width: 500px;
  background: #ff6161;
  height: 42px;
  margin-top: 15px;
  margin-left: 0;
}

.select-choice {
  position: relative;
}

.select-choice button {
  width: 500px;
  background: #22c3fc8c;
  height: 42px;
  margin-top: 15px;
  margin-left: 0;
}
</style>
