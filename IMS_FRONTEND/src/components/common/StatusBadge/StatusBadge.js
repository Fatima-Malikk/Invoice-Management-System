import { Chip } from '@mui/material';
import { INVOICE_STATUS } from '../../../config/constants';

const getStatusColor = (status) => {
  switch (status) {
    case INVOICE_STATUS.PAID:
      return 'success';
    case INVOICE_STATUS.OVERDUE:
      return 'error';
    case INVOICE_STATUS.PENDING:
      return 'warning';
    default:
      return 'default';
  }
};

const StatusBadge = ({ status }) => {
  return (
    <Chip
      label={status}
      color={getStatusColor(status)}
      size="small"
      variant="outlined"
    />
  );
};

export default StatusBadge; 