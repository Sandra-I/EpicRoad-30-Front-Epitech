import { shallowMount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
import AddressInput from '@/components/AddressInput.vue'

describe('AddressInput.vue child emit to parent SearchBar', () => {
  it('should emit', async () => {
    const wrapper = shallowMount(SearchBar)
    await wrapper.findComponent(AddressInput).vm.$emit('autocomplete')
    expect(wrapper.html()).toContain('autocomplete')
  })
})
