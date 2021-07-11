import { shallowMount, mount } from '@vue/test-utils'
import Result from '@/views/Result.vue'
import LocationRoute from '@/components/LocationRoute.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import ResultPreview from '@/components/ResultPreview.vue'

describe('Result.vue', () => {
  it('should include a LocationRoute', () => {
    const wrapper = mount(Result)
    const locationRoute = wrapper.findComponent(LocationRoute)
    expect(locationRoute.exists()).toBe(true)
  })
  it('should include a GoogleMap', () => {
    const wrapper = mount(Result)
    const googleMap = wrapper.findComponent(GoogleMap)
    expect(googleMap.exists()).toBe(true)
  })
  it('should include a ResultPreview', () => {
    const wrapper = mount(Result)
    const resultPreview = wrapper.findComponent(ResultPreview)
    expect(resultPreview.exists()).toBe(true)
  })
})
