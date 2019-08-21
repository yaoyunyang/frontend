<template>
  <div>
    <el-container>
      <teacher-header></teacher-header>
    </el-container>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <teacher-bar v-show="beforeBar"></teacher-bar>
        <teacher-bar-super v-show="afterBar"></teacher-bar-super>
      </el-aside>
      <div class="outer-protect">
        <Collapse class="outer-collapse">
          <Panel name="class-choose" collapsed="false">
            请选择班级
            <div slot="content" class="panel-diatance">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
              <el-button type="info" plain class="select-distance-button" @click="changeClass">确认</el-button>
            </div>
          </Panel>
          <Panel name="student-choose">
            学生名册
            <p slot="content">
              <el-container>
                <el-header class="header">
                  <span class="span-css">
                    <router-link to="/ClassRegister">
                      <a class="action-css">
                        <i class="el-icon-s-management"></i>注册课程
                      </a>
                    </router-link>
                  </span>
                  <span class="span-css">
                    <a class="action-css" @click="isSelectRecordStudent()">
                      <i class="el-icon-s-order"></i>测试记录
                    </a>
                  </span>
                  <span class="span-css">
                    <a class="action-css" @click="searchStudentVisible = true">
                      <i class="el-icon-search"></i>查找学员
                    </a>
                  </span>
                  <span class="span-css">
                    <a class="action-css" @click="addStudentVisible = true">
                      <i class="el-icon-circle-plus-outline"></i>添加学员
                    </a>
                  </span>
                  <span class="span-css">
                    <a class="action-css" @click="isSelectDeleteStudent()">
                      <i class="el-icon-remove-outline"></i>删除学员
                    </a>
                  </span>
                </el-header>
                <el-main>
                  <el-table
                    :data="studentData"
                    border
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column type="index" align="center" label="序号"></el-table-column>
                    <el-table-column prop="name" align="center" label="姓名" width="80px"></el-table-column>
                    <el-table-column prop="email" align="center" label="邮箱" width="170px"></el-table-column>
                    <el-table-column prop="numberOfStudy" align="center" label="学习次数"></el-table-column>
                    <el-table-column prop="numberOfCoin" align="center" label="金币数量"></el-table-column>
                    <el-table-column prop="dateLastLogin" align="center" label="上次登录" width="90px"></el-table-column>
                    <el-table-column prop="studentId" align="center" label="ID"></el-table-column>
                    <el-table-column prop="classId" align="center" label="班级"></el-table-column>
                    <el-table-column prop="dateOfRegister" align="center" label="注册日期" width="90px"></el-table-column>
                    <el-table-column prop="status" align="center" label="状态"></el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </p>
          </Panel>
        </Collapse>
        <!--删除学生弹框 -->
        <el-dialog title="提示" :visible.sync="deleteStudentVisible" width="30%">
          <span>确认删除</span>
          <span v-for="item in multipleSelection " :key="item.name">{{ item.name }}&nbsp;</span>
          <span>？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteStudentVisible = false">取 消</el-button>
            <el-button type="primary" @click="removeStudent">确 定</el-button>
          </span>
        </el-dialog>
        <!--删除或查看测试记录时未选中学生警告-->
        <el-dialog title="警告" :visible.sync="selectStudentWarningVisible" width="30%">
          <span>你未选中任何学生</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="selectStudentWarningVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 添加学员弹框 -->
        <el-dialog title="添加学员" :visible.sync="addStudentVisible" width="23%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学生姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="学生ID">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="学生邮箱"
              :rules="[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
            >
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="所属班级">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="newStudent">立即创建</el-button>
              <el-button @click="addStudentVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 添加时存在空值警告 -->
        <el-dialog title="警告" :visible.sync="newStudentWarningVisible" width="30%">
          <span>学生信息不完整</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newStudentWarningVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 添加时已存在警告 -->
        <el-dialog title="警告" :visible.sync="hasStudentWarningVisible" width="30%">
          <span>该学生已存在</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="hasStudentWarningVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 查找学员弹框 -->
        <el-dialog title="查找学员" :visible.sync="searchStudentVisible" width="20%">
          <el-form label-width="80px">
            <el-form-item label="学员ID">
              <el-input v-model="searchStudentId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchStudent">查 找</el-button>
              <el-button @click="searchStudentVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 查找时不存在警告 -->
        <el-dialog title="警告" :visible.sync="searchStudentWarningVisible" width="30%">
          <span>该学生ID不存在</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="searchStudentWarningVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 测试记录弹框 -->
        <el-dialog title="测试记录" :visible.sync="testRecordVisible" width="50%">
          <el-table :data="recordData" :cell-style="cellStyle" border width="100%">
            <el-table-column prop="number" label="序号"></el-table-column>
            <el-table-column prop="category" label="课本" width="180"></el-table-column>
            <el-table-column prop="type" label="测试类型"></el-table-column>
            <el-table-column prop="score" label="分数">
              <template slot-scope="scoreScope">
                <span
                  v-if="scoreScope.row.score !== 100"
                  class="unfull-score-style"
                >{{scoreScope.row.score}}</span>
                <span v-else class="full-score-style">{{scoreScope.row.score}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isPass" label="通过">
              <template slot-scope="passScope">
                <span
                  v-if="passScope.row.isPass === '否'"
                  class="not-pass-style"
                >{{passScope.row.isPass}}</span>
                <span v-else class="pass-style">{{passScope.row.isPass}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>

<script>
import TeacherBar from '../../components/TeacherBar.vue'
import TeacherBarSuper from '../../components/TeacherBarSuper.vue'
import TeacherHeader from '../../components/TeacherHeader.vue'

const axios = require('axios')
export default {
  components: {
    TeacherBar,
    TeacherHeader,
    TeacherBarSuper
  },
  data () {
    return {
      form: {
        name: '',
        id: '',
        email: '',
        class: ''
      },
      options: [],
      value: '',
      studentData: [],
      recordData: [],
      newClassForm: {
        newClassName: '',
        newClassStatus: '',
        newClassMessage: ''
      },
      newClassFormLabelWidth: '120px',
      searchStudentId: '',
      deleteStudentVisible: false,
      selectStudentWarningVisible: false,
      addStudentVisible: false,
      searchStudentVisible: false,
      searchStudentWarningVisible: false,
      testRecordVisible: false,
      newStudentWarningVisible: false,
      hasStudentWarningVisible: false,
      multipleSelection: [],
      beforeBar: '',
      afterBar: ''
    }
  },
  mounted: function () {
    this.getAllClass()
    if (this.cookies.get('type') === '0') {
      this.beforeBar = false
      this.afterBar = true
    } else {
      this.beforeBar = true
      this.afterBar = false
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    isSelectDeleteStudent () {
      if (this.multipleSelection.length === 0) {
        this.selectStudentWarningVisible = true
      } else {
        this.deleteStudentVisible = true
      }
    },
    isSelectRecordStudent () {
      if (this.multipleSelection.length === 0) {
        this.selectStudentWarningVisible = true
      } else {
        this.testRecordVisible = true
        this.showRecord()
      }
    },
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 4) {
        return 'color:red'
      } else {
        return ''
      }
    },
    getAllClass () {
      const that = this
      axios.get(that.baseUrl + '/words/showallclass/').then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.options = res['data']
        }
      })
    },
    changeClass () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showclassstudent/', {
          params: {
            classId: that.value
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.studentData = res['data']
          }
        })
    },
    newStudent () {
      if (
        this.form.id === '' ||
        this.form.email === '' ||
        this.form.name === ''
      ) {
        this.newStudentWarningVisible = true
      } else {
        const that = this
        axios
          .get(that.baseUrl + '/words/newstudent/', {
            params: {
              studentId: that.form.id,
              studentMail: that.form.email,
              studentName: that.form.name,
              studentClass: that.value
            }
          })
          .then(response => {
            let res = response.data
            if (res['code'] === 200) {
              that.addStudentVisible = false
              that.changeClass()
            } else if (res['code'] === 400) {
              that.hasStudentWarningVisible = true
            }
          })
      }
    },
    removeStudent () {
      const that = this
      that.deleteStudentVisible = false
      let str = ''
      for (let i = 0; i < that.multipleSelection.length; i++) {
        str = str + that.multipleSelection[i].studentId + ' '
      }
      axios
        .get(that.baseUrl + '/words/removestudent/', {
          params: {
            studentList: str
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.changeClass()
          }
        })
    },
    showRecord () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showrecord/', {
          params: {
            studentId: that.multipleSelection[0].studentId
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.recordData = res['data']
          }
        })
    },
    searchStudent () {
      const that = this
      that.searchStudentVisible = false
      axios
        .get(that.baseUrl + '/words/searchstudent/', {
          params: {
            studentId: that.searchStudentId,
            classId: that.value
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.studentData = res['data']
          } else {
            that.searchStudentWarningVisible = true
          }
        })
    }
  }
}
</script>

<style scoped>
.outer-protect {
  text-align: left;
  width: 100%;
}

.outer-collapse {
  width: 100%;
}

.panel-diatance {
  padding-bottom: 0;
}

.select-distance-button {
  margin-left: 10px;
}

.el-main {
  padding: 0 !important;
}

.el-table {
  font-size: 13px !important;
}

.header {
  text-align: left;
  font-size: 16px medium;
}

.aside {
  background-color: rgb(238, 241, 246);
}

.container {
  height: 800px;
  border: 1px solid rgb(238, 238, 238);
}

.span-css {
  margin: 10px;
  font-size: 17px;
}

.action-css {
  cursor: pointer;
  color: black;
}

a.action-css:hover {
  color: #409eff;
  font-weight: bold;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-select {
  float: left !important;
}

.full-score-style {
  color: red;
}

.unfull-score-style {
  color: #606266;
}

.pass-style {
  color: red;
}

.not-pass-style {
  color: green;
}
</style>
