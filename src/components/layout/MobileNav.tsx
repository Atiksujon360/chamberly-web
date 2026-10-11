'use client'

import { forwardRef } from 'react'

interface MobileNavProps {
  isOpen?: boolean
  onMenuClick: () => void
}

const MobileNav = forwardRef<HTMLButtonElement, MobileNavProps>(
  ({ isOpen = false, onMenuClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-surface-alt transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    )
  }
)

MobileNav.displayName = 'MobileNav'

export default MobileNav
