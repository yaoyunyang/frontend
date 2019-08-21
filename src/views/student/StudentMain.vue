<template>
  <div class="background">
    <student-header></student-header>
    <div class="bar">
      <div class="wrap">
        <student-bar-up class="bar-up"></student-bar-up>
        <student-bar-down class="bar-down"></student-bar-down>
      </div>
    </div>
  </div>
</template>

<script>
import StudentBarUp from '../../components/StudentBarUp'
import StudentBarDown from '../../components/StudentBarDown'
import StudentHeader from '../../components/StudentHeader'

export default {
  name: 'StudentMain',
  components: {
    StudentBarUp,
    StudentBarDown,
    StudentHeader
  }
}
</script>

<style scoped>
.bar {
  background-image: url('../../assets/student_background.png');
  text-align: center;
  background-size: 100% 100%;
  user-select: none;
}

.wrap {
  display: inline-block;
  text-align: left;
}

.bar-up {
  position: absolute;
}
</style>
