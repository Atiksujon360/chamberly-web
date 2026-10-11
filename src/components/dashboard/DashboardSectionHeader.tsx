import type { ReactNode } from 'react'

interface DashboardSectionHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function DashboardSectionHeader({
  title,
  subtitle,
  action,
}: DashboardSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
