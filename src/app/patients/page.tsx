'use client'

import { useState, useMemo } from 'react'
import AppShell from '@/components/layout/AppShell'
import Card, { CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { patients } from '@/lib/patient-data'
import { formatDate, getRelativeDateString } from '@/lib/dashboard-data'
import type { Patient } from '@/lib/patient-data'

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  // Filter patients
  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients
    const query = searchQuery.toLowerCase()
    return patients.filter((patient) => patient.name.toLowerCase().includes(query))
  }, [searchQuery])

  const totalPatients = patients.length
  const totalAppointments = patients.reduce((sum, p) => sum + p.totalAppointments, 0)
  const upcomingAppointments = patients.reduce((sum, p) => sum + p.upcomingAppointments, 0)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Patients
          </h1>
          <p className="mt-1 text-text-secondary">
            Patient directory and appointment history
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Total Patients</p>
              <p className="text-2xl font-semibold text-text-primary">{totalPatients}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Total Appointments</p>
              <p className="text-2xl font-semibold text-text-primary">{totalAppointments}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-xs text-text-tertiary mb-1">Upcoming Appointments</p>
              <p className="text-2xl font-semibold text-text-primary">{upcomingAppointments}</p>
            </CardBody>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardBody className="p-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients by name..."
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Search patients"
            />
          </CardBody>
        </Card>

        {/* Patients List */}
        {filteredPatients.length === 0 ? (
          <Card>
            <CardBody className="p-12 text-center">
              <p className="text-text-secondary mb-2">No patients found</p>
              {searchQuery && (
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              )}
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patients List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'hover:border-border-strong'
                  }`}
                >
                  <Card>
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">
                            {patient.name}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            {patient.totalAppointments} appointment{patient.totalAppointments !== 1 ? 's' : ''}
                          </p>
                        </div>
                        {patient.upcomingAppointments > 0 && (
                          <Badge variant="info" className="ml-2 flex-shrink-0">
                            {patient.upcomingAppointments} upcoming
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-text-tertiary mt-2">
                        Last visit: {getRelativeDateString(patient.lastAppointmentDate)}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>

            {/* Patient Details Drawer */}
            {selectedPatient && (
              <Card>
                <CardBody className="p-6 overflow-x-auto">
                  <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-semibold text-text-primary mb-1 truncate">
                        {selectedPatient.name}
                      </h2>
                      <p className="text-sm text-text-secondary">
                        Patient Record
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPatient(null)}
                      aria-label="Close details"
                      className="flex-shrink-0"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-medium text-text-tertiary mb-1">
                        Total Appointments
                      </p>
                      <p className="text-sm text-text-primary">
                        {selectedPatient.totalAppointments}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-tertiary mb-1">
                        Upcoming Appointments
                      </p>
                      <p className="text-sm text-text-primary">
                        {selectedPatient.upcomingAppointments}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-tertiary mb-1">
                        First Appointment
                      </p>
                      <p className="text-sm text-text-primary">
                        {formatDate(selectedPatient.firstAppointmentDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-tertiary mb-1">
                        Last Appointment
                      </p>
                      <p className="text-sm text-text-primary">
                        {formatDate(selectedPatient.lastAppointmentDate)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">
                      Appointment History
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedPatient.appointmentHistory.map((apt, index) => (
                        <div
                          key={index}
                          className="p-3 bg-surface-alt rounded-lg min-w-0"
                        >
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {apt.type}
                            </p>
                            <Badge
                              variant={
                                apt.status === 'completed'
                                  ? 'success'
                                  : apt.status === 'cancelled'
                                  ? 'neutral'
                                  : apt.status === 'checked-in'
                                  ? 'info'
                                  : 'neutral'
                              }
                              className="flex-shrink-0 ml-2"
                            >
                              {apt.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-text-secondary">
                            {getRelativeDateString(apt.date)} at {apt.time}
                          </p>
                          <p className="text-xs text-text-tertiary truncate">
                            {apt.chamber}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {/* Demo Notice */}
        <Card>
          <CardBody className="p-4">
            <p className="text-xs text-text-tertiary">
              * This patient directory is derived from synthetic appointment data for demonstration purposes only. Patient records are not persisted.
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  )
}
