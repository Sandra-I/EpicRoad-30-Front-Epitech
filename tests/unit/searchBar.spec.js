import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBloc.vue', () => {
  it('should include a SearchBar', async () => {
    const wrapper = shallowMount(SearchBar)
    await wrapper.setProps({ errors: "Location is required." });
    expect(wrapper.find(".errors").exists()).toBe(true);
  });
})
