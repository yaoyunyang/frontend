import { shallowMount } from '@vue/test-utils'
import Login from '../../src/views/student/Login.vue'

describe('Login.vue', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.contains('div')).toBe(true)
  })
})
