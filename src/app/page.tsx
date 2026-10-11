'use client'

import { useMemo } from 'react'
import AppShell from '@/components/layout/AppShell'
import DashboardSummaryCard from '@/components/dashboard/DashboardSummaryCard'
import TodaySchedule from '@/components/dashboard/TodaySchedule'
import QueueOverview from '@/components/dashboard/QueueOverview'
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader'
import Button from '@/components/ui/Button'
import Card, { CardBody } from '@/components/ui/Card'
import {
  allAppointments,
  chambers,
  getCurrentDate,
  getCurrentGreeting,
} from '@/lib/dashboard-data'
import { useAccount } from '@/lib/account-context'

export default function Dashboard() {
  const greeting = getCurrentGreeting()
  const currentDate = getCurrentDate()
  const { activeChamberId, activeChamber } = useAccount()
  const todayString = new Date().toISOString().split('T')[0]

  // Filter appointments based on active chamber
  const todayAppointments = useMemo(() => {
    return allAppointments.filter((apt) => apt.date === todayString)
  }, [todayString])

  const filteredAppointments = useMemo(() => {
    if (!activeChamberId) return todayAppointments
    return todayAppointments.filter((apt) => apt.chamberId === activeChamberId)
  }, [todayAppointments, activeChamberId])

  // Calculate dynamic summary metrics
  const summaryCards = useMemo(() => {
    const totalAppointments = filteredAppointments.length
    const cancelledAppointments = filteredAppointments.filter((apt) => apt.status === 'cancelled').length
    const checkedInAppointments = filteredAppointments.filter((apt) => apt.status === 'checked-in').length
    const upcomingAppointments = filteredAppointments.filter((apt) => apt.status === 'upcoming').length

    // Remaining queue: upcoming + checked-in (excluding completed and cancelled)
    const remainingQueue = upcomingAppointments + checkedInAppointments

    // Calculate estimated appointment fees (fictional calculation based on chamber fees)
    // Definition: Sum of fees for all non-cancelled appointments (upcoming, checked-in, completed)
    // This is NOT collected revenue - it's the potential value of scheduled appointments
    let estimatedFees = 0
    filteredAppointments.forEach((apt) => {
      const chamber = chambers.find((c) => c.id === apt.chamberId)
      if (chamber && apt.status !== 'cancelled') {
        const fee = apt.type === 'New Consultation' ? chamber.feeNew : chamber.feeFollowUp
        // Extract numeric value from string like "৳800"
        const numericFee = parseInt(fee.replace(/[^\d]/g, '')) || 0
        estimatedFees += numericFee
      }
    })

    // Wait time estimate: Demo assumption of 15 minutes per patient in queue
    // This is a fictional estimate for demonstration purposes only
    const estimatedWaitMinutes = remainingQueue * 15

    return [
      {
        label: "Today's Appointments",
        value: totalAppointments.toString(),
        caption: cancelledAppointments > 0 ? `${cancelledAppointments} cancelled` : 'All scheduled',
        icon: '📅',
      },
      {
        label: 'Patients Checked In',
        value: checkedInAppointments.toString(),
        caption: totalAppointments > 0 ? `${Math.round((checkedInAppointments / totalAppointments) * 100)}% of scheduled` : 'No appointments',
        icon: '✅',
      },
      {
        label: 'Remaining Queue',
        value: remainingQueue.toString(),
        caption: `Demo estimate: ${estimatedWaitMinutes} min wait`,
        icon: '⏱️',
      },
      {
        label: 'Estimated Appointment Fees',
        value: `৳${estimatedFees.toLocaleString()}`,
        caption: `All non-cancelled appointments${activeChamber ? ` in ${activeChamber.name}` : ''}`,
        icon: '💰',
      },
    ]
  }, [filteredAppointments, activeChamber])

  // Queue: upcoming and checked-in only
  const queueAppointments = useMemo(() => {
    return filteredAppointments.filter(
      (apt) => apt.status === 'upcoming' || apt.status === 'checked-in'
    ).slice(0, 3)
  }, [filteredAppointments])

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            {greeting}, Doctor
          </h1>
          <p className="mt-1 text-text-secondary">
            {currentDate} • {activeChamber ? `${activeChamber.name} Overview` : 'Daily Chamber Overview'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <DashboardSummaryCard
              key={card.label}
              label={card.label}
              value={card.value}
              caption={card.caption}
              icon={card.icon}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <DashboardSectionHeader
              title="Today's Schedule"
              subtitle={`${filteredAppointments.length} appointments${activeChamber ? ` in ${activeChamber.name}` : ''}`}
              action={
                <Button variant="outline" size="sm" disabled>
                  View All
                </Button>
              }
            />
            {filteredAppointments.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">No appointments today</p>
                  {activeChamber && (
                    <p className="text-xs text-text-tertiary">
                      Select &quot;All Chambers&quot; to see appointments across all locations
                    </p>
                  )}
                </CardBody>
              </Card>
            ) : (
              <TodaySchedule appointments={filteredAppointments} />
            )}
          </div>

          {/* Queue Overview */}
          <div className="lg:col-span-1">
            <DashboardSectionHeader
              title="Queue Overview"
              subtitle={`Next ${queueAppointments.length} patients${activeChamber ? ` in ${activeChamber.name}` : ''}`}
            />
            {queueAppointments.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">No patients in queue</p>
                  <p className="text-xs text-text-tertiary">
                    Queue shows upcoming and checked-in patients
                  </p>
                </CardBody>
              </Card>
            ) : (
              <QueueOverview appointments={queueAppointments} />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardBody className="p-6">
            <DashboardSectionHeader
              title="Quick Actions"
              subtitle="Common chamber management tasks"
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="md" disabled>
                View Schedule
              </Button>
              <Button variant="secondary" size="md" disabled>
                Manage Chambers
              </Button>
              <Button variant="outline" size="md" disabled>
                View Reports
              </Button>
            </div>
            <p className="text-xs text-text-tertiary mt-3">
              * These features are not yet available in this prototype
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  )
}
