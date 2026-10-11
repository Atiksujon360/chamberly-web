import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'error'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  isLoading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background',
  outline: 'border border-border-strong text-text-primary hover:bg-surface-alt focus:ring-2 focus:ring-border-strong focus:ring-offset-2 focus:ring-offset-background',
  ghost: 'text-text-primary hover:bg-surface-alt focus:ring-2 focus:ring-border focus:ring-offset-2 focus:ring-offset-background',
  error: 'bg-error text-white hover:bg-error-dark focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-background',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  )
}
