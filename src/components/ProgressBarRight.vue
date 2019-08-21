<template>
  <div class="outter-background">
    <span class="percentage-word">{{rightPercentage}}</span>
    <div class="progress-bar">
      <el-progress :percentage="100" stroke-width="270"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    rightPercentage: {
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
    that.percentage = that.rightPercentage
    that.barWidth = document.querySelectorAll('.el-progress-bar__inner')[1]
    that.barWidth.style.height = that.percentage + '%'
  },
  methods: {
    format () {
      const that = this
      that.percentage = that.rightPercentage
      that.percentage = parseInt(that.percentage) + 1
      if (that.barWidth.style.height !== that.percentage + '%') {
        that.barWidth.style.height = that.percentage + '%'
      }
    }
  },
  watch: {
    rightPercentage: function () {
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
  background: #fff9e9;
}

.percentage-word {
  display: inline-block;
  margin: 15px 0;
  font-size: 1.5em;
  color: #ee5a35;
  font-weight: 500;
}

.progress-bar {
  width: 20px;
  display: inline-block;
  transform: rotate(180deg);
  margin-bottom: 20px;
}

.el-progress >>> .el-progress-bar__outer {
  background: #fff9e9;
  border: 2px solid #ed4634;
}

.el-progress >>> .el-progress-bar__inner {
  background-color: #f7b744;
  background-image:
    repeating-linear-gradient(
      -135deg,
      transparent 0.1rem,
      #f7b744 0.3rem,
      #ef6a37 0.8rem
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
