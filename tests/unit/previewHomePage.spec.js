import { shallowMount } from '@vue/test-utils';
import PreviewHomePage from '@/components/PreviewHomePage.vue';

describe('PreviewHomePage.vue', () => {
  it('renders props.titlePreviewBloc when passed', async () => {
    const wrapper = shallowMount(PreviewHomePage);
    await wrapper.setProps({ titlePreviewBloc: 'The title' });
    expect(wrapper.text()).toMatch('The title');
  });
})
