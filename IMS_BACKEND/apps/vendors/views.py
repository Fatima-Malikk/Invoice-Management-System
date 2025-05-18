from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .models import Vendor
from .serializers import VendorSerializer
from apps.invoices.serializers import InvoiceSerializer

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['name', 'email']
    search_fields = ['name', 'email', 'address']

    @action(detail=True, methods=['get'])
    def invoices(self, request, pk=None):
        vendor = self.get_object()
        invoices = vendor.invoices.all()
        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data) 