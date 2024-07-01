import { StoryFn, Meta } from '@storybook/react';
import ButtonComponent, { ButtonComponentProps } from './index';

export default {
  title: 'atoms/ButtonComponent',
  component: ButtonComponent,
} as Meta;

const Template: StoryFn<ButtonComponentProps> = (args: any) => <ButtonComponent {...args} />;

export const TextButton = Template.bind({});
TextButton.args = {
  variant: 'text',
  children: 'Text Button',
};

export const OutlinedButton = Template.bind({});
OutlinedButton.args = {
  variant: 'outlined',
  children: 'Outlined Button',
};

export const ContainedButton = Template.bind({});
ContainedButton.args = {
  variant: 'contained',
  children: 'Contained Button',
};
