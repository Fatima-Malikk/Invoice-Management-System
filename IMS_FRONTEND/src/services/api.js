import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const vendorService = {
  getAll: (params) => api.get(API_ENDPOINTS.VENDORS, { params }),
  getById: (id) => api.get(API_ENDPOINTS.VENDOR_DETAIL(id)),
  create: (data) => api.post(API_ENDPOINTS.VENDORS, data),
  update: (id, data) => api.put(API_ENDPOINTS.VENDOR_DETAIL(id), data),
  delete: (id) => api.delete(API_ENDPOINTS.VENDOR_DETAIL(id)),
  getInvoices: (id, params) => api.get(API_ENDPOINTS.VENDOR_INVOICES(id), { params })
};

export const invoiceService = {
  getAll: (params) => api.get(API_ENDPOINTS.INVOICES, { params }),
  getById: (id) => api.get(API_ENDPOINTS.INVOICE_DETAIL(id)),
  create: (formData) => {
    return api.post(API_ENDPOINTS.INVOICES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  update: (id, data) => {
    if (data instanceof FormData) {
      return api.put(API_ENDPOINTS.INVOICE_DETAIL(id), data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    return api.put(API_ENDPOINTS.INVOICE_DETAIL(id), data);
  },
  delete: (id) => api.delete(API_ENDPOINTS.INVOICE_DETAIL(id))
};

// Update the error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Don't throw a new error, just return a rejected promise
    return Promise.reject(error.response?.data?.message || 'An error occurred');
  }
);

export default api; 