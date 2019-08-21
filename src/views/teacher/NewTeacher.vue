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
            <a class="action-css" @click="newTeacherVisible = true">
              <i class="el-icon-circle-plus-outline"></i>新增账号
            </a>
          </span>
          <span class="span-css">
            <a class="action-css" @click="deleteTeacher()">
              <i class="el-icon-circle-close"></i>删除账号
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
            <el-table-column type="index" align="center" label="序号" width="150"></el-table-column>
            <el-table-column prop="id" align="center" label="账号" width="300"></el-table-column>
            <el-table-column prop="organization" align="center" label="所属机构"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!--注册教师账号弹框 -->
    <el-dialog title="注册教师账号" :visible.sync="newTeacherVisible" width="30%">
      <el-form :model="newTeacherForm">
        <el-form-item label="账号" :label-width="newTeacherFormLabelWidth">
          <el-input v-model="newTeacherForm.newTeacherId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" :label-width="newTeacherFormLabelWidth">
          <el-input v-model="newTeacherForm.newTeacherOrganization" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newTeacherVisible = false">取 消</el-button>
        <el-button type="primary" @click="newTeacher">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除教师弹框 -->
    <el-dialog title="提示" :visible.sync="deleteTeacherVisible" width="30%">
      <span>确认删除</span>
      <span v-for="item in multipleSelection " :key="item.id">{{ item.id }}&nbsp;</span>
      <span>？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteTeacherVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeTeacher">确 定</el-button>
      </span>
    </el-dialog>
    <!--警告弹框 -->
    <el-dialog title="警告" :visible.sync="selectVisible" width="30%">
      <span>未选中任何教师账号！</span>
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
  name: 'NewTeacher',
  components: {
    TeacherBar,
    TeacherHeader,
    TeacherBarSuper
  },
  data () {
    return {
      tableData: [],
      newTeacherVisible: false,
      deleteTeacherVisible: false,
      selectVisible: false,
      newTeacherForm: {
        newTeacherId: '',
        newTeacherOrganization: ''
      },
      newTeacherFormLabelWidth: '120px',
      multipleSelection: [],
      beforeBar: '',
      afterBar: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteTeacher () {
      if (this.multipleSelection.length === '0') {
        this.selectVisible = true
      } else {
        this.deleteTeacherVisible = true
      }
    },
    getAllTeacher () {
      const that = this
      axios.get(that.baseUrl + '/words/getallteacher/').then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.tableData = res['data']
        }
      })
    },
    newTeacher () {
      const that = this
      that.newTeacherVisible = false
      axios
        .get(that.baseUrl + '/words/newteacher/', {
          params: {
            teacherId: that.newTeacherForm.newTeacherId,
            belong: that.newTeacherForm.newTeacherOrganization
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.getAllTeacher()
          }
        })
    },
    removeTeacher () {
      const that = this
      that.deleteTeacherVisible = false
      let str = ''
      for (let i = 0; i < that.multipleSelection.length; i++) {
        str = str + that.multipleSelection[i].id + ' '
      }
      axios
        .get(that.baseUrl + '/words/removeteacher/', {
          params: {
            teacherList: str
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.getAllTeacher()
          }
        })
    }
  },
  mounted: function () {
    this.getAllTeacher()
    if (this.cookies.get('type') === '0') {
      this.beforeBar = false
      this.afterBar = true
    } else {
      this.beforeBar = true
      this.afterBar = false
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
