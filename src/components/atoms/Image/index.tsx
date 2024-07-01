import React from 'react';
import { CardMedia } from '@mui/material';

export interface ImageComponentProps {
  imageUrl: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageUrl, height = '200px', width = '200px', alt }) => {
  return (
    <CardMedia
      component="img"
      height={height}
      width={width}
      image={imageUrl}
      alt={alt}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default ImageComponent;
