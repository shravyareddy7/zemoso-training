import { StoryFn } from '@storybook/react';
import ImageCard, { ImageCardProps } from './index';

export default {
  title: 'molecules/ImageCard',
  component: ImageCard,
} as const;

const Template: StoryFn<ImageCardProps> = (args) => <ImageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://via.placeholder.com/300', 
  alt: 'Sample Image',
  caption: 'This is a sample image caption.',
};
