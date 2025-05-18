import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import { useInvoices } from '../../hooks/useInvoices';
import { useVendors } from '../../hooks/useVendors';
import InvoiceForm from '../../components/forms/InvoiceForm';
import StatusBadge from '../../components/common/StatusBadge';
import { INVOICE_STATUS } from '../../config/constants';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InvoiceList = ({ invoices = [], loading, vendorId, vendorName }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const { fetchInvoices, createInvoice, deleteInvoice, updateInvoice } = useInvoices();
  const { vendors, fetchVendors } = useVendors();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchVendors();
    fetchInvoices();
  }, [fetchVendors, fetchInvoices]);

  const getFileName = (fileUrl) => {
    if (!fileUrl) return '';
    const parts = fileUrl.split('/');
    return parts[parts.length - 1];
  };

  const columns = [
    { 
      field: 'invoice_number', 
      headerName: 'Invoice #', 
      flex: 1 
    },
    { 
      field: 'vendor',
      headerName: 'Vendor', 
      flex: 1,
      valueGetter: (params) => {
        const vendorId = params.row.vendor_id || params.row.vendor;
        const vendor = vendors.find(v => v.id === vendorId);
        return vendor?.name || 'Unknown';
      }
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 1,
      valueFormatter: (params) => {
        const amount = parseFloat(params.value);
        return isNaN(amount) ? '$0.00' : `$${amount.toFixed(2)}`;
      }
    },
    { 
      field: 'issue_date', 
      headerName: 'Issue Date', 
      flex: 1,
      valueFormatter: (params) => params.value ? format(new Date(params.value), 'MM/dd/yyyy') : ''
    },
    { 
      field: 'due_date', 
      headerName: 'Due Date', 
      flex: 1,
      valueFormatter: (params) => params.value ? format(new Date(params.value), 'MM/dd/yyyy') : ''
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      renderCell: (params) => <StatusBadge status={params.value} />
    },
    {
      field: 'file',
      headerName: 'Document',
      flex: 1.5,
      renderCell: (params) => {
        const fileUrl = params.row.file_url || params.row.file;
        if (!fileUrl) return 'No file';

        return (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%'
          }}>
            <Typography 
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                mr: 2
              }}
            >
              {getFileName(fileUrl)}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
            }}>
              <IconButton
                size="small"
                component="a"
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: 'primary.main',
                  padding: '2px'
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href={fileUrl}
                download
                sx={{ 
                  color: 'primary.main',
                  padding: '2px'
                }}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedInvoice(params.row);
              setOpenDialog(true);
            }}
            sx={{ color: 'primary.main' }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this invoice?')) {
                await deleteInvoice(params.row.id);
                fetchInvoices();
              }
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  const filteredInvoices = filterStatus && invoices
    ? invoices.filter(invoice => invoice.status === filterStatus)
    : invoices || [];

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
          {vendorName ? `Invoices for ${vendorName}` : 'Invoices'}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2 
        }}>
          <TextField
            select
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ width: { xs: '100%', sm: 200 } }}
          >
            <MenuItem value="">All</MenuItem>
            {Object.values(INVOICE_STATUS).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Add Invoice
          </Button>
        </Box>
      </Box>

      <DataGrid
        rows={filteredInvoices}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={loading}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            padding: 1,
          },
          '& .MuiDataGrid-columnHeader': {
            whiteSpace: 'normal',
            padding: 1,
          }
        }}
      />

      <Dialog 
        open={openDialog} 
        onClose={() => {
          setOpenDialog(false);
          setSelectedInvoice(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedInvoice ? 'Edit Invoice' : 'Add New Invoice'}</DialogTitle>
        <DialogContent>
          <InvoiceForm 
            vendors={vendors}
            initialData={selectedInvoice}
            onSubmit={async (data) => {
              if (selectedInvoice) {
                await updateInvoice(selectedInvoice.id, data);
              } else {
                await createInvoice(data);
              }
              setOpenDialog(false);
              setSelectedInvoice(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default InvoiceList; 