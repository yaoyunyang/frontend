<template>
  <div class="section-css">
    <header class="header-css">
      <span class="span-css">组织方:</span>
      <el-input v-model="organizationName" placeholder="请输入" class="organization-css"></el-input>
    </header>
    <div class="body-css">
      <div class="step-css">
        <el-steps direction="vertical" :active="step" finish-status="success">
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
        </el-steps>
      </div>
      <div class="action-css">
        <el-input v-model="matchName" placeholder="比赛名称" class="input-css"></el-input>
        <span>用于吸引用户参与比赛，示例：pk抢排位赢取千元大奖</span>
        <div class="second-step-css">
          <span class="font-step-css">选择比赛类型</span>
          <div class="match-type-css">
            <div ref="pkMatch" class="pk-match-css select-match-disabled" @click="selectPk">
              <span class="match-title">pk排位</span>
              <span class="match-explain">不限次挑战他人，总积分高者胜利</span>
            </div>
            <div
              ref="alongMatch"
              class="along-match-css select-match-disabled"
              @click="selectAlong"
            >
              <span class="match-title">一战到底</span>
              <span class="match-explain">不限次数和题数，总积分高者胜利</span>
            </div>
            <div ref="wholeMatch" class="select-match-disabled" @click="selectWhole">
              <span class="match-title">整卷考察</span>
              <span class="match-explain">不限次数，超越自己</span>
            </div>
          </div>
        </div>
        <div class="third-step-css">
          <span span class="font-step-css">比赛规则设置</span>
          <div class="form-set-css">
            <el-form ref="form" :model="matchForm" label-width="80px" :disabled="formIsDisabled">
              <el-form-item label="比赛门槛:">
                <el-radio v-model="matchForm.charge" label="free">免费</el-radio>
                <el-radio v-model="matchForm.charge" label="charge">付费</el-radio>
                <el-input
                  v-model="matchForm.coin"
                  v-if="isCharge"
                  placeholder="输入金币数"
                  class="coin-input"
                ></el-input>
                <span v-if="isCharge">金币</span>
              </el-form-item>
              <el-form-item label="参赛范围:">
                <el-select
                  v-model="matchForm.gradeValue"
                  filterable
                  multiple
                  collapse-tags
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in gradeOptions"
                    :key="item.grade"
                    :label="item.label"
                    :value="item.grade"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="比赛内容:">
                <el-radio v-model="matchForm.range" label="all">不限范围</el-radio>
                <el-radio v-model="matchForm.range" label="select">设定教材</el-radio>
                <el-button v-if="selectBook">选择教材</el-button>
              </el-form-item>
              <el-form-item label="比赛难度:">
                <el-radio v-model="matchForm.difficult" label="easy">简单</el-radio>
                <el-radio v-model="matchForm.difficult" label="normal">普通</el-radio>
                <el-radio v-model="matchForm.difficult" label="hard">困难</el-radio>
              </el-form-item>
              <el-form-item label="题型:">
                <el-checkbox-group v-model="matchForm.questionList">
                  <el-checkbox label="中译英"></el-checkbox>
                  <el-checkbox label="英译中"></el-checkbox>
                  <el-checkbox label="听选中"></el-checkbox>
                  <el-checkbox label="听写"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="道具:">
                <el-switch v-model="matchForm.tool" width="70" active-text="允许" inactive-text="不允许"></el-switch>
              </el-form-item>
              <el-form-item label="奖励数量:">
                <el-select v-model="matchForm.studentRange" filterable placeholder="每个年级">
                  <el-option
                    v-for="item in studentRangeOptions"
                    :key="item.student"
                    :label="item.label"
                    :value="item.student"
                  ></el-option>
                </el-select>
                <div class="space-css"></div>
                <el-select
                  class="match-range-css"
                  v-model="matchForm.matchRange"
                  filterable
                  placeholder="前三名"
                >
                  <el-option
                    v-for="item in matchRangeOptions"
                    :key="item.rank"
                    :label="item.label"
                    :value="item.rank"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="奖励金币:">
                <el-input
                  class="input-width"
                  type="input"
                  placeholder="请输入金币数量"
                  v-model="matchForm.textarea"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit-button-css" @click="onSubmit">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

