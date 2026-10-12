'use client'

import { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNav from './MobileNav'

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (sidebarOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const focusableElements = sidebar.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    sidebar.addEventListener("keydown", handleTab);

    return () => {
      sidebar.removeEventListener("keydown", handleTab);
    };
  }, [sidebarOpen]);

  const handleClose = () => {
    setSidebarOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar ref={sidebarRef} isOpen={sidebarOpen} onClose={handleClose} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header>
          <MobileNav
            ref={menuButtonRef}
            isOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </Header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Demo Mode Indicator */}
            <div className="bg-warning-light border border-warning rounded-lg px-4 py-2 flex items-center gap-2">
              <span className="text-warning text-sm">⚠️</span>
              <p className="text-sm text-text-primary">
                <span className="font-medium">Demo Mode:</span> This experience
                uses synthetic data. Changes are local to this browser session
                and do not persist.
              </p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
