'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import Card, { CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { currentAccount, chambers } from '@/lib/dashboard-data'
import { useAccount } from '@/lib/account-context'

type Tab = 'profile' | 'organization' | 'chambers' | 'notifications' | 'account'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const { activeChamber } = useAccount()

  const handleSave = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Doctor Profile' },
    { id: 'organization', label: 'Organization' },
    { id: 'chambers', label: 'Chamber Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'account', label: 'Account' },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Settings
          </h1>
          <p className="mt-1 text-text-secondary">
            Manage your profile, organization, and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <Card>
          <CardBody className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Doctor Profile
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentAccount.doctorName}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        defaultValue={currentAccount.doctorSpecialization}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      />
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="md" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === 'organization' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Organization Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentAccount.name}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Plan
                      </label>
                      <input
                        type="text"
                        defaultValue={currentAccount.plan}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-secondary bg-surface-alt focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Status
                      </label>
                      <input
                        type="text"
                        defaultValue={currentAccount.status}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-secondary bg-surface-alt focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="md" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === 'chambers' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Chamber Preferences
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Default Chamber Preference
                      </label>
                      <select
                        defaultValue={activeChamber?.id || ''}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <option value="">Select a chamber</option>
                        {chambers.map((chamber) => (
                          <option key={chamber.id} value={chamber.id}>
                            {chamber.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-text-tertiary mt-1">
                        Note: This is a preference setting. The currently active chamber is selected from the sidebar.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Default Appointment Duration
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                        <option>15 minutes</option>
                        <option selected>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="md" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          Appointment Reminders
                        </p>
                        <p className="text-xs text-text-secondary">
                          Receive reminders before appointments
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          Daily Schedule Summary
                        </p>
                        <p className="text-xs text-text-secondary">
                          Receive daily schedule overview
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          Cancellation Alerts
                        </p>
                        <p className="text-xs text-text-secondary">
                          Get notified when appointments are cancelled
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="md" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Account Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="doctor.rahman@chamberly.demo"
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-secondary bg-surface-alt focus:outline-none"
                      />
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-text-secondary mb-4">
                        Password changes require backend integration and are not available in demo mode.
                      </p>
                      <Button variant="outline" size="md" disabled>
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {showSaveSuccess && (
              <div className="fixed bottom-4 right-4 bg-success text-white px-4 py-2 rounded-lg shadow-lg">
                Settings saved successfully
              </div>
            )}
          </CardBody>
        </Card>

        {/* Demo Notice */}
        <Card>
          <CardBody className="p-4">
            <p className="text-xs text-text-tertiary">
              * Settings changes are local to this browser session and will reset on refresh. Persistence requires backend integration.
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  )
}
