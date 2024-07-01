import React from 'react';
import { TextField, Box } from '@mui/material';

export interface InputComponentProps {
  children: React.ReactNode;
  type?: 'text' | 'file';
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ children, type = 'text', value, onChange }) => {
  return (
    <Box sx={{ margin: 1 }}>
      <TextField
        type={type}
        placeholder={typeof children === 'string' ? children : undefined}
        value={type === 'text' ? value : undefined}
        onChange={onChange}
        InputProps={type === 'file' ? { inputProps: { accept: 'image/*' } } : undefined}
      />
    </Box>
  );
};

export default InputComponent;
