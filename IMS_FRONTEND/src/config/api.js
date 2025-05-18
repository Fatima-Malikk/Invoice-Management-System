export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  VENDORS: '/vendors/',
  INVOICES: '/invoices/',
  VENDOR_INVOICES: (id) => `/vendors/${id}/invoices/`,
  INVOICE_DETAIL: (id) => `/invoices/${id}/`,
  VENDOR_DETAIL: (id) => `/vendors/${id}/`,
};

export const FILE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedFormats: '.pdf,.jpg,.jpeg,.png'
}; 