import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Preparing':
        return 'status-preparing';
      case 'Out for Delivery':
        return 'status-delivery';
      case 'Delivered':
        return 'status-delivered';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Badge 
      className={`${getStatusStyles()} ${className || ''}`}
      variant="secondary"
    >
      {status}
    </Badge>
  );
};