<template>
  <header id="header">
    <img class="imgCss" src="../assets/student_bird.png" />
    <div class="content">
      <div class="cup-rank">
        <img src="../assets/student_cup.png" />
        <a @click="toRankPage" class="rank-text" ref="rank">排行榜</a>
        <div class="new-logo">
          <span class="new-logo-text">new</span>
        </div>
      </div>
      <a @click="toMain" class="student-header-text" ref="main">主页</a>
      <a @click="toLogin" class="student-header-text">退出</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'StudentHeader',
  methods: {
    toRankPage: function () {
      const that = this
      that.$router.push('/StudentRankPage')
    },
    toMain: function () {
      const that = this
      that.$router.push('/StudentMain')
    },
    toLogin: function () {
      const that = this
      that.$router.push('/')
    }
  },
  mounted () {
    if (this.$route.name === 'StudentMain') {
      const mainPage = this.$refs.main
      mainPage.style.color = '#69d081'
      const rankPage = this.$refs.rank
      rankPage.style.color = '#6d6d6d'
    } else if (this.$route.name === 'StudentRankPage') {
      const rankPage = this.$refs.rank
      rankPage.style.color = '#69d081'
      const mainPage = this.$refs.main
      mainPage.style.color = '#6d6d6d'
    }
  }
}
</script>

<style scope>
body {
  font-size: none;
  line-height: none;
  color: none;
}

#header {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
}

.content {
  display: inline-flex;
  align-items: center;
  margin-left: 684px;
}

.cup-rank {
  display: inline-flex;
  align-items: center;
}

.rank-text {
  margin-left: 10px;
  color: #6d6d6d;
  font-size: 14px;
  cursor: pointer;
}

.new-logo {
  position: relative;
  height: 12px;
  width: 22px;
  bottom: 10px;
  left: 2px;
  background-color: #ed4542;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.new-logo-text {
  font-size: 10px;
  color: white;
}

.student-header-text {
  display: inline-block;
  text-decoration: none;
  color: #6d6d6d;
  font-size: 14px;
  margin-left: 40px;
  cursor: pointer;
}
</style>
