import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import FileAndTextInput, { FileAndTextInputProps } from './index';

export default {
  title: 'molecules/FileAndTextInput',
  component: FileAndTextInput,
} as const;

const Template: StoryFn<FileAndTextInputProps> = (args) => {
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [textValue, setTextValue] = useState<string>('');

  const handleFileChange = (file: File | null) => {
    setFileValue(file);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <Box p={3}>
      <FileAndTextInput
        {...args}
        inputFile={fileValue}
        onFileChange={handleFileChange}
        inputText={textValue}
        onTextChange={handleTextChange}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {};
