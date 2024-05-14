import { Container } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setFileSize(file.size / 1024 / 1024); 
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = () => {
    setFile(null);
    setFileSize(0);
  };

  return (
    <Container id='photoUpload'>
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here...</p> :
          file ? 
          <div>
            <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100%', height: 'auto' }} />
            <div>{`Size: ${fileSize.toFixed(2)} MB`}</div>
            <button onClick={removeFile}>Remove</button>
          </div> :
          <p>Drag 'n' drop an image here, or click to select an image</p>
      }
    </div>
    </Container>
  );
}

export default PhotoUpload;
