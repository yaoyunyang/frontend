<template>
  <div>
    <el-container>
      <el-container>
        <teacher-header></teacher-header>
      </el-container>
      <el-header>
        注册课程
        <router-link to="/StudentList">
          <el-button type="primary" icon="el-icon-back" class="back-button">返回</el-button>
        </router-link>
      </el-header>
      <el-main>
        <el-tabs tab-position="left">
          <el-tab-pane label="注册对象">
            <el-select v-model="value" placeholder="请选择班级">
              <el-option
                v-for="item in classes"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
            <el-select v-model="studentsValue" placeholder="请选择学生">
              <el-option
                v-for="item in students"
                :key="item.studentsValue"
                :label="item.studentsLabel"
                :value="item.studentsLabel"
              ></el-option>
            </el-select>
          </el-tab-pane>
          <el-tab-pane label="选择课程">
            <el-select v-model="courseValue" placeholder="请选择课程">
              <el-option
                v-for="item in courses"
                :key="item.courseValue"
                :label="item.courseLabel"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-tab-pane>
          <el-tab-pane label="激活课程">
            <el-form class="form-style">
              <el-form-item>
                <el-input v-model="courseId" placeholder="课程卡号"></el-input>
              </el-form-item>
              <el-form-item class="item-distance">
                <el-input type="password" v-model="coursePwd" placeholder="课程密码"></el-input>
              </el-form-item>
              <el-form-item class="el-form-item-button">
                <el-button @click="checkoutCategory">注 册</el-button>
                <el-button class="button-distance">取 消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册结果">
            <el-table :data="coursesData" stripe height="400px" class="result-table">
              <el-table-column prop="coursesName" label="课程名称" width="180"></el-table-column>
              <el-table-column prop="currentState" label="当前状态" width="240">
                <template slot-scope="stateScope">
                  <span
                    v-if="stateScope.row.currentState === '已过期'"
                    class="out-state-style"
                  >{{stateScope.row.currentState}}</span>
                  <span v-else class="current-state-style">{{stateScope.row.currentState}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <!--警告弹框 -->
    <el-dialog title="警告" :visible.sync="registerSuccessVisible" width="30%">
      <span>注册成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registerSuccessVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--提示弹框 -->
    <el-dialog title="警告" :visible.sync="registerFailureVisible" width="30%">
      <span>{{alertContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registerFailureVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TeacherHeader from '../../components/TeacherHeader.vue'

const axios = require('axios')
export default {
  name: 'ClassRegister',
  components: {
    TeacherHeader
  },
  data () {
    return {
      classes: [],
      value: '',
      students: [],
      studentsValue: '',
      courses: [],
      courseValue: '',
      coursesData: [],
      courseId: '',
      coursePwd: '',
      fuzzySearch: '',
      registerSuccessVisible: false,
      registerFailureVisible: false,
      alertContent: ''
    }
  },
  watch: {
    value: function () {
      this.studentsValue = ''
      this.getAllStudent()
    },
    studentsValue: function () {
      this.getAllRegisterCourse()
    }
  },
  mounted: function () {
    this.getAllClass()
    this.getAllCourse()
  },
  methods: {
    getAllClass () {
      const that = this
      axios.get(that.baseUrl + '/words/showallclass/').then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.classes = res['data']
        }
      })
    },
    getAllStudent () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showallstudent/', {
          params: {
            classId: that.value
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.students = res['data']
          }
        })
    },
    getAllCourse () {
      const that = this
      axios.get(that.baseUrl + '/words/getallcourse/').then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.courses = res['data']
        }
      })
    },
    checkoutCategory () {
      const that = this
      axios
        .get(that.baseUrl + '/words/checkoutcategory/', {
          params: {
            studentId: that.studentsValue,
            categoryId: that.courseValue,
            account: that.courseId,
            password: that.coursePwd
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.registerSuccessVisible = true
            that.getAllRegisterCourse()
          } else if (res['code'] === 400) {
            that.alertContent = '卡号或密码错误'
            that.registerFailureVisible = true
          } else {
            that.alertContent = '该课程已注册'
            that.registerFailureVisible = true
          }
        })
    },
    getAllRegisterCourse () {
      const that = this
      axios
        .get(that.baseUrl + '/words/getallregistercourse/', {
          params: {
            studentId: that.studentsValue
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.coursesData = res['data']
          }
        })
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
  width: 60%;
  margin: 0 auto;
  font-size: 19px;
}

.back-button {
  float: right;
  margin-top: 10px;
  margin-right: -10px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  line-height: 0;
  width: 60%;
  margin: 0 auto;
  min-height: 310px;
}

.el-select {
  display: inline-block;
  position: relative;
  margin-top: 0 !important;
  margin-left: 20px;
}

.form-style {
  width: 300px;
  margin-left: 20px;
}

.el-form-item-button {
  text-align: center;
}

.out-fuzzy-search {
  margin-left: 20px;
  font-size: 14px;
}

.fuzzy-search {
  width: 250px;
  margin-left: 10px;
}

.label-select {
  margin-left: 20px;
}

.result-table {
  width: 450px !important;
  margin-left: 20px;
}

.button-distance {
  margin-left: 80px;
}

.item-distance {
  margin-top: 50px;
}

.out-state-style {
  color: #8486877a;
}

.current-state-style {
  color: green;
}
</style>
