# Invoice Management System

A full-stack web application for managing vendors and their invoices. Built with React (frontend) and Django REST Framework (backend).

## Features

- Vendor management (CRUD operations)
- Invoice management with file uploading with view and download options
- Invoice status tracking (Pending, Paid, Overdue)
- Search and filter capabilities
- Responsive design

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- React Hook Form
- Axios

### Backend
- Django
- Django REST Framework
- SQLite (can be configured for other databases)
- Django CORS Headers
- DRF-YASG (API documentation)

## Setup Instructions

### Backend Setup
1. Create a virtual environment:   
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:   
```bash
pip install -r requirements.txt
```

3. Run migrations:   
```bash
python manage.py migrate
```

4. Create superuser (optional):   
```bash
python manage.py createsuperuser
```

5. Run development server:   
```bash
python manage.py runserver
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd IMS_FRONTEND
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add:
```bash
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Documentation: http://localhost:8000/api/docs/

## API Endpoints

### Vendors
- `GET /api/vendors/` - List all vendors
- `POST /api/vendors/` - Create new vendor
- `GET /api/vendors/{id}/` - Get vendor details
- `PUT /api/vendors/{id}/` - Update vendor
- `DELETE /api/vendors/{id}/` - Delete vendor
- `GET /api/vendors/{id}/invoices/` - List vendor's invoices

Example Vendor cURL:
```
Create Vendor
curl -X POST http://localhost:8000/api/vendors/ \
-H "Content-Type: application/json" \
-d '{
"name": "Test Vendor",
"email": "test@vendor.com",
"phone": "(555) 555-5555",
"address": "123 Test St"
}'
```
### Invoices
- `GET /api/invoices/` - List all invoices
- `POST /api/invoices/` - Create new invoice
- `GET /api/invoices/{id}/` - Get invoice details
- `PUT /api/invoices/{id}/` - Update invoice
- `DELETE /api/invoices/{id}/` - Delete invoice

Example Invoice cURL:
```
Create Invoice
curl -X POST http://localhost:8000/api/invoices/ \
-H "Content-Type: multipart/form-data" \
-F "vendor=1" \
-F "invoice_number=INV-001" \
-F "amount=1500.00" \
-F "issue_date=2024-03-15" \
-F "due_date=2024-04-15" \
-F "status=PENDING" \
-F "file=@/path/to/invoice.pdf"
```
## API Documentation
Detailed API documentation available at `/api/docs/` when server is running.

## File Upload Specifications
- Supported formats: PDF, JPG, JPEG, PNG
- Maximum file size: 5MB

## Status Types
- PENDING: Invoice is awaiting payment
- PAID: Invoice has been paid
- OVERDUE: Payment deadline has passed

## Implementation Overview

### Frontend Implementation (`IMS_FRONTEND`)

#### Component Structure
- **Layout**: Responsive layout with Material-UI, featuring a persistent sidebar for navigation
- **Common Components**:
  - `FileUpload`: Handles file uploads with preview, validation, and progress indicator
  - `StatusBadge`: Visual representation of invoice statuses using MUI Chips

#### Pages
1. **Vendor Management**:
   - `VendorList`: Data grid displaying vendors with search and filter capabilities
   - `VendorForm`: Form for creating/editing vendors with phone number formatting
   - Real-time validation for email and phone formats

2. **Invoice Management**:
   - `InvoiceList`: Advanced data grid with status filtering and file preview
   - `InvoiceForm`: Multi-part form handling file uploads and vendor selection
   - Document preview and download functionality

#### State Management
- Custom hooks for data management:
  - `useVendors`: Handles vendor CRUD operations
  - `useInvoices`: Manages invoice operations and file handling
- React Hook Form for form state management
- Toast notifications for user feedback

#### API Integration
- Axios instance with base configuration
- Centralized API service modules
- File upload handling with FormData
- Error handling with toast notifications

### Backend Implementation (`IMS_BACKEND`)

#### Project Structure
- Django apps:
  - `vendors`: Vendor management
  - `invoices`: Invoice and file handling
- Core configuration in `core` module
- Utility functions in `utils` module

#### Models
1. **Vendor Model**:
   - Basic vendor information (name, email, phone, address)
   - Validation for unique email addresses
   - Phone number formatting

2. **Invoice Model**:
   - Vendor relationship (ForeignKey)
   - File storage with upload_to configuration
   - Status tracking (PENDING, PAID, OVERDUE)
   - Automatic timestamps

#### API Features
1. **ViewSets**:
   - `VendorViewSet`: Full CRUD with nested invoice access
   - `InvoiceViewSet`: File handling and status management

2. **File Handling**:
   - Secure file upload validation
   - File type restrictions (PDF, images)
   - Size limitations (5MB max)

3. **Filtering & Search**:
   - Django Filter backend for advanced querying
   - Search functionality on relevant fields
   - Ordering capabilities

#### Security & Performance
- CORS configuration for frontend access
- File validation middleware
- Efficient database queries
- Error handling and validation

## Key Features Implementation

### File Management
- Frontend: Progress tracking, preview capability, drag-n-drop
- Backend: Secure storage, type validation, size restrictions

### Search & Filter
- Frontend: Real-time search in vendor list
- Backend: Database-level filtering and search optimization

### Form Validation
- Frontend: Real-time validation with React Hook Form
- Backend: Model-level and serializer validation

### Responsive Design
- Adaptive layout for different screen sizes
- Mobile-friendly interface with collapsible sidebar
- Optimized table views for small screens
