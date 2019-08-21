import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import StudentList from '../../src/views/teacher/StudentList.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('StudentList.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(StudentList, { localVue })
    wrapper.setData({ searchStudentId: 'hello' })
    expect(wrapper.vm.searchStudentId).toBe('hello')
  })
})
