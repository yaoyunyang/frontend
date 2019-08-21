<template>
  <div>
    <div class="student-rank">
      <div class="rank-size" :style="{border: hasBorder}">
        <img :src="imgSrc" class="hardworking-img-css" />
        <div class="rank-text">
          <span class="rank-title">{{rankTitle}}</span>
          <span class="rank-description">{{rankDescription}}</span>
        </div>
        <div class="top-three-css">
          <div class="rank-top-css">
            <div>
              <img class="rank-second-avatar" :src="secondStudent.image" />
            </div>
            <img src="../assets/student_second.png" />
          </div>
          <div class="rank-top-css">
            <img src="../assets/student_crown.png" class="crown-location" />
            <div>
              <img class="rank-top-avatar" :src="firstStudent.image" />
            </div>
            <img src="../assets/student_top.png" />
          </div>
          <div class="rank-third-css">
            <div>
              <img class="rank-third-avatar" :src="thirdStudent.image" />
            </div>
            <img src="../assets/student_third.png" />
          </div>
        </div>
        <div class="rank-down-list">
          <div class="rank-list-css">
            <div class="item-in-rank-list" v-for="student in studentList" v-bind:key="student.rank">
              <div class="list-left">
                <div class="item-num-in-list">{{student.rank}}</div>
                <img class="item-avatar-in-list" :src="student.image" />
                <div class="item-name-in-list">{{student.name}}</div>
              </div>
              <div class="list-right">
                <div class="item-img-in-list">
                  <img src="../assets/student_diamond.png" />
                </div>
                <div class="item-time-in-list">{{student.point}}</div>
              </div>
            </div>
          </div>
          <div class="self-rank">
            <div class="list-left">
              <div class="item-num-in-list self-num">{{thisStudent.rank}}</div>
                <img class="item-avatar-in-list self-avatar" :src="thisStudent.image" />
              <div class="item-name-in-list self-name">{{thisStudent.name}}</div>
            </div>
            <div class="list-right">
              <div class="item-img-in-list">
                <img src="../assets/student_diamond.png" />
              </div>
              <div class="item-time-in-list self-time">{{thisStudent.point}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '../assets/student_avatar.png'

const axios = require('axios')
export default {
  name: 'StudentMatchRank',
  data () {
    return {
      firstStudent: {},
      secondStudent: {},
      thirdStudent: {},
      thisStudent: {},
      tempStudent: {},
      studentList: []
    }
  },
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    rankTitle: {
      type: String,
      default: ''
    },
    rankDescription: {
      type: String,
      default: ''
    },
    hasBorder: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    const that = this
    axios
      .get(that.baseUrl + '/words/getastudentinmatch/', {
        params: {
          student_id: that.cookies.get('id'),
          name: that.rankDescription
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.tempStudent = res['data'][0]
        }
      })
    axios
      .get(that.baseUrl + '/words/getmatchrank/', {
        params: {
          match_id: that.rankDescription
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.studentList = res['data']
          for (var index = 0; index < that.studentList.length; index++) {
            if (that.studentList[index]['name'] === that.tempStudent['name']) {
              that.thisStudent = that.studentList[index]
            }
          }
          if (that.studentList.length > 10) {
            that.studentList = that.studentList.slice(0, 10)
          }
          for (var index1 = 0; index1 < that.studentList.length; index1++) {
            if (that.studentList[index1]['image'] === 'DEFAULT VALUE') {
              that.studentList[index1]['image'] = avatar
            }
          }
          that.firstStudent = that.studentList[0]
          that.secondStudent = that.studentList[1]
          that.thirdStudent = that.studentList[2]
          if (that.studentList.length < 3) {
            that.thirdStudent = {
              image: avatar
            }
          }
          if (that.studentList.length < 2) {
            that.secondStudent = {
              image: avatar
            }
          }
          if (that.studentList.length < 1) {
            that.firstStudent = {
              image: avatar
            }
          }
          that.studentList.splice(0, 3)
        }
      })
    if (JSON.stringify(that.thisStudent) === '{}') {
      that.thisStudent = {
        rank: 999,
        name: '未参加',
        point: 0,
        image: this.cookies.get('info')['image']
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.student-rank {
  display: inline-block;
  padding-top: 38px;
  box-sizing: content-box;
  margin: 10px 10px 0 0;
}

.rank-size {
  width: 330px;
  height: 590px;
  background-color: #fff;
  position: relative;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.hardworking-img-css {
  position: absolute;
  top: -38px;
  left: 45px;
}

.rank-text {
  position: relative;
  display: inline-block;
  top: -21px;
  left: 129px;
}

.rank-title,
.rank-description {
  display: block;
  width: 80px;
  text-align: center;
  color: white;
}

.rank-title {
  font-size: 15px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
}

.rank-description {
  font-size: 12px;
}

.top-three-css {
  margin-top: 20px;
  text-align: center;
}

.rank-top-css,
.rank-second-css,
.rank-third-css {
  display: inline-block;
}

.rank-second-avatar,
.rank-top-avatar,
.rank-third-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
  background-size: contain;
  background-color: black;
  position: absolute;
}

.rank-second-avatar {
  border: 1px solid #0045f5;
  left: 40px;
  top: 67px;
}

.rank-top-avatar {
  border: 1px solid #ee4f34;
  left: 140px;
  top: 52px;
}

.rank-third-avatar {
  border: 1px solid #43943d;
  left: 235px;
  top: 80px;
}

.crown-location {
  position: absolute;
  left: 155px;
  top: 27px;
  z-index: 1;
}

.rank-down-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/* rank list css */
.rank-list-css {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-in-rank-list {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 300px;
  padding: 0 15px;
  background-color: #eef9fe;
  border-radius: 5px;
  margin-top: 10px;
}

.item-name-in-list,
.item-num-in-list,
.item-time-in-list,
.item-img-in-list,
.list-right,
.list-left {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.list-right {
  width: 54px;
}

.item-time-in-list {
  width: 28px;
  justify-content: center;
}

.item-num-in-list {
  color: #44b4f8;
}

.item-img-in-list {
  margin-right: 5px;
}

.item-name-in-list {
  margin-left: 10px;
}

.item-avatar-in-list {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 10px;
  border: 1px solid #44b4f8;
  background-size: contain;
}

/* self rank css */
.self-rank {
  background: #44b4f8;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.self-num,
.self-name,
.self-time {
  color: #fff;
}

.self-num {
  font-size: 16px;
}

.self-avatar {
  border: 1px solid #fff;
}

.self-name {
  font-size: 16px;
  font-weight: bold;
}

.self-time {
  font-size: 16px;
}
</style>
