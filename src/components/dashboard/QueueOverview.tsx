import Card, { CardBody } from '@/components/ui/Card'
import AppointmentStatusBadge from './AppointmentStatusBadge'
import type { Appointment } from '@/lib/dashboard-data'

interface QueueOverviewProps {
  appointments: Appointment[]
}

export default function QueueOverview({ appointments }: QueueOverviewProps) {
  if (appointments.length === 0) {
    return null
  }

  return (
    <Card>
      <CardBody className="p-4">
        <h3 className="text-sm font-medium text-text-secondary mb-3">
          Next in Queue
        </h3>
        <div className="space-y-2">
          {appointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-alt flex items-center justify-center text-xs font-medium text-text-primary">
                  {index + 1}
                </span>
                <span className="text-text-primary">{appointment.patientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-secondary">{appointment.time}</span>
                <AppointmentStatusBadge status={appointment.status} />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
