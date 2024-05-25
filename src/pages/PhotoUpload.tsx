import { Container, Typography, Grid, IconButton } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageIcon from '@mui/icons-material/Image';

function PhotoUpload(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: true } as unknown as DropzoneOptions);

  const removeFile = (fileToRemove: File, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent default behavior (opening file in a new window)
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <Container id="photoUpload">
      <Typography variant="h6" gutterBottom>
        Upload Your Body Photos Here
      </Typography>
      <span style={{ marginLeft: 10 }}>Drag 'n' drop images here, or click to select images</span>
      <div
        {...getRootProps()}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {files.map((file, index) => (
              <Grid
                item
                key={index}
                style={{ width: 120, position: 'relative', display: 'flex', justifyContent: 'center' }}
              >
                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto' }} />
                <IconButton
                  size="small"
                  style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#fff', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)' }}
                  onClick={(event) => removeFile(file, event)}
                >
                  <DeleteOutlineIcon style={{ color: 'red' }} />
                </IconButton>
              </Grid>
            ))}
            {files.length === 0 && ( // Conditionally render only when no files are uploaded
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ImageIcon style={{ marginRight: '5px' }} />
                  <span>No images uploaded</span>
                </div>
              </Grid>
            )}
          </Grid>
        )}
      </div>
    </Container>
  );
}

export default PhotoUpload;
