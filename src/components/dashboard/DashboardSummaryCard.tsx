import Card, { CardBody } from '@/components/ui/Card'

interface DashboardSummaryCardProps {
  label: string
  value: string
  caption: string
  icon: string
}

export default function DashboardSummaryCard({
  label,
  value,
  caption,
  icon,
}: DashboardSummaryCardProps) {
  return (
    <Card>
      <CardBody className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-secondary mb-1">
              {label}
            </p>
            <p className="text-2xl font-semibold text-text-primary mb-1">
              {value}
            </p>
            <p className="text-xs text-text-tertiary">{caption}</p>
          </div>
          <div className="text-2xl" aria-hidden="true">
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
