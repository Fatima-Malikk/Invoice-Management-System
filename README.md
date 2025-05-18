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
