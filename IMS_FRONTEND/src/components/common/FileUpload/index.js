import { useRef, useState } from 'react';
import { Box, Button, Typography, Stack, Link, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from 'react-toastify';
import { FILE_UPLOAD_CONFIG } from '../../../config/api';

const FileUpload = ({ onUpload, accept = FILE_UPLOAD_CONFIG.acceptedFormats, initialFile = null, fileUrl = null }) => {
  const [selectedFile, setSelectedFile] = useState(initialFile);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > FILE_UPLOAD_CONFIG.maxSize) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    try {
      setUploading(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Create an array of accepted MIME types from the accept prop
      const acceptedTypes = accept.split(',').map(type => 
        type.trim().replace('.*', '').replace('.', 'image/')
      );
      
      if (!acceptedTypes.includes(file.type) && file.type !== 'application/pdf') {
        toast.error('Invalid file type. Please upload PDF or image files only.');
        return;
      }

      setSelectedFile(file);
      await onUpload(file);
      clearInterval(interval);
      setProgress(100);
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUpload(null);
  };

  const renderFilePreview = () => {
    if (!selectedFile && !fileUrl) return null;

    return (
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center" 
        sx={{ 
          border: '1px solid #e0e0e0', 
          p: 1.5, 
          borderRadius: 1,
          bgcolor: '#f5f5f5',
          mt: 2
        }}
      >
        <Typography 
          noWrap 
          sx={{ 
            flex: 1,
            color: '#2196f3',
            fontWeight: 500
          }}
        >
          📎 {selectedFile ? selectedFile.name : 'Uploaded Document'}
        </Typography>
        <Stack direction="row" spacing={1}>
          {fileUrl && (
            <Link 
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<DownloadIcon />}
              >
                View
              </Button>
            </Link>
          )}
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveFile}
            size="small"
          >
            Remove
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <Box>
      <input
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        fullWidth
      >
        Upload File
      </Button>
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="textSecondary">
            Uploading... {progress}%
          </Typography>
        </Box>
      )}
      {renderFilePreview()}
    </Box>
  );
};

export default FileUpload; 