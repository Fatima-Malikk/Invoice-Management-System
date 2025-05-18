import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/layout/Layout.js';
import VendorList from './pages/vendors/VendorList';
import VendorInvoices from './pages/vendors/VendorInvoices';
import InvoiceList from './pages/invoices/InvoiceList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendors/:id/invoices" element={<VendorInvoices />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/" element={<VendorList />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        limit={1}
        enableMultiContainer={false}
        preventDuplicates
      />
    </ThemeProvider>
  );
}

export default App; 