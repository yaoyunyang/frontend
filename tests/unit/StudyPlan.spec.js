import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import StudyPlan from '../../src/components/StudyPlan.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('StudyPlan.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(StudyPlan, { localVue })
    wrapper.setData({ dialogVisible: 'hello' })
    expect(wrapper.vm.dialogVisible).toBe('hello')
  })
})
