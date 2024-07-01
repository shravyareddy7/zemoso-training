import { Meta, StoryFn } from '@storybook/react';
import Gallery from './index';

const meta: Meta<typeof Gallery> = {
  title: 'organism/Gallery',
  component: Gallery,
};

export default meta;

const Template: StoryFn<typeof Gallery> = (args) => <Gallery {...args} />;


export const WithImages = Template.bind({});
WithImages.decorators = [
  (Story) => {
    const images = [
      { src: 'https://via.placeholder.com/150', caption: 'Image 1' },
      { src: 'https://via.placeholder.com/150', caption: 'Image 2' },
      { src: 'https://via.placeholder.com/150', caption: 'Image 3' },
    ];

    // Mocking localStorage
    localStorage.setItem('uploadedImages', JSON.stringify(images));

    return <Story />;
  },
];
