<template>
  <div class="word-card" :style="{borderColor: cardColor}">
    <div class="wrap">
      <span class="word" :word="name">{{name}}</span>
      <span class="symbol" :pro="explains">{{explains}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordCard',
  props: {
    name: {
      type: String,
      default: ''
    },
    explains: {
      type: String,
      default: ''
    },
    cardColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.word-card {
  width: 170px;
  height: 88px;
  border-radius: 10px;
  border: 1px solid;
  border-bottom: 6px solid;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 0 0 28px;
  float: left;
  text-align: left;
}

.wrap {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.word {
  font-size: 18px;
  line-height: 22px;
  color: #000;
}

.symbol {
  font-size: 14px;
  line-height: 22px;
  color: #5e5e5e;
}
</style>
