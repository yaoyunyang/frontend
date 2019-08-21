<template>
  <div class="test-score">
    <el-table :data="recordData" border width="600px">
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
          <span v-if="passScope.row.isPass === '否'" class="not-pass-style">{{passScope.row.isPass}}</span>
          <span v-else class="pass-style">{{passScope.row.isPass}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      recordData: []
    }
  },
  mounted: function () {
    this.showRecord()
  },
  methods: {
    showRecord () {
      const that = this
      axios
        .get(that.baseUrl + '/words/showrecord/', {
          params: {
            studentId: that.cookies.get('id')
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.recordData = res['data']
          }
        })
    }
  }
}
</script>

<style>
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

.test-score {
  margin-bottom: 20px;
}
</style>
