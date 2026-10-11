'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Chamber } from './types'

interface AccountContextType {
  activeChamberId: string | null
  setActiveChamberId: (chamberId: string | null) => void
  activeChamber: Chamber | null
  chambers: Chamber[]
  setChambers: (chambers: Chamber[]) => void
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export function AccountProvider({ children }: { children: ReactNode }) {
  const [activeChamberId, setActiveChamberId] = useState<string | null>(null)
  const [chambers, setChambers] = useState<Chamber[]>([])

  const activeChamber = chambers.find((c) => c.id === activeChamberId) || null

  return (
    <AccountContext.Provider
      value={{
        activeChamberId,
        setActiveChamberId,
        activeChamber,
        chambers,
        setChambers,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider')
  }
  return context
}
