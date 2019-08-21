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
        <el-header class="header"></el-header>
        <p slot="content" class="student-choose-content">
          <el-form>
            <el-form-item>
              <el-select v-model="value" placeholder="请选择班级">
                <el-option
                  v-for="item in classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
              <el-button plain class="button-distance" @click="statisticType = 'train'">训练量</el-button>
              <el-button plain @click="statisticType = 'word'">词汇量</el-button>
              <el-button plain @click="statisticType = 'time'">学习时间</el-button>
              <el-button plain @click="statisticType = 'train_word'">训练&词汇</el-button>
            </el-form-item>
          </el-form>
          <ve-histogram :data="chartData" width="1000px" height="500px"></ve-histogram>
        </p>
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
      classOptions: [],
      value: '',
      statisticType: '',
      chartData: {
        columns: [],
        rows: []
      },
      beforeBar: '',
      afterBar: ''
    }
  },
  watch: {
    statisticType: function () {
      this.showStatistic()
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
    getAllClass () {
      const that = this
      axios.get(that.baseUrl + '/words/showallclass/').then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.classOptions = res['data']
        }
      })
    },
    showStatistic () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showstatistic', {
          params: {
            classId: that.value,
            statisticType: that.statisticType
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.chartData['columns'] = res['data']['columns']
            that.chartData['rows'] = res['data']['rows']
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
  background-color: #b3c0d1;
}

.aside {
  background-color: rgb(238, 241, 246);
}

.container {
  height: 800px;
  border: 1px solid rgb(238, 238, 238);
}

.student-choose-content {
  min-height: 400px;
  margin: 20px;
}

.button-distance {
  margin-left: 20px;
}
</style>
