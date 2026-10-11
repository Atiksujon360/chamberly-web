'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from '@/lib/account-context'
import { chambers } from '@/lib/dashboard-data'

interface NavItem {
  label: string
  href: string
  icon?: string
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Patients', href: '/patients' },
  { label: 'Chambers', href: '/chambers' },
  { label: 'Prescriptions', href: '/prescriptions' },
  { label: 'Reports', href: '/reports' },
  { label: 'Settings', href: '/settings' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ isOpen = true, onClose }, ref) => {
    const pathname = usePathname()
    const { activeChamberId, setActiveChamberId } = useAccount()

    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        <aside
          ref={ref}
          id="mobile-sidebar"
          className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-30 transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:z-0`}
          aria-label="Main navigation"
        >
          <div className="flex flex-col h-full w-64">
            <div className="h-16 flex items-center px-6 border-b border-border">
              <h1 className="text-xl font-semibold text-primary">Chamberly</h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4" aria-label="Primary">
              <ul className="space-y-1 px-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-light text-primary'
                            : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="border-t border-border">
              {/* Active Chamber Selector */}
              <div className="p-4">
                <label
                  htmlFor="chamber-selector"
                  className="text-xs font-medium text-text-tertiary mb-2 block"
                >
                  Active Chamber
                </label>
                <select
                  id="chamber-selector"
                  value={activeChamberId || 'all'}
                  onChange={(e) => setActiveChamberId(e.target.value === 'all' ? null : e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Select active chamber"
                >
                  <option value="all">All Chambers</option>
                  {chambers.map((chamber) => (
                    <option key={chamber.id} value={chamber.id}>
                      {chamber.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Profile */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                    DR
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      Dr. Rahman
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      Cardiologist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </>
    )
  }
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
