'use client'

import Link from 'next/link'
import AppShell from '@/components/layout/AppShell'
import Card, { CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function PrescriptionsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Prescriptions
          </h1>
          <p className="mt-1 text-text-secondary">
            Manage patient prescriptions and medications
          </p>
        </div>

        {/* Placeholder Card */}
        <Card>
          <CardBody className="p-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-surface-alt rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">💊</span>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Prescription Management Coming Soon
              </h2>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                This feature will allow you to create, manage, and track patient prescriptions and medications. Currently, prescription records are not available in this demo.
              </p>
              <div className="space-y-3 text-sm text-text-tertiary max-w-md mx-auto">
                <p>• Create and edit prescriptions</p>
                <p>• Track medication history</p>
                <p>• Generate prescription summaries</p>
                <p>• Send prescriptions to pharmacies</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Link href="/appointments">
                <Button variant="primary" size="md">
                  View Appointments
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="md">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Info Card */}
        <Card>
          <CardBody className="p-4">
            <p className="text-xs text-text-tertiary">
              * Prescription management requires backend integration and clinical data models. This feature is planned for future releases.
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  )
}
