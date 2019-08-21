import { shallowMount } from '@vue/test-utils'
import RestPage from '../../src/views/student/RestPage.vue'

describe('MatchPge.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(RestPage)
    expect(wrapper.contains('div')).toBe(true)
  })
})
