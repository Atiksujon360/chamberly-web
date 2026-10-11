// Backend API response types
// These match the Spring Boot DTOs

export interface ChamberResponse {
  id: string
  organizationId: string
  name: string
  location: string
  address: string
  phone: string
  operatingDays: string[]
  openingHours: string
  closingHours: string
  feeNew: number
  feeFollowUp: number
  status: string
  createdAt: string
  updatedAt: string
}

// Frontend chamber type with formatted fees
export interface Chamber {
  id: string
  organizationId: string
  name: string
  location: string
  address: string
  phone: string
  operatingDays: string[]
  openingHours: string
  closingHours: string
  feeNew: string
  feeFollowUp: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface ApiError {
  code: string
  message: string
  status: number
  path: string
  timestamp: string
  fieldErrors?: Array<{
    field: string
    message: string
  }>
}
