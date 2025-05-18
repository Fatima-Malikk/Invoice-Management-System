from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Invoice Management System API",
        default_version='v1',
        description="API for managing vendors and invoices",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/vendors/', include('apps.vendors.urls')),
    path('api/invoices/', include('apps.invoices.urls')),
    
    # API Documentation
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 