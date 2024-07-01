import React from 'react';
import { Box } from '@mui/material';
import InputComponent from '../../atoms/Input'; 

export interface FileAndTextInputProps {
  inputFile: File | null;
  onFileChange: (file: File | null) => void;
  inputText: string;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileAndTextInput: React.FC<FileAndTextInputProps> = ({
  inputFile,
  onFileChange,
  inputText,
  onTextChange,
}) => {
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onFileChange(file);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <InputComponent
        type="file"
        onChange={handleFileInputChange}
      >
        Upload File
      </InputComponent>
      <InputComponent
        type="text"
        value={inputText}
        onChange={onTextChange}
      >
        Enter caption
      </InputComponent>
    </Box>
  );
};

export default FileAndTextInput;
