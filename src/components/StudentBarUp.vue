<template>
  <div class="up-bar">
    <div class="avatar-nickname-coin">
      <el-upload
        class="avatar-uploader"
        :action="toUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="headMsg"
        :with-credentials="credentials"
        list-type="picture"
        :data="{accountId: this.cookies.get('id')}"
        accept="image/png, image/jpg, image/jpeg"
      >
        <img v-if="userAvatar !== 'DEFAULT VALUE'" :src="userAvatar" class="avatar" />
        <img v-else src="../assets/student_avatar.png" class="avatar" />
      </el-upload>
      <div class="nickname-coin">
        <el-button type="text" @click="open">{{nickname}}</el-button>
        <div class="coin">
          <img src="../assets/student_coin.png" />
          <label>{{coin}}</label>
        </div>
      </div>
    </div>
    <div class="schema">
      <Calendars
        class="calendar"
        v-on:choseDay="clickDay"
        :futureDayHide="currentTime"
        :agoDayHide="oldTime"
        :markDate="arr"
        ref="calendar"
        v-if="ifCalendar"
      ></Calendars>
      <el-button round class="clock-in" @click="calendarShow">打卡</el-button>
    </div>
    <!--提示弹框 -->
    <el-dialog title="提示" :visible.sync="coinVisible" width="30%">
      <span>打卡成功，金币+10</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="coinVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Calendars from 'vue-calendar-component'
import axios from 'axios'

export default {
  components: {
    Calendars
  },
  data () {
    return {
      ifCalendar: false,
      headMsg: {
        'x-csrftoken': this.cookies.get('csrftoken')
      },
      credentials: true,
      toUrl: this.baseUrl + '/words/getimg/',
      userAvatar: '',
      nickname: '',
      showBarUp: false,
      coinVisible: false,
      currentTime: '0',
      oldTime: '0',
      arr: '',
      coin: 0
    }
  },
  methods: {
    coinChange (val) {
      const that = this
      axios.get(that.baseUrl + '/words/coinchange/', {
        params: {
          studentId: that.cookies.get('id'),
          coinChange: val
        }
      })
    },
    clickDay (data) {
      this.coin += 10
      this.coinChange(10)
      const that = this
      that.coinVisible = true
      let yesterdayTmp = Date.parse(new Date()).toString()
      yesterdayTmp = yesterdayTmp.substr(0, 10)
      that.oldTime = yesterdayTmp
      axios.get(that.baseUrl + '/words/hitcalendar/', {
        params: {
          studentId: that.cookies.get('id'),
          hitDate: data
        }
      })
    },
    open () {
      this.$prompt('请填写新的昵称', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        inputPattern: /^.{1,13}$/,
        inputErrorMessage: '名字不能空且最大长度为13',
        center: true
      })
        .then(({ value }) => {
          axios
            .get(this.baseUrl + '/words/changename', {
              params: {
                id: this.cookies.get('id'),
                name: value
              }
            })
            .then(res => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.nickname = value
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    calendarShow () {
      const vm = this
      if (vm.ifCalendar === false) {
        vm.ifCalendar = true
      } else {
        vm.ifCalendar = false
      }
    },
    handleAvatarSuccess (res, file) {
      this.userAvatar = file.url
    }
  },
  mounted () {
    const that = this
    let currentTmp = Date.parse(new Date()).toString()
    currentTmp = currentTmp.substr(0, 10)
    that.currentTime = currentTmp
    let yesterdayTmp = (Date.parse(new Date()) - 24 * 60 * 60 * 1000).toString()
    yesterdayTmp = yesterdayTmp.substr(0, 10)
    that.oldTime = yesterdayTmp
    that.arr = ['2019/8/10', '2019/8/11', '2019/8/13']
    axios
      .get(that.baseUrl + '/words/showcalendar/', {
        params: {
          studentId: that.cookies.get('id')
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.arr = res['data']
          let day = new Date()
          let Year = 0
          let Month = 0
          let Day = 0
          let CurrentDate = ''
          Year = day.getFullYear()
          Month = day.getMonth() + 1
          Day = day.getDate()
          CurrentDate += Year + '/' + Month + '/' + Day
          if (that.arr.indexOf(CurrentDate) !== -1) {
            that.oldTime = currentTmp
          }
        }
      })
    axios
      .get(that.baseUrl + '/words/getstudentinfo', {
        params: {
          id: that.cookies.get('id')
        }
      })
      .then(res => {
        axios
          .get(that.baseUrl + '/words/getstudentinfo', {
            params: {
              id: that.cookies.get('id')
            }
          })
          .then(res => {
            that.userAvatar = res.data.info['image']
            that.nickname = res.data.info['name']
            that.coin = res.data.info['coin']
          })
      })
  }
}
</script>

<style scoped>
.up-bar {
  height: 160px;
  width: 300px;
  display: inline-block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 20px;
  background-image: url('../assets/student_background.png');
  background-size: 300px 160px;
  box-shadow: #cdedef 0 0 5px 5px;
}

.avatar-nickname-coin {
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 20px;
}

.avatar-nickname-coin label {
  font-size: 16px;
}

.nickname-coin {
  margin-left: 16px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  outline: none;
  box-shadow: white 0 0 1px 1px;
  background-image: url('../assets/student_avatar.png');
}

.coin {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.coin label {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

.el-radio-button__inner {
  padding: 5px 5px !important;
  border-radius: 50%;
  font-size: 10px;
}

.schema {
  margin-top: 20px;
}

.clock-in {
  margin-top: 10px;
}

.calendar {
  z-index: 100;
  position: absolute;
  top: 0;
  margin-top: 148px;
}

.el-button.is-round {
  border-radius: 20px;
  padding: 6px 20px;
  font-size: 12px;
  color: #f7b844;
  float: right;
  margin-right: 30px;
}

.nickname-coin >>> .el-button {
  padding: 3px 0;
}

.nickname-coin >>> .el-button--text {
  color: #4e4e4e;
}

.calendar >>> .wh_item_date {
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar >>> .wh_content_item .wh_isToday {
  background: #ffeb00;
  border-radius: 100px;
}

.calendar >>> .wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: #10ff00;
  z-index: 2;
}

.calendar >>> .wh_content_all {
  background-color: #39a47a;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.calendar >>> .wh_content_item .wh_want_dayhide {
  color: #fff;
}

.calendar >>> .wh_item_date:hover {
  cursor: auto;
}
</style>
