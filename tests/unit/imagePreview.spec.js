import { shallowMount } from '@vue/test-utils';
import ImagePreview from '@/components/detail/ImagePreview.vue';

describe('ImagePreview.vue', () => {
  it('should have an "img"', async () => {
    const wrapper = shallowMount(ImagePreview)
    await wrapper.setProps({ items: {} })
    expect(wrapper.find(".optPhotos").exists()).toBe(true)
  });
})
