<template>
  <div class="icon-border-css">
    <header>
      <img class="icon-css" :src="matchTypeImage" alt="比赛类型" />
      <div class="issue-css">{{compData.join}}</div>
    </header>
    <div>
      <div class="on-css">
        <div class="radio-css"></div>
        <span class="date-css">{{compData.matchName}}</span>
      </div>
      <div class="message-css">
        <span>{{compData.status}}</span>
        <span class="book-css">{{compData.book}}</span>
      </div>
    </div>
    <footer class="footer-css">
      <div class="reward-css">
        <img class="second-css" :src="secondStudentAvatar" alt="第二名用户" />
        <img class="crown-css" src="../assets/student_crown.png" alt="皇冠" />
        <img class="first-css" :src="firstStudentAvatar" alt="第一名用户" />
        <img class="third-css" :src="thirdStudentAvatar" alt="第三名用户" />
        <img class="rank-second-css" src="../assets/mini_student_second.png" alt="第二名" />
        <img class="rank-first-css" src="../assets/mini_student_first.png" alt="第一名" />
        <img class="rank-third-css" src="../assets/mini_student_third.png" alt="第三名" />
        <div class="name-first-css">{{firstStudentName}}</div>
        <div class="name-third-css">{{thirdStudentName}}</div>
        <div class="name-second-css">{{secondStudentName}}</div>
      </div>
      <div>
        <span class="footer-rank-css">我的排名: {{rank}}</span>
        <a @click="matchView" class="match-css">详情&nbsp;></a>
      </div>
    </footer>
  </div>
</template>

<script>
import pkurl from '../assets/pk-icon.png'
import alongurl from '../assets/along-icon.png'
import defaultAvatar from '../assets/student_avatar.png'

const axios = require('axios')
export default {
  props: ['compData'],
  data () {
    return {
      matchName: '',
      matchTypeImage: '',
      status: '',
      rank: '',
      firstStudentName: '',
      secondStudentName: '',
      thirdStudentName: '',
      firstStudentAvatar: defaultAvatar,
      secondStudentAvatar: defaultAvatar,
      thirdStudentAvatar: defaultAvatar
    }
  },
  methods: {
    matchView () {
      this.$emit('ChangeVisible', this.compData.matchName)
    }
  },
  created () {
    const that = this
    axios
      .get(that.baseUrl + '/words/getastudentinmatch/', {
        params: {
          student_id: that.cookies.get('id'),
          name: that.compData.matchName
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.rank = res['data'][0]['rank']
        } else {
          that.rank = 999
        }
      })
    if (this.compData.type === 'pk排位') {
      this.matchTypeImage = pkurl
    } else if (this.compData.type === '一战到底') {
      this.matchTypeImage = alongurl
    }
    if (that.compData.firstStudent !== 'null') {
      axios
        .get(that.baseUrl + '/words/getastudentinmatch/', {
          params: {
            student_id: that.compData.firstStudent,
            name: that.compData.matchName
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.firstStudentName = res['data'][0]['name']
            if (res['data'][0]['image'] === 'DEFAULT VALUE') {
              that.firstStudentAvatar = defaultAvatar
            } else {
              that.firstStudentAvatar = res['data'][0]['image']
            }
          }
        })
    } else {
      that.firstStudentName = ' '
      that.firstStudentAvatar = defaultAvatar
    }
    if (that.compData.secondStudent !== 'null') {
      axios
        .get(that.baseUrl + '/words/getastudentinmatch/', {
          params: {
            student_id: that.compData.secondStudent,
            name: that.compData.matchName
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.secondStudentName = res['data'][0]['name']
            if (res['data'][0]['image'] === 'DEFAULT VALUE') {
              that.secondStudentAvatar = defaultAvatar
            } else {
              that.secondStudentAvatar = res['data'][0]['image']
            }
          }
        })
    } else {
      that.secondStudentName = ' '
      that.secondStudentAvatar = defaultAvatar
    }
    if (that.compData.thirdStudent !== 'null') {
      axios
        .get(that.baseUrl + '/words/getastudentinmatch/', {
          params: {
            student_id: that.compData.thirdStudent,
            name: that.compData.matchName
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.thirdStudentName = res['data'][0]['name']
            if (res['data'][0]['image'] === 'DEFAULT VALUE') {
              that.thirdStudentAvatar = defaultAvatar
            } else {
              that.thirdStudentAvatar = res['data'][0]['image']
            }
          }
        })
    } else {
      that.thirdStudentName = ' '
      that.thirdStudentAvatar = defaultAvatar
    }
  }
}
</script>

