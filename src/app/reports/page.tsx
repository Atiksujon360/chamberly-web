'use client'

import { useMemo } from 'react'
import AppShell from '@/components/layout/AppShell'
import Card, { CardBody } from '@/components/ui/Card'
import { allAppointments, chambers } from '@/lib/dashboard-data'
import { useAccount } from '@/lib/account-context'

export default function ReportsPage() {
  const { activeChamberId } = useAccount()

  // Filter appointments by active chamber
  const filteredAppointments = useMemo(() => {
    if (!activeChamberId) return allAppointments
    return allAppointments.filter((apt) => apt.chamberId === activeChamberId)
  }, [activeChamberId])

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = filteredAppointments.length
    const completed = filteredAppointments.filter((apt) => apt.status === 'completed').length
    const cancelled = filteredAppointments.filter((apt) => apt.status === 'cancelled').length
    const upcoming = filteredAppointments.filter((apt) => apt.status === 'upcoming').length
    const checkedIn = filteredAppointments.filter((apt) => apt.status === 'checked-in').length

    // Calculate estimated fees for non-cancelled appointments
    let estimatedFees = 0
    filteredAppointments.forEach((apt) => {
      if (apt.status !== 'cancelled') {
        const chamber = chambers.find((c) => c.id === apt.chamberId)
        if (chamber) {
          const fee = apt.type === 'New Consultation' ? chamber.feeNew : chamber.feeFollowUp
          const numericFee = parseInt(fee.replace(/[^\d]/g, '')) || 0
          estimatedFees += numericFee
        }
      }
    })

    // Appointments by chamber
    const byChamber = chambers.map((chamber) => {
      const chamberAppointments = filteredAppointments.filter((apt) => apt.chamberId === chamber.id)
      return {
        name: chamber.name,
        total: chamberAppointments.length,
        completed: chamberAppointments.filter((apt) => apt.status === 'completed').length,
      }
    })

    return {
      total,
      completed,
      cancelled,
      upcoming,
      checkedIn,
      estimatedFees,
      byChamber,
    }
  }, [filteredAppointments])

  const completionRate = metrics.total > 0
    ? Math.round((metrics.completed / metrics.total) * 100)
    : 0

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Reports
          </h1>
          <p className="mt-1 text-text-secondary">
            Operational insights and appointment metrics
          </p>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Total Appointments</p>
              <p className="text-2xl font-semibold text-text-primary">{metrics.total}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Completed</p>
              <p className="text-2xl font-semibold text-text-primary">{metrics.completed}</p>
              <p className="text-xs text-text-secondary mt-1">{completionRate}% completion rate</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Upcoming</p>
              <p className="text-2xl font-semibold text-text-primary">{metrics.upcoming + metrics.checkedIn}</p>
              <p className="text-xs text-text-secondary mt-1">{metrics.checkedIn} checked in</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Estimated Fees</p>
              <p className="text-2xl font-semibold text-text-primary">৳{metrics.estimatedFees.toLocaleString()}</p>
              <p className="text-xs text-text-secondary mt-1">Non-cancelled appointments</p>
            </CardBody>
          </Card>
        </div>

        {/* Appointments by Chamber */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Appointments by Chamber
            </h2>
            <div className="space-y-4">
              {metrics.byChamber.map((chamber) => (
                <div key={chamber.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {chamber.name}
                    </p>
                    <p className="text-xs text-text-secondary">{chamber.completed} completed</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-semibold text-text-primary">{chamber.total}</p>
                    <p className="text-xs text-text-secondary">total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Status Breakdown
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Completed</span>
                <span className="text-sm font-medium text-text-primary">{metrics.completed}</span>
              </div>
              <div className="w-full bg-surface-alt rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full"
                  style={{ width: `${metrics.total > 0 ? (metrics.completed / metrics.total) * 100 : 0}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-text-secondary">Upcoming</span>
                <span className="text-sm font-medium text-text-primary">{metrics.upcoming}</span>
              </div>
              <div className="w-full bg-surface-alt rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${metrics.total > 0 ? (metrics.upcoming / metrics.total) * 100 : 0}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-text-secondary">Checked In</span>
                <span className="text-sm font-medium text-text-primary">{metrics.checkedIn}</span>
              </div>
              <div className="w-full bg-surface-alt rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{ width: `${metrics.total > 0 ? (metrics.checkedIn / metrics.total) * 100 : 0}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-text-secondary">Cancelled</span>
                <span className="text-sm font-medium text-text-primary">{metrics.cancelled}</span>
              </div>
              <div className="w-full bg-surface-alt rounded-full h-2">
                <div
                  className="bg-error h-2 rounded-full"
                  style={{ width: `${metrics.total > 0 ? (metrics.cancelled / metrics.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Demo Notice */}
        <Card>
          <CardBody className="p-4">
            <p className="text-xs text-text-tertiary">
              * These reports are generated from synthetic appointment data for demonstration purposes only. Metrics are not persisted and may reset on refresh.
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  )
}
