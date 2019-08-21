import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import TomatoTimer from '../../src/components/TomatoTimer.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('TomatoTimer.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(TomatoTimer, { localVue })
    wrapper.setData({ isStart: 'hello' })
    expect(wrapper.vm.isStart).toBe('hello')
  })
})
