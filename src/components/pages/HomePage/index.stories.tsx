import { Meta, StoryFn } from '@storybook/react';
import Homepage from '.';
import {  ThemeProvider } from '@mui/material';
import theme from '../../../theme';

const meta: Meta<typeof Homepage> = {
  title: 'Pages/Homepage',
  component: Homepage,
};

export default meta;

const Template: StoryFn<typeof Homepage> = (args) => <Homepage {...args} />;

export const DashboardView = Template.bind({});
DashboardView.decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];


export const GalleryView = Template.bind({});
GalleryView.decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

DashboardView.args = {
  currentTab: 'dashboard',
};

GalleryView.args = {
  currentTab: 'gallery',
};
