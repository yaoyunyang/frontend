<template>
  <div>
    <div class="brief-intro" v-if="isBrief">
      <p class="comp-joined">我的比赛</p>
      <div class="comp-brief-intro">
        <div v-for="(item, index) in joinedCompIntro" v-bind:key="index" class="comp-card">
          <WordMatchIcon :compData="item" @ChangeVisible="ChangeVisible"></WordMatchIcon>
        </div>
      </div>
    </div>
    <div v-else class="comp-all">
      <student-comp-intro :thisMatch="thisMatchItem" @backList="backList"></student-comp-intro>
      <student-match-rank
        imgSrc="/student-study-time-rank.png"
        rankTitle="比赛排行"
        :rankDescription="thisMatchId"
        hasBorder="2px solid #44B4F8"
      ></student-match-rank>
    </div>
  </div>
</template>

<script>
import WordMatchIcon from './WordMatchIcon'
import StudentCompIntro from './StudentCompIntro'
import StudentMatchRank from './StudentMatchRank'

const axios = require('axios')
export default {
  components: {
    WordMatchIcon,
    StudentCompIntro,
    StudentMatchRank
  },
  name: '',
  data () {
    return {
      isBrief: true,
      joinedCompIntro: [],
      thisMatchId: '',
      thisMatchItem: {}
    }
  },
  mounted () {
    const that = this
    axios
      .get(that.baseUrl + '/words/getallmatch/', {
        params: {
          student_id: that.cookies.get('id')
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.joinedCompIntro = res['data']
        }
      })
  },
  methods: {
    ChangeVisible (matchId) {
      this.isBrief = false
      this.thisMatchId = matchId
      for (let index = 0; index < this.joinedCompIntro.length; index++) {
        if (this.joinedCompIntro[index]['matchName'] === matchId) {
          this.thisMatchItem = this.joinedCompIntro[index]
          break
        }
      }
    },
    backList () {
      this.isBrief = true
    }
  }
}
</script>

<style scoped>
.brief-intro {
  width: 600px;
}

.comp-joined {
  position: relative;
  margin-left: 17px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
}

.comp-all {
  display: flex;
  padding-left: 30px;
  margin-top: 0;
  font-size: 14px;
  font-weight: 600;
}

.comp-brief-intro {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.comp-card {
  width: 180px;
  height: 243px;
  margin: 5px;
}
</style>
