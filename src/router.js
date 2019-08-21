import Vue from 'vue'
import Router from 'vue-router'
import ClassList from './views/teacher/ClassList.vue'
import WordMatch from './views/teacher/WordMatch.vue'
import NewTeacher from './views/teacher/NewTeacher.vue'
import StudentMain from './views/student/StudentMain.vue'
import StudentRankPage from './views/student/StudentRankPage.vue'
import NewMatch from './views/teacher/NewMatch.vue'
import Login from './views/student/Login.vue'
import PkPage from './views/student/PkPage.vue'
import StudentList from './views/teacher/StudentList.vue'
import ScoreStatistic from './views/teacher/ScoreStatistic.vue'
import ClassRegister from './views/teacher/ClassRegister.vue'
import SpellPage from './views/student/SpellPage.vue'
import WordCard from './components/WordCard'
import StudentUnitCircle from './components/StudentUnitCircle'
import StudentCompeteButton from './components/StudentCompeteButton'
import WordMatchIcon from './components/WordMatchIcon'
import StudentHeadPortrait from './components/StudentHeadPortrait'
import MatchPage from './views/student/MatchPage'
import StudyingPage from './components/StudyingPage'
import Review from './views/student/Review.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Review',
      name: 'Review',
      component: Review
    },
    {
      path: '/StudyingPage',
      name: 'StudyingPage',
      component: StudyingPage
    },
    {
      path: '/MatchPage',
      name: 'MatchPage',
      component: MatchPage
    },
    {
      path: '/StudentHeadPortrait',
      name: 'StudentHeadPortrait',
      component: StudentHeadPortrait
    },
    {
      path: '/WordMatchIcon',
      name: 'WordMatchIcon',
      component: WordMatchIcon
    },
    {
      path: '/StudentCompeteButton',
      name: 'StudentCompeteButton',
      component: StudentCompeteButton
    },
    {
      path: '/StudentUnitCircle',
      name: 'StudentUnitCircle',
      component: StudentUnitCircle
    },
    {
      path: '/WordCard',
      name: 'WordCard',
      component: WordCard
    },
    {
      path: '/SpellPage',
      name: 'SpellPage',
      component: SpellPage
    },
    {
      path: '/PkPage',
      name: 'PkPage',
      component: PkPage
    },
    {
      path: '/NewTeacher',
      name: 'NewTeacher',
      component: NewTeacher
    },
    {
      path: '/StudentRankPage',
      name: 'StudentRankPage',
      component: StudentRankPage
    },
    {
      path: '/StudentMain',
      name: 'StudentMain',
      component: StudentMain
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/ClassList',
      name: 'ClassList',
      component: ClassList
    },
    {
      path: '/WordMatch',
      name: 'WordMatch',
      component: WordMatch
    },
    {
      path: '/NewMatch',
      name: 'NewMatch',
      component: NewMatch
    },
    {
      path: '/StudentList',
      name: 'StudentList',
      component: StudentList
    },
    {
      path: '/ClassRegister',
      name: 'ClassRegister',
      component: ClassRegister
    },
    {
      path: '/ScoreStatistic',
      name: 'ScoreStatistic',
      component: ScoreStatistic
    }
  ]
})
