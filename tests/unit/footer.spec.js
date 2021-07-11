import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('should display Favorite item', async () => {
    const wrapper = shallowMount(Footer)
    await wrapper.setProps({ isLoggedIn: true })
    expect(wrapper.text()).toContain('Profile')
  });
})
