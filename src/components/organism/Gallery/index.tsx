import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ImageCard from '../../molecules/ImagePreview/index';
import TextComponent from '../../atoms/Text';

const Gallery: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<{ src: string; caption: string }[]>([]);

  useEffect(() => {
    // Load previously uploaded images from localStorage when the component mounts
    const storedImages = localStorage.getItem('uploadedImages');
    if (storedImages) {
      setUploadedImages(JSON.parse(storedImages));
    }
  }, []);

  return (
    <div className="gallery-container">
      <TextComponent variant="h4">
        Gallery
      </TextComponent>
      <Grid container spacing={2}>
        {uploadedImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ImageCard src={image.src} alt="Uploaded Image" caption={image.caption} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Gallery;
