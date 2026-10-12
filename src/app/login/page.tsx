'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card, { CardBody } from '@/components/ui/Card'
import { useLoginMutation } from '@/lib/api'
import type { LoginRequest } from '@/lib/types'

export default function LoginPage() {
  const router = useRouter()
  const [login, { isLoading, error }] = useLoginMutation()
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {}

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 1) {
      errors.password = 'Password cannot be empty'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)

    if (!validateForm()) {
      return
    }

    try {
      await login(formData).unwrap()
      // On successful login, redirect to dashboard
      router.push('/')
    } catch (err) {
      // Error is handled by the error state
      console.error('Login failed:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Generic error message from backend
  const apiError = error as { data?: { message?: string } } | undefined
  const errorMessage = apiError?.data?.message || (submitAttempted && Object.keys(fieldErrors).length > 0 ? 'Please fix the errors above' : '')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-text-primary mb-2">Chamberly</h1>
          <p className="text-text-secondary">
            Modern practice management for independent doctors&apos; chambers in Bangladesh
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardBody className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-text-primary mb-1">Sign In</h2>
              <p className="text-text-secondary text-sm">
                Enter your credentials to access your chamber
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors ${
                    fieldErrors.email
                      ? 'border-error focus:ring-error'
                      : 'border-border focus:border-primary'
                  }`}
                  placeholder="doctor@example.com"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-error" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 pr-12 rounded-lg border text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors ${
                      fieldErrors.password
                        ? 'border-error focus:ring-error'
                        : 'border-border focus:border-primary'
                    }`}
                    placeholder="••••••••"
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p id="password-error" className="mt-1.5 text-sm text-error" role="alert">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* API Error Message */}
              {errorMessage && !isLoading && (
                <div className="p-3 bg-error-light border border-error rounded-lg">
                  <p className="text-sm text-error" role="alert">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Notice */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-text-tertiary text-center">
                Note: This is a demo environment. For testing, use credentials configured in your backend database.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-text-tertiary">
          <p>© 2026 Chamberly. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
