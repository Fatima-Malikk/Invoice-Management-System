import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useInvoices } from '../../hooks/useInvoices';
import { useVendors } from '../../hooks/useVendors';
import InvoiceList from '../invoices/InvoiceList';

const VendorInvoices = () => {
  const { id } = useParams();
  const { vendors, fetchVendors } = useVendors();
  const { invoices, loading, fetchInvoices } = useInvoices(id);

  useEffect(() => {
    fetchVendors();
    fetchInvoices();
  }, [fetchVendors, fetchInvoices]);

  const vendor = vendors.find(v => v.id === parseInt(id));

  return (
    <Box>
      <InvoiceList 
        invoices={invoices} 
        loading={loading} 
        vendorId={parseInt(id)}
        vendorName={vendor?.name}
      />
    </Box>
  );
};

export default VendorInvoices; 