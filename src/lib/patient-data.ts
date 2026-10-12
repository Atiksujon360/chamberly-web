// Synthetic patient data derived from appointment records
// This data is fictional and for demonstration purposes only
// It will be replaced with real API data in production

import { allAppointments, chambers } from './dashboard-data'

export interface Patient {
  id: string
  name: string
  firstAppointmentDate: string
  lastAppointmentDate: string
  totalAppointments: number
  upcomingAppointments: number
  appointmentHistory: {
    date: string
    time: string
    chamber: string
    type: string
    status: string
  }[]
}

// Derive patient data from existing appointments
export const patients: Patient[] = (() => {
  const patientMap = new Map<string, Patient>()

  allAppointments.forEach((apt) => {
    // Use lowercase name as key to prevent duplicates from case variations
    const nameKey = apt.patientName.toLowerCase()
    if (!patientMap.has(nameKey)) {
      patientMap.set(nameKey, {
        id: `patient-${nameKey.replace(/\s+/g, '-')}`,
        name: apt.patientName, // Preserve original casing for display
        firstAppointmentDate: apt.date,
        lastAppointmentDate: apt.date,
        totalAppointments: 1,
        upcomingAppointments: apt.status === 'upcoming' ? 1 : 0,
        appointmentHistory: [
          {
            date: apt.date,
            time: apt.time,
            chamber: chambers.find((c) => c.id === apt.chamberId)?.name || 'Unknown',
            type: apt.type,
            status: apt.status,
          },
        ],
      })
    } else {
      const patient = patientMap.get(nameKey)!
      patient.totalAppointments += 1
      if (apt.status === 'upcoming') {
        patient.upcomingAppointments += 1
      }
      if (apt.date < patient.firstAppointmentDate) {
        patient.firstAppointmentDate = apt.date
      }
      if (apt.date > patient.lastAppointmentDate) {
        patient.lastAppointmentDate = apt.date
      }
      patient.appointmentHistory.push({
        date: apt.date,
        time: apt.time,
        chamber: chambers.find((c) => c.id === apt.chamberId)?.name || 'Unknown',
        type: apt.type,
        status: apt.status,
      })
    }
  })

  // Sort appointment history by date descending
  patientMap.forEach((patient) => {
    patient.appointmentHistory.sort((a, b) => b.date.localeCompare(a.date))
  })

  return Array.from(patientMap.values()).sort((a, b) => a.name.localeCompare(b.name))
})()
