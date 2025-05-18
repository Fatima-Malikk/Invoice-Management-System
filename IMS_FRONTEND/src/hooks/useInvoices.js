import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { invoiceService } from '../services/api';

export const useInvoices = (vendorId = null) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const response = vendorId 
        ? await invoiceService.getByVendor(vendorId)
        : await invoiceService.getAll();
      
      // Transform the response data to ensure consistent structure
      const transformedData = (response.data.results || response.data || []).map(invoice => ({
        ...invoice,
        id: invoice.id,
        vendor: invoice.vendor_id || invoice.vendor,
        file_url: invoice.file_url || invoice.file
      }));
      
      setInvoices(transformedData);
      setError(null);
    } catch (err) {
      setError(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  const createInvoice = async (data) => {
    try {
      setLoading(true);
      const response = await invoiceService.create(data);
      
      // Transform the new invoice data to match the structure
      const newInvoice = {
        ...response.data,
        id: response.data.id,
        vendor: response.data.vendor_id || response.data.vendor,
        file_url: response.data.file_url || response.data.file
      };
      
      setInvoices(currentInvoices => [...(currentInvoices || []), newInvoice]);
      toast.success('Invoice created successfully');
      return response.data;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateInvoiceStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await invoiceService.update(id, { status });
      setInvoices(currentInvoices => 
        (currentInvoices || []).map(invoice => 
          invoice.id === id ? { ...invoice, status } : invoice
        )
      );
      toast.success('Invoice status updated');
      return response.data;
    } catch (err) {
      toast.error('Failed to update invoice status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      setLoading(true);
      await invoiceService.delete(id);
      setInvoices(currentInvoices => 
        currentInvoices.filter(invoice => invoice.id !== id)
      );
      toast.success('Invoice deleted successfully');
    } catch (err) {
      toast.error('Failed to delete invoice');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateInvoice = async (id, data) => {
    try {
      setLoading(true);
      const response = await invoiceService.update(id, data);
      setInvoices(currentInvoices =>
        currentInvoices.map(invoice =>
          invoice.id === id ? { ...invoice, ...response.data } : invoice
        )
      );
      toast.success('Invoice updated successfully');
      return response.data;
    } catch (err) {
      toast.error('Failed to update invoice');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    createInvoice,
    updateInvoiceStatus,
    deleteInvoice,
    updateInvoice,
  };
}; 