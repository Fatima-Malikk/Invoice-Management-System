import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Box, 
  TextField, 
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { INVOICE_STATUS } from '../../../config/constants';

const InvoiceForm = ({ onSubmit, vendors, initialData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [removeFile, setRemoveFile] = useState(false);
  const fileInputRef = React.useRef(null);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      ...initialData,
      vendor: initialData?.vendor_id || initialData?.vendor || '',
      status: initialData?.status || INVOICE_STATUS.PENDING,
      issue_date: initialData?.issue_date ? new Date(initialData.issue_date) : null,
      due_date: initialData?.due_date ? new Date(initialData.due_date) : null,
    }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setRemoveFile(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileName = (fileUrl) => {
    if (!fileUrl) return '';
    const parts = fileUrl.split('/');
    return parts[parts.length - 1];
  };

  const onSubmitForm = async (data) => {
    try {
      const formData = new FormData();
      
      formData.append('vendor', data.vendor);
      formData.append('invoice_number', data.invoice_number);
      formData.append('amount', data.amount);
      formData.append('issue_date', format(new Date(data.issue_date), 'yyyy-MM-dd'));
      formData.append('due_date', format(new Date(data.due_date), 'yyyy-MM-dd'));
      formData.append('status', data.status);
      
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (initialData?.file_url && !removeFile) {
        const response = await fetch(initialData.file_url);
        const blob = await response.blob();
        formData.append('file', blob, getFileName(initialData.file_url));
      }
      
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={{ mt: 2 }}>
      {initialData?.vendor_name && (
        <Typography variant="h6" sx={{ mb: 3 }}>
          Invoice for {initialData.vendor_name}
        </Typography>
      )}

      <FormControl fullWidth margin="normal" error={!!errors.vendor}>
        <InputLabel>Vendor</InputLabel>
        <Controller
          name="vendor"
          control={control}
          rules={{ required: 'Vendor is required' }}
          render={({ field }) => (
            <Select {...field} label="Vendor">
              {vendors.map(vendor => (
                <MenuItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.vendor && (
          <Typography color="error" variant="caption">
            {errors.vendor.message}
          </Typography>
        )}
      </FormControl>

      <TextField
        fullWidth
        label="Invoice Number"
        margin="normal"
        {...register('invoice_number', { required: 'Invoice number is required' })}
        error={!!errors.invoice_number}
        helperText={errors.invoice_number?.message}
      />

      <TextField
        fullWidth
        label="Amount"
        type="number"
        margin="normal"
        {...register('amount', { 
          required: 'Amount is required',
          min: { value: 0, message: 'Amount must be positive' }
        })}
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />

      <Controller
        name="issue_date"
        control={control}
        rules={{ required: 'Issue date is required' }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Issue Date"
              {...field}
              onChange={(newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  margin="normal"
                  error={!!errors.issue_date}
                  helperText={errors.issue_date?.message}
                />
              )}
            />
          </LocalizationProvider>
        )}
      />

      <Controller
        name="due_date"
        control={control}
        rules={{ required: 'Due date is required' }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              {...field}
              onChange={(newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  margin="normal"
                  error={!!errors.due_date}
                  helperText={errors.due_date?.message}
                />
              )}
            />
          </LocalizationProvider>
        )}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Status is required' }}
          render={({ field }) => (
            <Select {...field} label="Status">
              {Object.values(INVOICE_STATUS).map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Invoice Document</Typography>
        
        {initialData?.file_url && !selectedFile && !removeFile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            bgcolor: 'grey.100', 
            borderRadius: 1,
            mb: 2 
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {getFileName(initialData.file_url)}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                component="a"
                href={initialData.file_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main' }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleRemoveFile}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        {selectedFile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 2, 
            bgcolor: 'grey.100', 
            borderRadius: 1,
            mb: 2 
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {selectedFile.name}
            </Typography>
            <IconButton
              size="small"
              onClick={handleRemoveFile}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Button
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
          fullWidth
        >
          {initialData?.file_url && !selectedFile ? 'Replace Document' : 'Upload Document'}
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        {initialData ? 'Update Invoice' : 'Create Invoice'}
      </Button>
    </Box>
  );
};

export default InvoiceForm; 