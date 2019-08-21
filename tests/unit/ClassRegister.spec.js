import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import ClassRegister from '../../src/views/teacher/ClassRegister.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('ClassRegister.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(ClassRegister, { localVue })
    wrapper.setData({ studentsValue: 'hello' })
    expect(wrapper.vm.studentsValue).toBe('hello')
  })
})
