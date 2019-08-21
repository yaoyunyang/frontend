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

      <el-container>
        <el-header class="header">
          <span class="span-css">
            <a class="action-css" @click="newClassVisible = true">
              <i class="el-icon-circle-plus-outline"></i>新增
            </a>
          </span>
          <span class="span-css">
            <a class="action-css" @click="deleteClassMethod()">
              <i class="el-icon-circle-close"></i>删除
            </a>
          </span>
        </el-header>

        <el-main>
          <el-table
            :data="tableData"
            border
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" align="center" label="班级名称" width="300"></el-table-column>
            <el-table-column prop="status" align="center" label="班级状态" width="150"></el-table-column>
            <el-table-column prop="description" align="center" label="班级说明"></el-table-column>
            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <el-button type="primary" plain @click="handleEdit(scope.$index, scope.row)">添加学员</el-button>
                <el-button type="warning" plain @click="handleDelete(scope.$index, scope.row)">删除学员</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!--新建班级弹框 -->
    <el-dialog title="新建班级" :visible.sync="newClassVisible" width="30%">
      <el-form :model="newClassForm">
        <el-form-item label="班级名称" :label-width="newClassFormLabelWidth">
          <el-input v-model="newClassForm.newClassName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级状态" :label-width="newClassFormLabelWidth">
          <el-select v-model="newClassForm.newClassStatus" placeholder="请选择班级状态">
            <el-option label="正常" value="normal"></el-option>
            <el-option label="未开通" value="abnormal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级说明" :label-width="newClassFormLabelWidth">
          <el-input v-model="newClassForm.newClassMessage" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除班级弹框 -->
    <el-dialog title="提示" :visible.sync="deleteClassVisible" width="30%">
      <span>确认删除</span>
      <span v-for="item in multipleSelection " :key="item.name">{{ item.name }}&nbsp;</span>
      <span>？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteClass">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加学员弹框 -->
    <el-dialog title="添加学员" :visible.sync="addStudentVisible" width="20%">
      <el-form :model="Form">
        <el-form-item label="学员ID" :label-width="addStudentFormLabelWidth">
          <el-input v-model="addStudentForm.addStudentId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStudentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudentMethod">查 找</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="getStudentVisible" width="30%">
      <span>确认将ID为{{addStudentForm.addStudentId}}的学生添加到{{currentClassName}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="getStudentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </span>
    </el-dialog>
    <!--删除学员弹框 -->
    <el-dialog title="删除学员" :visible.sync="removeStudentVisible" width="20%">
      <el-form :model="removeStudentForm">
        <el-form-item label="学员ID" :label-width="removeStudentFormLabelWidth">
          <el-input v-model="removeStudentForm.removeStudentId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="removeStudentVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeStudentMethod">删 除</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="getRemoveVisible" width="30%">
      <span>确认将{{currentClassName}}中ID为{{removeStudentForm.removeStudentId}}的学生删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="getRemoveVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteStudent">确 定</el-button>
      </span>
    </el-dialog>
    <!--警告弹框 -->
    <el-dialog title="警告" :visible.sync="alertVisible" width="30%">
      <span>{{currentClassName}}中没有此学生！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alertVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--警告弹框 -->
    <el-dialog title="警告" :visible.sync="selectVisible" width="30%">
      <span>未选中班级！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TeacherBar from '../../components/TeacherBar.vue'
import TeacherBarSuper from '../../components/TeacherBarSuper.vue'
import TeacherHeader from '../../components/TeacherHeader.vue'

const axios = require('axios')
export default {
  name: 'ClassList',
  components: {
    TeacherBar,
    TeacherHeader,
    TeacherBarSuper
  },
  data () {
    return {
      tableData: [],
      newClassVisible: false,
      deleteClassVisible: false,
      addStudentVisible: false,
      getStudentVisible: false,
      removeStudentVisible: false,
      getRemoveVisible: false,
      alertVisible: false,
      selectVisible: false,
      newClassForm: {
        newClassName: '',
        newClassStatus: '',
        newClassMessage: ''
      },
      addStudentForm: {
        addStudentId: ''
      },
      removeStudentForm: {
        removeStudentId: ''
      },
      newClassFormLabelWidth: '120px',
      addStudentFormLabelWidth: '120px',
      removeStudentFormLabelWidth: '120px',
      currentClassName: '',
      multipleSelection: [],
      teacherId: '',
      beforeBar: '',
      afterBar: ''
    }
  },
  mounted: function () {
    this.showClassDetail()
    this.getParams()
    if (this.cookies.get('type') === '0') {
      this.beforeBar = false
      this.afterBar = true
    } else {
      this.beforeBar = true
      this.afterBar = false
    }
  },
  methods: {
    getParams () {
      let routerParams = this.$route.params.name
      this.teacherId = routerParams
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteClassMethod () {
      if (this.multipleSelection.length === 0) {
        this.selectVisible = true
      } else {
        this.deleteClassVisible = true
      }
    },
    handleEdit (index, row) {
      this.currentClassName = row.name
      this.addStudentVisible = true
      this.addStudentForm.addStudentId = ''
    },
    handleDelete (index, row) {
      this.currentClassName = row.name
      this.removeStudentVisible = true
      this.removeStudentForm.removeStudentId = ''
    },
    addStudentMethod () {
      this.addStudentVisible = false
      this.getStudentVisible = true
    },
    removeStudentMethod () {
      this.removeStudentVisible = false
      this.getRemoveVisible = true
    },
    showClassDetail () {
      const that = this
      axios.get(that.baseUrl + '/words/showclassdetail/').then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.tableData = res['data']
        }
      })
    },
    onsubmit () {
      const that = this
      that.newClassVisible = false
      axios
        .get(that.baseUrl + '/words/addclass/', {
          params: {
            className: that.newClassForm['newClassName'],
            teacherId: that.cookies.get('name')
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.showClassDetail()
          }
        })
    },
    deleteClass () {
      const that = this
      that.deleteClassVisible = false
      let str = ''
      for (let i = 0; i < that.multipleSelection.length; i++) {
        str = str + that.multipleSelection[i].name + ' '
      }
      axios
        .get(that.baseUrl + '/words/deleteclass/', {
          params: {
            classList: str
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.showClassDetail()
          }
        })
    },
    addStudent () {
      const that = this
      that.getStudentVisible = false
      axios
        .get(that.baseUrl + '/words/addstudent/', {
          params: {
            className: that.currentClassName,
            studentId: that.addStudentForm.addStudentId
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.showClassDetail()
          }
        })
    },
    deleteStudent () {
      const that = this
      that.getRemoveVisible = false
      axios
        .get(that.baseUrl + '/words/deletestudent/', {
          params: {
            className: that.currentClassName,
            studentId: that.removeStudentForm.removeStudentId
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.showClassDetail()
          } else {
            that.alertVisible = true
          }
        })
    }
  }
}
</script>

<style scoped>
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

.el-dialog {
  width: 100% !important;
}

.el-form {
  margin-left: -55px !important;
}
</style>
