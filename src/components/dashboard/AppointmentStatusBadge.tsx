import Badge from '@/components/ui/Badge'

type AppointmentStatus = 'upcoming' | 'checked-in' | 'completed' | 'cancelled'

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
}

const statusConfig: Record<
  AppointmentStatus,
  { variant: 'success' | 'warning' | 'error' | 'info' | 'neutral'; label: string }
> = {
  upcoming: { variant: 'info', label: 'Upcoming' },
  'checked-in': { variant: 'warning', label: 'Checked In' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'error', label: 'Cancelled' },
}

export default function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
