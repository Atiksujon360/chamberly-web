// Synthetic dashboard data for prototype
// This data is fictional and for demonstration purposes only
// It will be replaced with real API data in production

export interface Appointment {
  id: string
  date: string
  time: string
  patientName: string
  type: string
  status: 'upcoming' | 'checked-in' | 'completed' | 'cancelled'
  chamberId: string
  serialNumber?: number
  notes?: string
}

export interface Chamber {
  id: string
  name: string
  location: string
  address: string
  phone: string
  operatingDays: string[]
  openingHours: string
  closingHours: string
  feeNew: string
  feeFollowUp: string
  status: 'active' | 'inactive'
}

export interface Account {
  id: string
  name: string
  plan: 'free' | 'standard' | 'pro' | 'premium'
  doctorName: string
  doctorSpecialization: string
  status: 'trial' | 'active' | 'past-due' | 'cancelled'
}

export interface SummaryCard {
  label: string
  value: string
  caption: string
  icon: string
}

export const chambers: Chamber[] = [
  {
    id: 'chamber-1',
    name: 'Dhanmondi Chamber',
    location: 'Dhanmondi, Dhaka',
    address: 'House 12, Road 5, Dhanmondi R/A, Dhaka 1205',
    phone: '+880 1712-345678',
    operatingDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    openingHours: '09:00',
    closingHours: '14:00',
    feeNew: '৳800',
    feeFollowUp: '৳500',
    status: 'active',
  },
  {
    id: 'chamber-2',
    name: 'Uttara Chamber',
    location: 'Uttara, Dhaka',
    address: 'Plot 3, Sector 7, Uttara, Dhaka 1230',
    phone: '+880 1812-345678',
    operatingDays: ['Thursday', 'Friday'],
    openingHours: '16:00',
    closingHours: '21:00',
    feeNew: '৳1000',
    feeFollowUp: '৳600',
    status: 'active',
  },
  {
    id: 'chamber-3',
    name: 'Gulshan Chamber',
    location: 'Gulshan, Dhaka',
    address: 'Level 4, Gulshan Avenue 1, Gulshan 1, Dhaka 1212',
    phone: '+880 1912-345678',
    operatingDays: ['Saturday', 'Monday', 'Wednesday'],
    openingHours: '10:00',
    closingHours: '15:00',
    feeNew: '৳1200',
    feeFollowUp: '৳700',
    status: 'inactive',
  },
]

// Synthetic account data for prototype
export const currentAccount: Account = {
  id: 'account-1',
  name: 'Dr. Rahman\'s Practice',
  plan: 'standard',
  doctorName: 'Dr. Rahman',
  doctorSpecialization: 'Cardiologist',
  status: 'trial',
}

// Appointments across multiple days for the appointments page
export const allAppointments: Appointment[] = [
  // Today (using existing data)
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    patientName: 'Rahim Ahmed',
    type: 'Follow-up',
    status: 'completed',
    chamberId: 'chamber-1',
    serialNumber: 1,
  },
  {
    id: '2',
    date: new Date().toISOString().split('T')[0],
    time: '09:30',
    patientName: 'Fatima Begum',
    type: 'New Consultation',
    status: 'completed',
    chamberId: 'chamber-1',
    serialNumber: 2,
  },
  {
    id: '3',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    patientName: 'Karim Uddin',
    type: 'Follow-up',
    status: 'completed',
    chamberId: 'chamber-1',
    serialNumber: 3,
  },
  {
    id: '4',
    date: new Date().toISOString().split('T')[0],
    time: '10:30',
    patientName: 'Ayesha Khan',
    type: 'Check-up',
    status: 'checked-in',
    chamberId: 'chamber-1',
    serialNumber: 4,
  },
  {
    id: '5',
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    patientName: 'Jamal Hossain',
    type: 'Follow-up',
    status: 'upcoming',
    chamberId: 'chamber-1',
    serialNumber: 5,
  },
  {
    id: '6',
    date: new Date().toISOString().split('T')[0],
    time: '11:30',
    patientName: 'Nasreen Akter',
    type: 'New Consultation',
    status: 'upcoming',
    chamberId: 'chamber-2',
    serialNumber: 6,
  },
  {
    id: '7',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    patientName: 'Habib Rahman',
    type: 'Follow-up',
    status: 'upcoming',
    chamberId: 'chamber-1',
    serialNumber: 7,
  },
  {
    id: '8',
    date: new Date().toISOString().split('T')[0],
    time: '12:30',
    patientName: 'Salma Parveen',
    type: 'Check-up',
    status: 'cancelled',
    chamberId: 'chamber-3',
    serialNumber: 8,
  },
  // Tomorrow
  {
    id: '9',
    date: getRelativeDate(1),
    time: '09:00',
    patientName: 'Mohammad Ali',
    type: 'Follow-up',
    status: 'upcoming',
    chamberId: 'chamber-1',
    serialNumber: 1,
  },
  {
    id: '10',
    date: getRelativeDate(1),
    time: '09:30',
    patientName: 'Khadija Islam',
    type: 'New Consultation',
    status: 'upcoming',
    chamberId: 'chamber-2',
    serialNumber: 2,
  },
  {
    id: '11',
    date: getRelativeDate(1),
    time: '10:00',
    patientName: 'Abdul Karim',
    type: 'Check-up',
    status: 'upcoming',
    chamberId: 'chamber-3',
    serialNumber: 3,
  },
  {
    id: '12',
    date: getRelativeDate(1),
    time: '10:30',
    patientName: 'Roksana Begum',
    type: 'Follow-up',
    status: 'upcoming',
    chamberId: 'chamber-1',
    serialNumber: 4,
  },
  {
    id: '13',
    date: getRelativeDate(1),
    time: '11:00',
    patientName: 'Shafiq Ahmed',
    type: 'New Consultation',
    status: 'upcoming',
    chamberId: 'chamber-2',
    serialNumber: 5,
  },
  // Yesterday
  {
    id: '14',
    date: getRelativeDate(-1),
    time: '09:00',
    patientName: 'Tahmina Akter',
    type: 'Follow-up',
    status: 'completed',
    chamberId: 'chamber-1',
    serialNumber: 1,
  },
  {
    id: '15',
    date: getRelativeDate(-1),
    time: '09:30',
    patientName: 'Mominul Haque',
    type: 'Check-up',
    status: 'completed',
    chamberId: 'chamber-2',
    serialNumber: 2,
  },
  {
    id: '16',
    date: getRelativeDate(-1),
    time: '10:00',
    patientName: 'Zainab Begum',
    type: 'Follow-up',
    status: 'cancelled',
    chamberId: 'chamber-3',
    serialNumber: 3,
  },
]

// Helper function to get relative date string
function getRelativeDate(daysOffset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split('T')[0]
}

// Client-side helper functions for date/time formatting
// These must only be called from client components
export const getCurrentDate = (): string => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return now.toLocaleDateString('en-US', options)
}

export const getCurrentGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

export const getRelativeDateString = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return formatDate(dateString)
}
