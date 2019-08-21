import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import NewMatch from '../../src/views/teacher/NewMatch.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('NewMatch.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(NewMatch, { localVue })
    wrapper.setData({ organizationName: 'hello' })
    expect(wrapper.vm.organizationName).toBe('hello')
  })
  it('test question', () => {
    const wrapper = shallowMount(NewMatch, { localVue })
    wrapper.setData({ matchType: 'hello' })
    expect(wrapper.vm.matchType).toBe('hello')
  })
  it('test question', () => {
    const wrapper = shallowMount(NewMatch, { localVue })
    wrapper.setData({ matchName: 'hello' })
    expect(wrapper.vm.matchName).toBe('hello')
  })
  it('test question', () => {
    const wrapper = shallowMount(NewMatch, { localVue })
    wrapper.setData({ formIsDisabled: 'hello' })
    expect(wrapper.vm.formIsDisabled).toBe('hello')
  })
})
