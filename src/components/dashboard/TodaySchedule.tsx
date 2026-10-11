import Card, { CardBody } from '@/components/ui/Card'
import AppointmentStatusBadge from './AppointmentStatusBadge'
import type { Appointment } from '@/lib/dashboard-data'

interface TodayScheduleProps {
  appointments: Appointment[]
}

export default function TodaySchedule({ appointments }: TodayScheduleProps) {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <p className="text-text-secondary">No appointments scheduled for today</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody className="p-0">
        <div className="divide-y divide-border">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 hover:bg-surface-alt transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-text-primary">
                  {appointment.time}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {appointment.patientName}
                  </p>
                  <p className="text-xs text-text-secondary">{appointment.type}</p>
                </div>
              </div>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
