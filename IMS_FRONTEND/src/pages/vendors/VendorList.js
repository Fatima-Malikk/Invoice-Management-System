import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VendorForm from '../../components/forms/VendorForm';
import { useVendors } from '../../hooks/useVendors';

const VendorList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const navigate = useNavigate();
  const { vendors, loading, fetchVendors, createVendor, deleteVendor, updateVendor } = useVendors();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const filteredVendors = vendors.filter((vendor) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      vendor.name?.toLowerCase().includes(searchLower) ||
      vendor.email?.toLowerCase().includes(searchLower) ||
      vendor.address?.toLowerCase().includes(searchLower) ||
      vendor.phone?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        mb: 2 
      }}>
        <Typography variant="h5" sx={{ mb: { xs: 1, sm: 0 } }}>
          Vendors
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add Vendor
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Phone</TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Address</TableCell>
                  <TableCell>Invoices</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{vendor.email}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {vendor.phone ? `+1 ${vendor.phone}` : ''}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>{vendor.address}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/vendors/${vendor.id}/invoices`)}
                        size="small"
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setOpenDialog(true);
                        }}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this vendor?')) {
                            await deleteVendor(vendor.id);
                            fetchVendors();
                          }
                        }}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredVendors.length === 0 && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body1" color="text.secondary">
                No vendors found matching your search criteria.
              </Typography>
            </Box>
          )}
        </>
      )}

      <Dialog open={openDialog} onClose={() => {
        setOpenDialog(false);
        setSelectedVendor(null);
      }}>
        <DialogTitle>{selectedVendor ? 'Edit Vendor' : 'Add New Vendor'}</DialogTitle>
        <DialogContent>
          <VendorForm 
            initialData={selectedVendor}
            onSubmit={async (data) => {
              if (selectedVendor) {
                await updateVendor(selectedVendor.id, data);
              } else {
                await createVendor(data);
              }
              setOpenDialog(false);
              setSelectedVendor(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VendorList; 