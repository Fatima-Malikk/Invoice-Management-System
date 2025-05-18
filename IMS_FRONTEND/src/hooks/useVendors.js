import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { vendorService } from '../services/api';

export const useVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  const fetchVendors = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await vendorService.getAll({
        page: pagination.page,
        page_size: pagination.pageSize,
        ...params
      });
      setVendors(response.data.results);
      setPagination(prev => ({
        ...prev,
        total: response.data.count
      }));
      setError(null);
    } catch (err) {
      setError(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  const createVendor = async (data) => {
    try {
      setLoading(true);
      const response = await vendorService.create(data);
      setVendors(prev => [...prev, response.data]);
      toast.success('Vendor created successfully');
      return response.data;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteVendor = async (id) => {
    try {
      setLoading(true);
      await vendorService.delete(id);
      setVendors(currentVendors => 
        currentVendors.filter(vendor => vendor.id !== id)
      );
      toast.success('Vendor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVendor = async (id, data) => {
    try {
      setLoading(true);
      const response = await vendorService.update(id, data);
      setVendors(currentVendors =>
        currentVendors.map(vendor =>
          vendor.id === id ? { ...vendor, ...response.data } : vendor
        )
      );
      toast.success('Vendor updated successfully');
      return response.data;
    } catch (err) {
      toast.error('Failed to update vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    vendors,
    loading,
    error,
    pagination,
    setPagination,
    fetchVendors,
    createVendor,
    deleteVendor,
    updateVendor
  };
}; 