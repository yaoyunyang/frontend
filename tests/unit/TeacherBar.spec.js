import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import TeacherBar from '../../src/components/TeacherBar.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('TeacherBar.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(TeacherBar, { localVue })
    expect(wrapper.contains('span')).toBe(true)
  })
})
