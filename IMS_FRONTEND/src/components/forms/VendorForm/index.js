import { useForm } from 'react-hook-form';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';

const VendorForm = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });
  const [phone, setPhone] = useState(initialData?.phone || '');

  const onSubmitForm = async (data) => {
    try {
      await onSubmit({ ...data, phone });
      toast.success('Vendor saved successfully!');
    } catch (error) {
      toast.error('Error saving vendor');
    }
  };

  const handlePhoneChange = (event) => {
    let input = event.target.value;
    
    // Remove the +1 if user tries to type over it
    if (input.startsWith('+1')) {
      input = input.substring(2);
    }
    
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Only take the first 10 digits
    const truncated = digits.slice(0, 10);
    
    // Format the phone number
    let formatted = truncated;
    if (truncated.length >= 6) {
      formatted = `(${truncated.slice(0,3)}) ${truncated.slice(3,6)}-${truncated.slice(6)}`;
    } else if (truncated.length >= 3) {
      formatted = `(${truncated.slice(0,3)}) ${truncated.slice(3)}`;
    }
    
    setPhone(formatted);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Vendor Name"
        margin="normal"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        type="email"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          value={phone}
          onChange={handlePhoneChange}
          error={!!errors.phone || (phone && phone.replace(/\D/g, '').length !== 10)}
          helperText={
            errors.phone?.message || 
            (phone && phone.replace(/\D/g, '').length !== 10 ? 'Phone number must be 10 digits' : 'Enter 10 digit phone number')
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pointerEvents: 'none' }}>
                +1
              </InputAdornment>
            ),
          }}
          placeholder="(555) 555-5555"
        />
      </Box>
      <TextField
        fullWidth
        label="Address"
        margin="normal"
        multiline
        rows={3}
        {...register('address', { required: 'Address is required' })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!phone || phone.replace(/\D/g, '').length !== 10}
      >
        Save Vendor
      </Button>
    </Box>
  );
};

export default VendorForm; 