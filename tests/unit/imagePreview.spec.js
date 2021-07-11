import { shallowMount  } from '@vue/test-utils';
// import { render } from '@vue/server-test-utils';
import ImagePreview from '@/components/detail/ImagePreview.vue';

describe('ImagePreview.vue', () => {
  it('should include an img', () => {
    const wrapper = shallowMount(ImagePreview);
    expect(wrapper.classes()).toContain('img')
    // expect(wrapper.contains('img')).toBe(true)
    // const wrapper = await render(ImagePreview)
    // expect(wrapper.text()).toContain('<img/>');
    expect(wrapper.classes('img')).toBe(true)
    // expect(wrapper.text()).toContain('<v-row></v-row>')
  });
})