const axios = require('axios')
export default {
  name: 'NewMatch',
  data () {
    return {
      organizationName: '',
      matchType: '',
      matchName: '',
      formIsDisabled: true,
      selectIsDisabled: true,
      step: 0,
      isCharge: false,
      selectBook: false,
      matchForm: {
        charge: '',
        coin: '',
        range: '',
        difficult: '',
        tool: false,
        studentRange: '',
        matchRange: '',
        textarea: '',
        questionList: [],
        gradeValue: []
      },
      gradeOptions: [
        {
          grade: '小学',
          label: '小学'
        },
        {
          grade: '初中',
          label: '初中'
        },
        {
          grade: '高中',
          label: '高中'
        },
        {
          grade: '大学',
          label: '大学'
        }
      ],
      studentRangeOptions: [
        {
          student: '所有参与学生',
          label: '所有参与学生'
        },
        {
          student: '每个年级',
          label: '每个年级'
        },
        {
          student: '每个班级',
          label: '每个班级'
        }
      ],
      matchRangeOptions: [
        {
          rank: '胜利者',
          label: '胜利者'
        },
        {
          rank: '参与者',
          label: '参与者'
        }
      ]
    }
  },
  watch: {
    matchName: function (matchName) {
      if (matchName === '') {
        this.step = 0
        this.setDisabled()
        this.cleanInput()
      } else {
        this.step = 1
        this.setSelect()
      }
    },
    matchType: function (matchTypeval) {
      if (this.step === 1 && matchTypeval !== '') {
        this.step = 2
        this.formIsDisabled = false
      }
    },
    matchForm: {
      handler (matchFormVal) {
        if (this.step === 2) {
          this.step = 3
        }
        if (matchFormVal.charge === 'charge') {
          this.isCharge = true
        } else if (matchFormVal.charge === 'free') {
          this.isCharge = false
        }
        if (matchFormVal.range === 'select') {
          this.selectBook = true
        } else if (matchFormVal.range === 'all') {
          this.selectBook = false
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    setSelect () {
      const pk = this.$refs.pkMatch
      const along = this.$refs.alongMatch
      const whole = this.$refs.wholeMatch
      pk.className = 'select-match-css pk-match-css'
      along.className = 'select-match-css along-match-css'
      whole.className = 'select-match-css'
      this.selectIsDisabled = false
    },
    setDisabled () {
      const pk = this.$refs.pkMatch
      const along = this.$refs.alongMatch
      const whole = this.$refs.wholeMatch
      pk.className = 'select-match-disabled pk-match-css'
      along.className = 'select-match-disabled along-match-css'
      whole.className = 'select-match-disabled'
    },
    selectPk () {
      if (this.selectIsDisabled === false) {
        this.matchType = 'pk排位'
        const pk = this.$refs.pkMatch
        const along = this.$refs.alongMatch
        const whole = this.$refs.wholeMatch
        pk.className = 'on-select-match-css pk-match-css'
        along.className = 'select-match-css along-match-css'
        whole.className = 'select-match-css'
      }
    },
    selectAlong () {
      if (this.selectIsDisabled === false) {
        this.matchType = '一战到底'
        const pk = this.$refs.pkMatch
        const along = this.$refs.alongMatch
        const whole = this.$refs.wholeMatch
        pk.className = 'select-match-css pk-match-css'
        along.className = 'on-select-match-css along-match-css'
        whole.className = 'select-match-css'
      }
    },
    selectWhole () {
      if (this.selectIsDisabled === false) {
        this.matchType = '整卷考察'
        const pk = this.$refs.pkMatch
        const along = this.$refs.alongMatch
        const whole = this.$refs.wholeMatch
        pk.className = 'select-match-css pk-match-css'
        along.className = 'select-match-css along-match-css'
        whole.className = 'on-select-match-css'
      }
    },
    cleanInput () {
      this.matchType = ''
      this.formIsDisabled = true
    },
    onSubmit () {
      const that = this
      let questionList = ''
      for (let i = 0; i < that.matchForm.questionList.length; i++) {
        questionList = questionList + that.matchForm.questionList[i] + ' '
      }
      let gradeValue = ''
      for (let j = 0; j < that.matchForm.gradeValue.length; j++) {
        gradeValue = gradeValue + that.matchForm.gradeValue[j] + ' '
      }
      axios({
        method: 'post',
        url: that.baseUrl + '/words/newmatch/',
        headers: {
          'X-CSRFTOKEN': this.cookies.getAll().csrftoken
        },
        data: {
          teacherId: that.cookies.get('name'),
          organizationName: that.organizationName,
          matchName: that.matchName,
          matchType: that.matchType,
          isCharge: that.matchForm.charge,
          coin: that.matchForm.coin,
          gradeValue: gradeValue,
          range: that.matchForm.range,
          difficult: that.matchForm.difficult,
          questionList: questionList,
          tool: that.matchForm.tool,
          studentRange: that.matchForm.studentRange,
          matchRange: that.matchForm.matchRange,
          textArea: that.matchForm.textarea
        },
        transformRequest: [
          function (data) {
            return qs.stringify(data)
          }
        ]
      }).then(response => {
        let res = response.data
        if (res['code'] === 200) {
          this.$router.push({
            path: '/WordMatch',
            name: 'WordMatch'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.input-width {
  width: 150px;
}

.section-css {
  margin: 0 auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-css {
  margin-top: 50px;
  display: flex;
  margin-bottom: 50px;
}

.span-css {
  margin-right: 5px;
  font-size: 16px;
  margin-top: 6px;
}

.organization-css {
  width: 400px;
  height: 5px;
}

.body-css {
  width: 700px;
  height: 1200px;
  margin-top: 20px;
  margin-left: 270px;
  display: flex;
}

.action-css {
  display: flex;
  flex-direction: column;
}

.step-css {
  width: 43px;
  height: 500px;
}

.input-css {
  width: 400px;
}

.second-step-css {
  margin-top: 185px;
}

.match-type-css {
  margin-top: 70px;
  display: flex;
}

.on-select-match-css {
  width: 200px;
  height: 80px;
  border: 1px solid #409eff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.select-match-css {
  width: 200px;
  height: 80px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.select-match-css:hover {
  color: #409eff;
  border-color: #409eff;
  cursor: pointer;
}

.select-match-disabled {
  width: 200px;
  height: 80px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #e4e4e4;
}

.select-match-disabled:hover {
  cursor: not-allowed;
}

.match-title {
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 3px;
  font-size: 14px;
  color: black;
}

.match-explain {
  font-size: 12px;
  margin-left: 10px;
  color: #909399;
}

.pk-match-css {
  margin-right: 20px;
}

.along-match-css {
  margin-right: 20px;
}

.font-step-css {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.third-step-css {
  margin-top: 203px;
}

.space-css {
  width: 18px;
  display: inline-block;
}

.match-range-css {
  width: 100px;
}

.submit-button-css {
  margin-left: 80px;
  margin-top: 50px;
}

.coin-input {
  width: 110px;
  margin-right: 5px;
}

.el-steps >>> .el-step__line {
  top: 55px !important;
  width: 1.2px !important;
  height: 150px !important;
  background-color: #409eff !important;
}

.el-select >>> .el-input__inner {
  height: 35px;
}

.el-input >>> .el-input__inner {
  height: 34px;
}

.el-switch >>> .el-switch__label--left {
  position: relative;
  left: 75px;
  color: #fff;
  z-index: -1;
}

.el-switch >>> .el-switch__label--right {
  position: relative;
  right: 65px;
  color: #fff;
  z-index: -1;
}

.el-switch >>> .el-switch__label--right.is-active {
  z-index: 1;
  color: #fff !important;
}

.el-switch >>> .el-switch__label--left.is-active {
  z-index: 1;
  color: #9c9c9c !important;
}
</style>
