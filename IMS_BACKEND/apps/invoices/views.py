from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters import rest_framework as filters
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceFilter(filters.FilterSet):
    min_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    max_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')
    issue_date_range = filters.DateFromToRangeFilter(field_name="issue_date")
    due_date_range = filters.DateFromToRangeFilter(field_name="due_date")

    class Meta:
        model = Invoice
        fields = ['vendor', 'status', 'min_amount', 'max_amount', 
                 'issue_date_range', 'due_date_range']

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    filter_class = InvoiceFilter
    parser_classes = (MultiPartParser, FormParser)
    search_fields = ['invoice_number', 'vendor__name']
    ordering_fields = ['issue_date', 'due_date', 'amount', 'status']

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            ) 