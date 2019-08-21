<template>
  <img :class="leftOrRight" :src="head" alt="portrait" />
</template>

<script>
export default {
  name: 'StudentHeadPortrait',
  // data () {
  //   return {
  //     head: ''
  //   }
  // },
  props: {
    leftOrRight: {
      type: String,
      default: 'left-avatar'
    },
    head: {}
  }
  // mounted: function () {
  //   this.head = this.cookies.get('info').image
  // }
}
</script>

<style scoped>
.left-avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border: 4px solid #2eb4ff;
}

.right-avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border: 4px solid #ffb700;
}
</style>
