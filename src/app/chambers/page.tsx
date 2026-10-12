'use client'

import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import Card, { CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useListChambersQuery } from '@/lib/api'
import { useAccount } from '@/lib/account-context'
import type { ChamberResponse, Chamber } from '@/lib/types'

const ORGANIZATION_ID = process.env.NEXT_PUBLIC_ORGANIZATION_ID || '11111111-1111-1111-1111-111111111111'

// Transform backend response to frontend format
function transformChamber(chamber: ChamberResponse): Chamber {
  return {
    ...chamber,
    feeNew: `৳${chamber.feeNew}`,
    feeFollowUp: `৳${chamber.feeFollowUp}`,
  }
}

export default function ChambersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const { activeChamberId, setActiveChamberId, chambers, setChambers } = useAccount()

  // Fetch chambers from API
  const { data: apiChambers, isLoading, error, isError } = useListChambersQuery(ORGANIZATION_ID)

  // Update context when data changes
  useEffect(() => {
    if (apiChambers) {
      setChambers(apiChambers.map(transformChamber))
    }
  }, [apiChambers, setChambers])

  // Filter chambers based on search and status
  const filteredChambers = chambers.filter((chamber) => {
    // Status filter
    if (statusFilter !== 'all' && chamber.status !== statusFilter) return false

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        chamber.name.toLowerCase().includes(query) ||
        chamber.location.toLowerCase().includes(query) ||
        chamber.address.toLowerCase().includes(query)
      )
    }

    return true
  })

  const selectedChamberData = chambers.find((c) => c.id === activeChamberId)

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all'

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
  }

  const handleChamberSelect = (chamberId: string) => {
    setActiveChamberId(chamberId)
  }

  // Configuration state if organization ID is not set
  if (!process.env.NEXT_PUBLIC_ORGANIZATION_ID) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">
              Chambers
            </h1>
            <p className="mt-1 text-text-secondary">
              Manage your chamber locations and schedules
            </p>
          </div>

          <Card>
            <CardBody className="p-12 text-center">
              <p className="text-text-secondary mb-4">
                Organization ID not configured
              </p>
              <p className="text-sm text-text-tertiary mb-4">
                Please set the NEXT_PUBLIC_ORGANIZATION_ID environment variable to load chambers from the backend.
              </p>
              <code className="text-xs bg-surface p-2 rounded text-text-tertiary">
                NEXT_PUBLIC_ORGANIZATION_ID=your-organization-id
              </code>
            </CardBody>
          </Card>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Chambers</h1>
          <p className="mt-1 text-text-secondary">
            Manage your chamber locations and schedules
          </p>
        </div>

        {/* Error State */}
        {isError && (
          <Card>
            <CardBody className="p-6 border-l-4 border-red-500">
              <p className="text-text-primary font-medium mb-2">
                Failed to load chambers
              </p>
              <p className="text-sm text-text-secondary">
                {error instanceof Error
                  ? error.message
                  : "An error occurred while fetching chambers"}
              </p>
            </CardBody>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardBody className="p-12 text-center">
              <p className="text-text-secondary">Loading chambers...</p>
            </CardBody>
          </Card>
        )}

        {/* Content */}
        {!isLoading && !isError && (
          <>
            {/* Filters */}
            <Card>
              <CardBody className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search chambers by name or location..."
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      aria-label="Search chambers"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex-1">
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value as "all" | "active" | "inactive",
                        )
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      aria-label="Filter by status"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Chambers List */}
            {filteredChambers.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">No chambers found</p>
                  {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </CardBody>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chambers List */}
                <div className="space-y-4">
                  {filteredChambers.map((chamber) => (
                    <div
                      key={chamber.id}
                      onClick={() => handleChamberSelect(chamber.id)}
                      className={`cursor-pointer transition-colors ${
                        activeChamberId === chamber.id
                          ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "hover:border-border-strong"
                      }`}
                    >
                      <Card>
                        <CardBody className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">
                                {chamber.name}
                              </h3>
                              <p className="text-sm text-text-secondary truncate">
                                {chamber.location}
                              </p>
                            </div>
                            <Badge
                              variant={
                                chamber.status === "active"
                                  ? "success"
                                  : "neutral"
                              }
                              className="flex-shrink-0 ml-2"
                            >
                              {chamber.status === "active"
                                ? "Active"
                                : "Inactive"}
                            </Badge>
                          </div>
                          <div className="text-xs text-text-tertiary truncate">
                            {chamber.operatingDays.join(", ")} •{" "}
                            {chamber.openingHours} - {chamber.closingHours}
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Chamber Details Drawer */}
                {selectedChamberData && (
                  <Card>
                    <CardBody className="p-6 overflow-x-auto">
                      <div className="flex items-start justify-between mb-4">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl font-semibold text-text-primary mb-1 truncate">
                            {selectedChamberData.name}
                          </h2>
                          <p className="text-sm text-text-secondary truncate">
                            {selectedChamberData.location}
                          </p>
                          {activeChamberId === selectedChamberData.id && (
                            <Badge variant="info" className="mt-2">
                              Active Chamber
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveChamberId(null)}
                          aria-label="Close details"
                          className="flex-shrink-0"
                        >
                          ✕
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-text-tertiary mb-1">
                            Address
                          </p>
                          <p className="text-sm text-text-primary">
                            {selectedChamberData.address}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-text-tertiary mb-1">
                            Phone
                          </p>
                          <p className="text-sm text-text-primary">
                            {selectedChamberData.phone}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-text-tertiary mb-1">
                            Operating Days
                          </p>
                          <p className="text-sm text-text-primary">
                            {selectedChamberData.operatingDays.join(", ")}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-text-tertiary mb-1">
                            Hours
                          </p>
                          <p className="text-sm text-text-primary">
                            {selectedChamberData.openingHours} -{" "}
                            {selectedChamberData.closingHours}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-text-tertiary mb-1">
                              New Visit Fee
                            </p>
                            <p className="text-sm text-text-primary">
                              {selectedChamberData.feeNew}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-text-tertiary mb-1">
                              Follow-up Fee
                            </p>
                            <p className="text-sm text-text-primary">
                              {selectedChamberData.feeFollowUp}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-text-tertiary mb-1">
                            Status
                          </p>
                          <Badge
                            variant={
                              selectedChamberData.status === "active"
                                ? "success"
                                : "neutral"
                            }
                          >
                            {selectedChamberData.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border">
                        <p className="text-xs text-text-tertiary">
                          * Chamber creation, editing, and deletion require
                          backend integration.
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
