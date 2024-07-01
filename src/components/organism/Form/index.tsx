import React, { useState } from 'react';
import FileAndTextInput from '../../molecules/FileandTextInput/index'; // Adjusted import path
import ImagePreview from '../../molecules/ImagePreview/index'; // Assuming this component correctly displays an image preview
import ButtonComponent from '../../atoms/Button/index'; // Assuming this component correctly handles button clicks
import { Box } from '@mui/material'; // Import Box component from Material-UI

const FormComponent: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImageSrc('');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handlePreview = () => {
    setPreviewMode(true);
  };

  const handleBack = () => {
    setPreviewMode(false);
  };

  const handleUpload = () => {
    if (imageSrc && caption) {
        const imageData = { src: imageSrc, caption };

        // Retrieve existing images
        const existingImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
        // Merge new image data
        const updatedImages = [...existingImages, imageData];
        // Store updated images
        localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  
      setImageFile(null);
      setImageSrc('');
      setCaption('');
      setPreviewMode(false);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 1, // Shadow level, adjust as needed
        borderRadius: 4, // Rounded corners, adjust as needed
        p: 2, // Padding
        maxWidth: 400, // Maximum width
        margin: 'auto', // Center align
      }}
    >
      {!previewMode ? (
        <Box>
          <FileAndTextInput
            inputFile={imageFile}
            onFileChange={handleFileChange}
            inputText={caption}
            onTextChange={handleTextChange}
          />
          <Box sx={{ mt: 2 }}>
            <ButtonComponent variant="contained" onClick={handlePreview} textColor="white">
              Preview
            </ButtonComponent>
            <ButtonComponent variant="contained" onClick={handleUpload} textColor="white" sx={{ ml: 2 }}>
              Upload
            </ButtonComponent>
          </Box>
        </Box>
      ) : (
        <Box>
          {imageSrc && <ImagePreview src={imageSrc} caption={caption} />}
          <Box sx={{ mt: 2 }}>
            <ButtonComponent variant="contained" onClick={handleBack} textColor="white">
              Back
            </ButtonComponent>
            <ButtonComponent variant="contained" onClick={handleUpload} textColor="white" sx={{ ml: 2 }}>
              Upload
            </ButtonComponent>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FormComponent;
