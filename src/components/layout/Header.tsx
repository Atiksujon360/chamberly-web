import type { ReactNode } from 'react'

interface HeaderProps {
  children?: ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1">
        {children}
      </div>
      <div className="flex items-center gap-4">
        {/* Demo Mode Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
            Demo Mode
          </span>
        </div>
      </div>
    </header>
  )
}
