import { shallowMount } from '@vue/test-utils'
import StudentRankPage from '../../src/views/student/StudentRankPage.vue'

describe('StudentRankPage.vue', () => {
  it('test question', () => {
    const wrapper = shallowMount(StudentRankPage)
    expect(wrapper.contains('div')).toBe(true)
  })
})
