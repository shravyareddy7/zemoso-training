import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export interface ButtonComponentProps extends ButtonProps {
  variant: 'text' | 'outlined' | 'contained';
  textColor?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ variant, children, textColor, ...props }) => {
  return (
    <Button variant={variant} {...props} sx={{ color: textColor || 'inherit', m: 1, typography: 'body1' }}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
