Focus: Python (Backend)

Assessment Scenario: "Invoice Management System"
You are hired to develop a web-based internal tool for a company’s finance team. This system will
help them manage and keep track of invoices submitted by external vendors.
The tool will allow the team to:
• Add new vendors
• Upload invoices related to vendors (as PDF/image files)
• View a list of invoices and filter them by date, vendor, or payment status
• Click and view the uploaded invoice document
• Update invoice status (e.g., mark it as "Paid")
• Remove outdated or incorrect invoices
Imagine this as a simplified version of the kind of system used by accounting departments to
organize all incoming bills and vendor records.
Key Data Entities:
1. Vendor
a. id (auto-generated)
b. name (string)
c. email (string)
d. phone (string)
e. address (string)
2. Invoice
a. id (auto-generated)
b. vendor_id (foreign key to Vendor)
c. invoice_number (string)
d. amount (float)
e. issue_date (date)
f. due_date (date)
g. status ("Pending", "Paid", "Overdue")
h. file_url (string: location of uploaded PDF/image file)

Functional Requirements
Frontend (React.js) - High Focus(ALREADY DONE)
• Create pages to manage Vendors and Invoices.
• Use React Router to navigate between:
o /vendors: list of vendors
o /vendors/:id/invoices: list of that vendor's invoices
o /invoices: list of all invoices
• Allow users to upload invoice documents (PDF or image).
• Show uploaded documents as downloadable/viewable links.
• Include sorting and filtering (e.g., by date, status, vendor).
• Forms should have field validation.
• Use toasts to indicate success or failure.
• Responsive layout using a UI library.
Backend (Python: Django)(HIGH FOCUS: Need to do)
• Use Django REST Framework (DRF) to implement APIs for Vendors and Invoices (CRUD
operations).
• Implement file upload handling in Django to store invoice documents and expose them via
accessible URLs.
• Use Django ORM with SQLite or PostgreSQL for data storage.
• Implement filtering logic using query parameters.
• Ensure uploaded files are safely handled.
Deliverables
b. backend/ (Python API)
2. A README.md file that includes:
a. How to set up and run the project locally
b. API endpoint descriptions
c. Sample payloads or curl examples
d. Notes about any assumptions, limitations, or stretch goals

Evaluation Criteria

Area Weight
Backend API & Data Handling 20%
Code Quality & Readability 10%
File Upload & Validation 10%

Suggested Stack
• Backend: Django + Django REST Framework, Django ORM, SQLite / PostgreSQL
• Nice to Have: PDF/Image preview, responsive design, search/filtering
Build a simple but professional-grade dashboard to manage vendor invoices. Show your ability to design,
build, and polish a full-stack app. Good Luck...!