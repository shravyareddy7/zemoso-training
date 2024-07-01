import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ImageComponent from '../../atoms/Image'; 

export interface ImageCardProps {
  src: string;
  alt?: string;
  caption: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption }) => {
  return (
    <Card sx={{ width: '250px', height: '250px', display: 'flex', flexDirection: 'column', margin:1
    }}>
      <ImageComponent imageUrl={src} alt={alt} height="200px" width="100%" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
