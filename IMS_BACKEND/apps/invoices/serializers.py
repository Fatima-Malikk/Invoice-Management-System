from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import Invoice
from utils.validators import validate_file_type

class InvoiceSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.name', read_only=True)
    file = serializers.FileField(
        required=True,
        error_messages={
            'required': _('Please submit an invoice file.'),
            'empty': _('The submitted file is empty.'),
            'invalid': _('The submitted file is invalid or corrupted.')
        }
    )
    
    class Meta:
        model = Invoice
        fields = [
            'id', 'vendor', 'vendor_name', 'invoice_number',
            'amount', 'issue_date', 'due_date', 'status', 'file'
        ]
        
    def validate_file(self, value):
        validate_file_type(value)
        return value 