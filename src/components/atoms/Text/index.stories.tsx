
import { StoryFn, Meta } from '@storybook/react';
import TextComponent, { TextComponentProps } from './index';

export default {
  title: 'atoms/TextComponent',
  component: TextComponent,
  argTypes: {
    children: { control: 'text' }, 
    variant: {
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'],
      },
    },
  },
} as Meta;

const Template: StoryFn<TextComponentProps> = (args) => <TextComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default TextComponent',
  variant: 'body1',
};

export const CustomVariant = Template.bind({});
CustomVariant.args = {
  children: 'Custom Variant Text',
  variant: 'h3',
};

export const CustomText = Template.bind({});
CustomText.args = {
  children: <strong>This is a custom text component</strong>,
  variant: 'caption',
};
