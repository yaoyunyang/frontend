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
            <div class="item-in-rank-list" v-for="student in rankList" v-bind:key="student.rank">
              <div class="list-left">
                <div class="item-num-in-list">{{student.rank}}</div>
                <img class="item-avatar-in-list" :src="student.image" />
                <div class="item-name-in-list">{{student.name}}</div>
              </div>
              <div class="list-right">
                <div class="item-img-in-list">
                  <img :src="columnIcon" />
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
                <img :src="columnIcon" />
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
import clock from '../assets/student_clock.png'
import coin from '../assets/student_coin.png'
import diamond from '../assets/student_diamond.png'

export default {
  name: 'StudentRank',
  data () {
    return {
      columnIcon: clock
    }
  },
  mounted () {
    if (this.rankType === 'word') {
      this.columnIcon = diamond
    }
    if (this.rankType === 'coin') {
      this.columnIcon = coin
    }
  },
  props: {
    rankType: {
      type: String,
      default: ''
    },
    firstStudent: {
      type: Object,
      default: function () {
        return {}
      }
    },
    secondStudent: {
      type: Object,
      default: function () {
        return {}
      }
    },
    thirdStudent: {
      type: Object,
      default: function () {
        return {}
      }
    },
    thisStudent: {
      type: Object,
      default: function () {
        return {}
      }
    },
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
    },
    rankList: {
      type: Array,
      default: function () {
        return []
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
  position: relative;
  right: 20px;
  width: 120px;
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
