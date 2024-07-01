import { StoryFn, Meta } from '@storybook/react';
import ImageCard, { ImageComponentProps } from './index';

export default {
  title: 'atoms/ImageCard',
  component: ImageCard,
  argTypes: {
    imageUrl: { control: 'text' },
    height: { control: 'number' },
    width: { control: 'number' },
    alt: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ImageComponentProps> = (args) => <ImageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://via.placeholder.com/400x300',
  alt: 'Placeholder image',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  imageUrl: 'https://via.placeholder.com/400x300',
  alt: 'Placeholder image',
  height: 200,
  width: 300,
};
