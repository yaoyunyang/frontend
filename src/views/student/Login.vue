<template>
  <div id="login" ref="page">
    <div class="login-content">
      <div class="login-header">
        <h1>单词赢</h1>
        <p>三天背完小升初&nbsp;七天背完中高考</p>
      </div>
      <div class="form">
        <Input v-model="account" placeholder="账户" class="login-input" id="account-input" />
        <Input
          v-model="password"
          placeholder="密码"
          type="password"
          class="login-input"
          id="password-input"
        />
        <Checkbox v-model="auto_login" class="login-checkbox">自动登录</Checkbox>
        <input type="button" class="login-forget" />
        <Button type="primary" class="login-button" @click="checkAccount">登录</Button>
      </div>
    </div>
    <div class="footer">
      <p>copyright©北京四中网校出品</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: '',
      auto_login: ''
    }
  },
  methods: {
    getScreenHeight: function () {
      const outter = this.$refs.page
      outter.style.height = window.innerHeight + 'px'
    },
    checkAccount: function () {
      const TEACHER = 1
      const STUDENT = 2
      const SUPERUSER = 0
      const that = this
      axios({
        method: 'post',
        url: that.baseUrl + '/words/checkaccount/',
        headers: {
          'X-CSRFTOKEN': this.cookies.getAll().csrftoken
        },
        data: {
          id: that.account,
          password: that.password
        },
        transformRequest: [
          function (data) {
            return qs.stringify(data)
          }
        ]
      }).then(res => {
        const code = res.data.code
        if (code === 200) {
          this.$message.success('登录成功')
          const accountType = res.data.type
          that.cookies.set('type', accountType)
          if (accountType === TEACHER) {
            that.cookies.set('name', res.data.name)
            that.cookies.set('belong', res.data.belong)
            that.$router.push({
              path: '/ClassList',
              name: 'ClassList'
            })
          } else if (accountType === STUDENT) {
            that.cookies.set('id', res.data.id)
            that.cookies.set('info', res.data.info)
            that.$router.push({
              path: '/StudentMain',
              name: 'StudentMain'
            })
          } else if (accountType === SUPERUSER) {
            that.$router.push({
              path: '/NewTeacher',
              name: 'NewTeacher'
            })
          }
        } else {
          this.$message.error('登录失败')
        }
      })
    }
  },
  mounted () {
    const that = this
    that.getScreenHeight()
  }
}
</script>

<style scoped>
.login-header h1 {
  font-size: 30px;
  color: black;
}

.login-header p {
  font-size: 15px;
  margin-bottom: 50px;
}

.login-forget {
  outline: none;
  border: none;
}

.login-content {
  text-align: center;
  width: 300px;
}

#login {
  display: flex;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login-input {
  width: 300px;
  margin-top: 20px;
}

.login-checkbox {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

.login-button {
  width: 300px;
}

.footer {
  position: absolute;
  bottom: 0;
  white-space: nowrap;
}
</style>
