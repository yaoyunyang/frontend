import { shallowMount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import Review from '../../src/views/student/Review.vue'
import data from '../../src/components/GlobalData.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.prototype.cookies = data.cookies

describe('Review.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(Review, { localVue })
    wrapper.setData({ curWord: 'hello' })
    expect(wrapper.vm.curWord).toBe('hello')
  })
})
