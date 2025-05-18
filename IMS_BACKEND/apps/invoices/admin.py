from django.contrib import admin
from .models import Invoice

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'vendor', 'amount', 'status', 'issue_date', 'due_date')
    list_filter = ('status', 'issue_date', 'due_date')
    search_fields = ('invoice_number', 'vendor__name') 