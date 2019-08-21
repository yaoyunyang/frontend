<template>
  <div class="outter-background">
    <span class="percentage-word">{{leftPercentage}}</span>
    <div class="progress-bar">
      <el-progress :percentage="100" stroke-width="270"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    leftPercentage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      barHeight: '',
      barWidth: '',
      percentage: ''
    }
  },
  mounted () {
    const that = this
    that.percentage = that.leftPercentage
    that.barWidth = document.querySelector('.el-progress-bar__inner')
    that.barWidth.style.height = that.percentage + '%'
  },
  methods: {
    format () {
      const that = this
      that.percentage = that.leftPercentage
      that.percentage = parseInt(that.percentage) + 1
      if (that.barWidth.style.height !== that.percentage + '%') {
        that.barWidth.style.height = that.percentage + '%'
      }
    }
  },
  watch: {
    leftPercentage: function () {
      this.format()
    }
  }
}
</script>

<style scoped>
.outter-background {
  width: 60px;
  border-radius: 10px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  background: #eff9fe;
}

.percentage-word {
  display: inline-block;
  margin: 15px 0;
  font-size: 1.5em;
  color: #0066f6;
  font-weight: 500;
}

.progress-bar {
  width: 20px;
  display: inline-block;
  transform: rotate(180deg);
  margin-bottom: 20px;
}

.el-progress >>> .el-progress-bar__outer {
  background: #eff9fe;
  border: 2px solid #4482f7;
}

.el-progress >>> .el-progress-bar__inner {
  background-color: #44b4f8;
  background-image:
    repeating-linear-gradient(
      -135deg,
      transparent 0.1rem,
      #44b4f8 0.3rem,
      #2979f6 0.8rem
    );
}

.el-progress >>> .el-progress__text {
  display: none;
}

.el-progress >>> .el-progress-bar {
  padding-right: 0;
  margin-right: 0;
}
</style>
