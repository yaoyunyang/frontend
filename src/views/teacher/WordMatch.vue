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
      <div class="outter">
        <el-header class="header"></el-header>
        <div class="set-location">
          <header class="form-css">
            <div class="form-up">
              <span class="all-span">
                关键词
                <i class="el-icon-warning-outline"></i>&nbsp;:&nbsp;
              </span>
              <el-input class="input-mini-css" v-model="keyWord" placeholder="请输入内容"></el-input>
              <span class="span-css all-span">状态&nbsp;:&nbsp;</span>
              <el-select v-model="statusValue" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="span-css all-span">组织方&nbsp;:&nbsp;</span>
              <el-input v-model="organizationValue" placeholder="请输入内容" class="input-css"></el-input>
            </div>
            <div class="form-down">
              <span class="all-span">分类&nbsp;:&nbsp;</span>
              <el-select class="select-css" v-model="sortValue" placeholder="请选择">
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="span-css all-span">年级&nbsp;:&nbsp;</span>
              <el-input v-model="gradeValue" placeholder="请输入" class="input-css"></el-input>
              <el-button class="button-css left-button" type="primary" @click="searchMatch">搜 索</el-button>
              <el-button class="button-css" type="primary" @click="newMatch">新建比赛</el-button>
            </div>
          </header>
          <div class="information-css">
            <el-table :data="tableData" :header-cell-style="getRowClass">
              <el-table-column
                prop="sort"
                align="center"
                label="分类"
                width="180"
                :filters="[{text: 'pk排位', value: 'pk排位'}, {text: '一战到底', value: '一战到底'}, {text: '整卷考察', value: '整卷考察'}]"
                :filter-method="filterHandler"
              ></el-table-column>
              <el-table-column prop="name" align="center" label="名称" width="180"></el-table-column>
              <el-table-column prop="organization" align="center" label="组织方"></el-table-column>
              <el-table-column prop="status" align="center" label="状态"></el-table-column>
              <el-table-column prop="grade" align="center" label="年级"></el-table-column>
              <el-table-column prop="number" align="center" label="参与数" sortable></el-table-column>
              <el-table-column prop="action" align="center" label="操作">
                <template slot-scope="scope">
                  <span class="mini-span-css">
                    <a @click="showRank(scope.$index, scope.row)">排名</a>
                  </span>
                  <span class="mini-span-css">
                    <a @click="handSelectChange(scope.$index, scope.row)">编辑</a>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-button type="primary" icon="el-icon-back" class="back-button">
            <router-link to="/StudentList">
              <span class="back-button-inner">返回</span>
            </router-link>
          </el-button>
          <!-- 查看排名弹框 -->
          <el-dialog title="查看排名" :visible.sync="rankTestVisible" width="50%">
            <el-table :data="recordData" border width="100%" height="500px">
              <el-table-column type="index" label="排名" width="100px"></el-table-column>
              <el-table-column prop="student" label="学生"></el-table-column>
              <el-table-column prop="score" label="成绩"></el-table-column>
            </el-table>
          </el-dialog>
          <!-- 编辑操作弹框 -->
          <el-dialog title="编辑操作" :visible.sync="editTestVisible" width="50%">
            <el-select v-model="editstatusValue" placeholder="请选择班级状态">
              <el-option
                v-for="item in editstatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="editMatch">确 定</el-button>
            </span>
          </el-dialog>
        </div>
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
  name: 'WordMatch',
  components: {
    TeacherBar,
    TeacherHeader,
    TeacherBarSuper
  },
  props: {},
  data () {
    return {
      keyWord: '',
      statusValue: '',
      statusOptions: [
        {
          value: '未开始',
          label: '未开始'
        },
        {
          value: '进行中',
          label: '进行中'
        },
        {
          value: '已截止',
          label: '已截止'
        },
        {
          value: '已结束',
          label: '已结束'
        },
        {
          value: '',
          label: '所有状态'
        }
      ],
      editstatusValue: '',
      editstatusOptions: [
        {
          value: '未开始',
          label: '未开始'
        },
        {
          value: '进行中',
          label: '进行中'
        },
        {
          value: '已截止',
          label: '已截止'
        },
        {
          value: '已结束',
          label: '已结束'
        }
      ],
      organizationValue: '',
      sortValue: '',
      sortOptions: [
        {
          value: 'pk排位',
          label: 'pk排位'
        },
        {
          value: '一战到底',
          label: '一战到底'
        },
        {
          value: '整卷考察',
          label: '整卷考察'
        },
        {
          value: '',
          label: '所有比赛'
        }
      ],
      currentName: '',
      gradeValue: '',
      recordData: [],
      rankTestVisible: false,
      editTestVisible: false,
      tableData: [],
      rowCss:
        'background: #fafafa; color: black; height: 53px; border: 1px solid #eae1e1; border-left: none; border-right:none',
      beforeBar: '',
      afterBar: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    newMatch () {
      this.$router.push({
        path: '/NewMatch',
        name: 'NewMatch'
      })
    },
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return this.rowCss
      } else {
        return ''
      }
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    showMatchDetail () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showmatchdetail/', {
          params: {
            teacher_id: that.cookies.get('name')
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.tableData = res['data']
          }
        })
    },
    searchMatch () {
      const that = this
      axios
        .get(that.baseUrl + '/words/searchmatch/', {
          params: {
            name: that.keyWord,
            status: that.statusValue,
            organization: that.organizationValue,
            type: that.sortValue,
            grade: that.gradeValue
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.tableData = res['data']
          }
        })
    },
    handSelectChange (index, row) {
      this.editTestVisible = true
      this.currentName = row.name
    },
    showRank (index, row) {
      const that = this
      that.rankTestVisible = true
      axios
        .get(that.baseUrl + '/words/showrank/', {
          params: {
            matchName: row.name
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.recordData = res['data']
          }
        })
    },
    editMatch () {
      const that = this
      that.editTestVisible = false
      axios
        .get(that.baseUrl + '/words/editmatch/', {
          params: {
            editValue: that.editstatusValue,
            matchName: that.currentName
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.showMatchDetail()
            that.editstatusValue = ''
          }
        })
    }
  },
  mounted () {
    this.showMatchDetail()
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
.outter {
  width: 100%;
}

.aside {
  background-color: rgb(238, 241, 246);
}

.header {
  text-align: left;
  font-size: 16px medium;
  background-color: #b3c0d1;
}

.container {
  height: 800px;
  border: 1px solid rgb(238, 238, 238);
}

.set-location {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 20px;
  margin-left: 30px;
  width: 100%;
}

.el-select {
  width: 250px;
}

.all-span {
  font-size: 14px;
  text-align: end;
  color: black;
  line-height: 38px;
}

.form-css {
  display: flex;
  flex-direction: column;
  width: 1072px;
  height: 140px;
  justify-content: center;
}

.span-css {
  width: 150px;
}

.form-up {
  display: flex;
  flex-direction: row;
  height: 60px;
}

.mini-span-css {
  margin: 10px;
}

.form-down {
  display: flex;
  flex-direction: row;
}

.input-mini-css {
  display: inline-block;
  width: 200px;
}

.input-css {
  display: inline-block;
  width: 250px;
}

.select-css {
  width: 232px;
}

.left-button {
  margin: 0 40px 0 150px;
}

.information-css {
  display: flex;
  width: 1072px;
}

.button-css {
  width: 100px;
}

.back-button {
  margin-left: 970px;
  margin-top: 50px;
  width: 100px;
}

.back-button-inner {
  color: white;
}
</style>
