import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Delete, CloudUpload, Error } from '@mui/icons-material';
import { uploadService } from '../../services/uploadService';

const ImageUpload = ({ onImagesChange, existingImages = [] }) => {
  const [images, setImages] = useState(existingImages);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Всички поддържани image formats
  const allowedFormats = [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/gif', 
    'image/bmp', 
    'image/webp', 
    'image/svg+xml', 
    'image/tiff', 
    'image/avif'
  ];

  const allowedExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', 
    '.webp', '.svg', '.tiff', '.tif', '.avif'
  ];

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);
    setUploadError(null);

    try {
      for (const file of files) {
        console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size);
        
        // Проверка за тип на файла
        if (!allowedFormats.includes(file.type.toLowerCase())) {
          throw new Error(`Файлът ${file.name} не е поддържан image формат. Разрешени формати: JPEG, PNG, GIF, BMP, WEBP, SVG, TIFF, AVIF`);
        }

        // Проверка за файлово разширение
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
        if (!allowedExtensions.includes(fileExtension)) {
          throw new Error(`Файлът ${file.name} има неподдържано разширение. Разрешени: ${allowedExtensions.join(', ')}`);
        }

        // Проверка за размер
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Файлът ${file.name} е твърде голям (максимум 10MB)`);
        }

        const response = await uploadService.uploadImage(file);
        const fileName = response.data.fileName;
        
        const newImage = {
          imageUrl: uploadService.getImageUrl(fileName),
          altText: file.name,
          displayOrder: images.length,
          originalName: file.name,
          size: file.size,
          type: file.type
        };

        setImages(prev => [...prev, newImage]);
        console.log('✅ Image added:', newImage);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error.response?.data?.error || error.message || 'Грешка при качване на файла');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
    setUploadError(null);
  };

  React.useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box className="space-y-4">
      <Typography variant="h6" className="font-semibold">
        Изображения
      </Typography>

      <Box className="bg-blue-50 p-4 rounded-lg">
        <Typography variant="body2" className="text-blue-800">
          <strong>Поддържани формати:</strong> JPEG, JPG, PNG, GIF, BMP, WEBP, SVG, TIFF, AVIF
          <br />
          <strong>Максимален размер:</strong> 10MB
        </Typography>
      </Box>

      {uploadError && (
        <Alert severity="error" className="mb-4" onClose={() => setUploadError(null)}>
          {uploadError}
        </Alert>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          component="label"
          variant="outlined"
          startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
          disabled={uploading}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl"
        >
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.tiff,.tif,.avif,image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          {uploading ? 'Качване...' : 'Избери изображения'}
        </Button>
      </motion.div>

      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mt-4"
          >
            <Typography variant="body2" className="text-gray-600">
              Качени изображения ({images.length})
            </Typography>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={image.imageUrl}
                      alt={image.altText}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', image.imageUrl);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <IconButton
                      onClick={() => removeImage(index)}
                      className="opacity-0 group-hover:opacity-100 text-white bg-red-500 hover:bg-red-600"
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      className="bg-black bg-opacity-70 text-white"
                    />
                  </div>

                  {/* File info on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <Typography variant="caption" className="block truncate">
                      {image.originalName || image.altText}
                    </Typography>
                    <Typography variant="caption" className="block">
                      {formatFileSize(image.size)}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ImageUpload;