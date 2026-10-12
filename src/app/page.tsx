'use client'

import { useMemo } from 'react'
import Link from "next/link";
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
  const greeting = getCurrentGreeting();
  const currentDate = getCurrentDate();
  const { activeChamberId, activeChamber } = useAccount();
  const todayString = new Date().toISOString().split("T")[0];

  // Filter appointments based on active chamber
  const todayAppointments = useMemo(() => {
    return allAppointments.filter((apt) => apt.date === todayString);
  }, [todayString]);

  const filteredAppointments = useMemo(() => {
    if (!activeChamberId) return todayAppointments;
    return todayAppointments.filter((apt) => apt.chamberId === activeChamberId);
  }, [todayAppointments, activeChamberId]);

  // Calculate dynamic summary metrics
  const summaryCards = useMemo(() => {
    const totalAppointments = filteredAppointments.length;
    const cancelledAppointments = filteredAppointments.filter(
      (apt) => apt.status === "cancelled",
    ).length;
    const checkedInAppointments = filteredAppointments.filter(
      (apt) => apt.status === "checked-in",
    ).length;
    const upcomingAppointments = filteredAppointments.filter(
      (apt) => apt.status === "upcoming",
    ).length;

    // Remaining queue: upcoming + checked-in (excluding completed and cancelled)
    const remainingQueue = upcomingAppointments + checkedInAppointments;

    // Calculate estimated appointment fees (fictional calculation based on chamber fees)
    // Definition: Sum of fees for all non-cancelled appointments (upcoming, checked-in, completed)
    // This is NOT collected revenue - it's the potential value of scheduled appointments
    let estimatedFees = 0;
    filteredAppointments.forEach((apt) => {
      const chamber = chambers.find((c) => c.id === apt.chamberId);
      if (chamber && apt.status !== "cancelled") {
        const fee =
          apt.type === "New Consultation"
            ? chamber.feeNew
            : chamber.feeFollowUp;
        // Extract numeric value from string like "৳800"
        const numericFee = parseInt(fee.replace(/[^\d]/g, "")) || 0;
        estimatedFees += numericFee;
      }
    });

    // Wait time estimate: Demo assumption of 15 minutes per patient in queue
    // This is a fictional estimate for demonstration purposes only
    const estimatedWaitMinutes = remainingQueue * 15;

    return [
      {
        label: "Today's Appointments",
        value: totalAppointments.toString(),
        caption:
          cancelledAppointments > 0
            ? `${cancelledAppointments} cancelled`
            : "All scheduled",
        icon: "📅",
      },
      {
        label: "Patients Checked In",
        value: checkedInAppointments.toString(),
        caption:
          totalAppointments > 0
            ? `${Math.round((checkedInAppointments / totalAppointments) * 100)}% of scheduled`
            : "No appointments",
        icon: "✅",
      },
      {
        label: "Remaining Queue",
        value: remainingQueue.toString(),
        caption: `Demo estimate: ${estimatedWaitMinutes} min wait`,
        icon: "⏱️",
      },
      {
        label: "Estimated Appointment Fees",
        value: `৳${estimatedFees.toLocaleString()}`,
        caption: `All non-cancelled appointments${activeChamber ? ` in ${activeChamber.name}` : ""}`,
        icon: "💰",
      },
    ];
  }, [filteredAppointments, activeChamber]);

  // Extract metrics for operational insights
  const operationalMetrics = useMemo(() => {
    const totalAppointments = filteredAppointments.length;
    const cancelledAppointments = filteredAppointments.filter(
      (apt) => apt.status === "cancelled",
    ).length;
    const checkedInAppointments = filteredAppointments.filter(
      (apt) => apt.status === "checked-in",
    ).length;
    const upcomingAppointments = filteredAppointments.filter(
      (apt) => apt.status === "upcoming",
    ).length;
    const remainingQueue = upcomingAppointments + checkedInAppointments;
    const estimatedWaitMinutes = remainingQueue * 15;

    return {
      totalAppointments,
      cancelledAppointments,
      checkedInAppointments,
      upcomingAppointments,
      remainingQueue,
      estimatedWaitMinutes,
    };
  }, [filteredAppointments]);

  // Queue: upcoming and checked-in only
  const queueAppointments = useMemo(() => {
    return filteredAppointments
      .filter((apt) => apt.status === "upcoming" || apt.status === "checked-in")
      .slice(0, 3);
  }, [filteredAppointments]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            {greeting}, Doctor
          </h1>
          <p className="mt-1 text-text-secondary">
            {currentDate} •{" "}
            {activeChamber
              ? `${activeChamber.name} Overview`
              : "Daily Chamber Overview"}
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
              subtitle={`${filteredAppointments.length} appointments${activeChamber ? ` in ${activeChamber.name}` : ""}`}
              action={
                <Button variant="outline" size="sm" disabled>
                  View All
                </Button>
              }
            />
            {filteredAppointments.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">
                    No appointments today
                  </p>
                  {activeChamber && (
                    <p className="text-xs text-text-tertiary">
                      Select &quot;All Chambers&quot; to see appointments across
                      all locations
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
              subtitle={`Next ${queueAppointments.length} patients${activeChamber ? ` in ${activeChamber.name}` : ""}`}
            />
            {queueAppointments.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">
                    No patients in queue
                  </p>
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
              <Link href="/appointments">
                <Button variant="primary" size="md">
                  View Schedule
                </Button>
              </Link>
              <Link href="/chambers">
                <Button variant="secondary" size="md">
                  Manage Chambers
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="outline" size="md">
                  View Reports
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Operational Insights */}
        <Card>
          <CardBody className="p-6">
            <DashboardSectionHeader
              title="Operational Insights"
              subtitle="Schedule optimization recommendations (demo)"
            />
            <div className="space-y-3">
              {operationalMetrics.remainingQueue > 0 && (
                <div className="p-3 bg-surface-alt border border-border rounded-lg">
                  <p className="text-sm font-medium text-text-primary mb-1">
                    📋 Queue Management
                  </p>
                  <p className="text-xs text-text-secondary">
                    {operationalMetrics.remainingQueue} patients in queue.
                    Estimated wait time:{" "}
                    {operationalMetrics.estimatedWaitMinutes} minutes based on
                    demo assumption of 15 minutes per patient.
                  </p>
                </div>
              )}
              {operationalMetrics.checkedInAppointments > 0 &&
                operationalMetrics.upcomingAppointments > 0 && (
                  <div className="p-3 bg-surface-alt border border-border rounded-lg">
                    <p className="text-sm font-medium text-text-primary mb-1">
                      ⏰ Efficient Check-ins
                    </p>
                    <p className="text-xs text-text-secondary">
                      {operationalMetrics.checkedInAppointments} patients
                      checked in. Consider calling the next{" "}
                      {Math.min(3, operationalMetrics.upcomingAppointments)}{" "}
                      upcoming patients to maintain flow.
                    </p>
                  </div>
                )}
              {operationalMetrics.cancelledAppointments > 0 && (
                <div className="p-3 bg-surface-alt border border-border rounded-lg">
                  <p className="text-sm font-medium text-text-primary mb-1">
                    📊 Cancellation Tracking
                  </p>
                  <p className="text-xs text-text-secondary">
                    {operationalMetrics.cancelledAppointments} appointment
                    {operationalMetrics.cancelledAppointments !== 1
                      ? "s"
                      : ""}{" "}
                    cancelled today. Review patterns to optimize scheduling.
                  </p>
                </div>
              )}
              {operationalMetrics.totalAppointments === 0 && (
                <div className="p-3 bg-surface-alt border border-border rounded-lg">
                  <p className="text-sm font-medium text-text-primary mb-1">
                    📅 Schedule Availability
                  </p>
                  <p className="text-xs text-text-secondary">
                    No appointments scheduled today. This is a good opportunity
                    to review chamber schedules or add walk-in availability.
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-text-tertiary mt-3">
              * These insights are based on synthetic data and are for
              demonstration purposes only.
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