<style scoped>
.icon-border-css {
  width: 190px;
  height: 243px;
  background-color: white;
  border-radius: 5px;
  border-top: 5px solid rgb(240, 240, 240);
  border-left: 1.5px solid rgb(240, 240, 240);
  border-bottom: 1.5px solid rgb(240, 240, 240);
  border-right: 1.5px solid rgb(240, 240, 240);
  transform: scale(0.87);
}

.icon-css {
  position: relative;
  top: -12.5px;
  width: 130px;
}

.issue-css {
  display: inline-block;
  position: relative;
  bottom: 20px;
  left: 13px;
  width: 46px;
  height: 16px;
  color: white;
  font-size: 10px;
  font-weight: 900;
  text-align: center;
  padding-top: 1px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  background-color: rgb(46, 180, 255);
}

.on-css {
  display: flex;
}

.radio-css {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: rgb(95, 205, 120);
  margin-left: 60px;
  margin-top: 9px;
}

.date-css {
  width: 100px;
  height: 20px;
  color: black;
  font-size: 16px;
  font-weight: bolder;
  margin-left: 10px;
}

.message-css {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px auto 0;
}

.book-css {
  margin: 6px 0;
}

.reward-css {
  position: relative;
  width: 100%;
  height: 70px;
  margin-top: 8px;
  margin-left: 6px;
  margin-bottom: 5px;
}

.rank-first-css {
  width: 50px;
  position: absolute;
  top: 6px;
  right: 73px;
}

.rank-second-css {
  width: 50px;
  position: absolute;
  top: 10px;
  right: 125px;
}

.rank-third-css {
  width: 50px;
  position: absolute;
  top: 17px;
  left: 116px;
}

.first-css {
  position: relative;
  border-radius: 50%;
  border: 1px solid rgb(255, 115, 15);
  width: 25px;
  height: 25px;
  top: 6px;
  left: 36px;
  z-index: 1;
}

.second-css {
  position: relative;
  border-radius: 50%;
  border: 1px solid rgb(89, 106, 250);
  width: 25px;
  height: 25px;
  top: 12px;
  left: 26px;
  z-index: 1;
}

.third-css {
  position: relative;
  border-radius: 50%;
  border: 1px solid rgb(1, 135, 32);
  width: 25px;
  height: 25px;
  top: 18px;
  left: 63px;
  z-index: 1;
}

.name-first-css {
  position: relative;
  text-align: center;
  width: 43px;
  height: 25px;
  top: 5px;
  left: 68px;
  font-size: 10px;
  color: white;
  z-index: 1;
  font-weight: 900;
}

.name-third-css {
  position: relative;
  text-align: center;
  width: 80px;
  height: 18px;
  top: -10px;
  left: 100px;
  font-size: 10px;
  color: white;
  z-index: 1;
  font-weight: 900;
}

.name-second-css {
  position: relative;
  text-align: center;
  width: 43px;
  height: 20px;
  bottom: 30px;
  left: 15px;
  font-size: 10px;
  color: white;
  z-index: 1;
  font-weight: 900;
}

.crown-css {
  position: relative;
  width: 15px;
  bottom: 16px;
  left: 60px;
  z-index: 2;
}

.footer-rank-css {
  margin-left: 17px;
  font-size: 13px;
}

.match-css {
  margin-left: 40px;
  font-size: 13px;
}
</style>
