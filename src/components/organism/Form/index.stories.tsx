import { StoryFn } from '@storybook/react';
import FormComponent from './index';

export default {
  title: 'organism/FormComponent',
  component: FormComponent,
};

const Template: StoryFn = () => <FormComponent />;

export const Default = Template.bind({});
Default.args = {};

