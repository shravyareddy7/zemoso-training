
import { StoryFn, Meta } from '@storybook/react';
import InputComponent, { InputComponentProps } from './index';

export default {
  title: 'atoms/InputComponent',
  component: InputComponent,
} as Meta;

const Template: StoryFn<InputComponentProps> = (args) => <InputComponent {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  children: 'Enter',
  type: 'text',
};

export const FileInput = Template.bind({});
FileInput.args = {
  children: 'Upload your file',
  type: 'file',
};
