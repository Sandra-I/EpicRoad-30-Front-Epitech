import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('should add the id "app"', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.attributes().id).toBe('app')
  });
})
