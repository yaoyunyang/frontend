import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import WordMatch from '../../src/views/teacher/WordMatch.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('WordMatch.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(WordMatch, { localVue })
    wrapper.setData({ statusValue: 'hello' })
    expect(wrapper.vm.statusValue).toBe('hello')
  })
})
