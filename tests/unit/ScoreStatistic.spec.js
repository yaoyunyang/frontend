import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import ScoreStatistic from '../../src/views/teacher/ScoreStatistic.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('ScoreStatistic.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(ScoreStatistic, { localVue })
    wrapper.setData({ statisticType: 'hello' })
    expect(wrapper.vm.statisticType).toBe('hello')
  })
})
