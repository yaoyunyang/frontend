import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import NewTeacher from '../../src/views/teacher/NewTeacher.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('NewTeacher.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(NewTeacher, { localVue })
    wrapper.setData({ afterBar: 'hello' })
    expect(wrapper.vm.afterBar).toBe('hello')
  })
})
