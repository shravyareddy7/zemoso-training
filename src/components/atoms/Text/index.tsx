import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

export interface TextComponentProps {
  children: React.ReactNode; 
  variant?: TypographyProps['variant']; 
}

const TextComponent: React.FC<TextComponentProps> = ({ children, variant }) => {
  return (
    <Typography variant={variant} sx={{margin:1}}>
      {children}
    </Typography>
  );
};

export default TextComponent;
