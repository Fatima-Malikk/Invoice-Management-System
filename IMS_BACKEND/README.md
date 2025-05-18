# Invoice Management System API

## Setup Instructions
1. Create a virtual environment:   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate   ```

2. Install dependencies:   ```bash
   pip install -r requirements.txt   ```

3. Run migrations:   ```bash
   python manage.py migrate   ```

4. Create superuser (optional):   ```bash
   python manage.py createsuperuser   ```

5. Run development server:   ```bash
   python manage.py runserver   ```

## API Endpoints

### Vendors
- `GET /api/vendors/` - List all vendors
- `POST /api/vendors/` - Create new vendor
- `GET /api/vendors/{id}/` - Get vendor details
- `PUT /api/vendors/{id}/` - Update vendor
- `DELETE /api/vendors/{id}/` - Delete vendor
- `GET /api/vendors/{id}/invoices/` - List vendor's invoices

### Invoices
- `GET /api/invoices/` - List all invoices
- `POST /api/invoices/` - Create new invoice
- `GET /api/invoices/{id}/` - Get invoice details
- `PUT /api/invoices/{id}/` - Update invoice
- `DELETE /api/invoices/{id}/` - Delete invoice

## API Documentation
Detailed API documentation available at `/api/docs/` when server is running. 