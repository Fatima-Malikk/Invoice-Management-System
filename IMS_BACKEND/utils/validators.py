import os
from django.core.exceptions import ValidationError
from django.conf import settings
from django.utils.translation import gettext_lazy as _

def validate_file_type(file):
    """
    Validates file type and size based on settings.
    """
    if not file:
        raise ValidationError(_('No file was submitted.'))
        
    # Get the file extension
    ext = os.path.splitext(file.name)[1].lower()
    
    # Get allowed extensions from settings or use defaults
    valid_extensions = getattr(settings, 'ALLOWED_FILE_TYPES', ['.pdf', '.jpg', '.jpeg', '.png'])
    
    if ext not in valid_extensions:
        raise ValidationError(
            _('File extension "%(extension)s" is not allowed. Allowed extensions are: %(allowed_extensions)s.'),
            params={
                'extension': ext,
                'allowed_extensions': ', '.join(valid_extensions)
            }
        )
    
    # Get max size from settings or use default 5MB
    max_size = getattr(settings, 'FILE_UPLOAD_MAX_MEMORY_SIZE', 5 * 1024 * 1024)
    
    if file.size > max_size:
        raise ValidationError(
            _('File size cannot exceed %(max_size)s MB.'),
            params={'max_size': max_size / (1024 * 1024)}
        )
    
    return True 