import { shallowMount } from '@vue/test-utils'
import SearchBloc from '@/components/SearchBloc.vue'
import SearchBar from '@/components/SearchBar.vue'
import AddressInput from '@/components/AddressInput.vue'

describe('SearchBloc.vue', () => {
  it('should include a SearchBar', () => {
    const wrapper = shallowMount(SearchBloc)
    const searchBar = wrapper.findComponent(SearchBar)
    expect(searchBar.exists()).toBe(true)
  });
  it('should include an AddressInput', () => {
    const wrapper = shallowMount(SearchBloc)
    const addressInput = wrapper.findComponent(AddressInput)
    expect(addressInput.exists()).toBe(true)
  });
})
