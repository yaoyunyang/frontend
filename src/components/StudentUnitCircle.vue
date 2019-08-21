<template>
  <div class="unit-outter" >
    <div id="unit-status" :class="status" :unitNum = "unit" @click="changeUnit">
      <p>{{this.unit}}</p>
      <div class="unit-finished-mark">
        <img src="../assets/student_unit_finished_mark.png" alt="finished mark" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    status: {
      type: String,
      default: 'unit-finished'
    },
    unit: {}
  },
  methods: {
    changeUnit () {
      let dic = {}
      dic['unitName'] = this.unit
      dic['unitStatus'] = this.status
      this.$emit('getUnit', dic)
    }
  }
}
</script>

<style scoped>
.unit-outter {
  display: inline-block;
}

.unit-before-studying {
  width: 50px;
  height: 50px;
  background-image: url('../assets/student_unit_before_study.png');
  background-size: 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
}

.unit-before-studying img {
  visibility: hidden;
}

.unit-studying {
  width: 50px;
  height: 50px;
  background-image: url('../assets/student_unit_studying.png');
  background-size: 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
}

.unit-studying img {
  visibility: hidden;
}

.unit-finished {
  width: 50px;
  height: 50px;
  background-image: url('../assets/student_unit_finished.png');
  background-size: 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  position: relative;
}

.unit-finished img {
  visibility: visible;
  width: 18px;
  height: 18px;
}

.unit-finished-mark {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 18px;
  height: 18px;
}
</style>
