import { useTheme } from 'next-themes'
import * as React from "react"
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',

            // Normal toast
        "--normal-bg": "var(--toast-bg, #fff)",
        "--normal-text": "var(--toast-text, #111827)",
        "--normal-border": "var(--toast-border, #d1d5db)",

        // Success toast
        "--success-bg": "var(--toast-success-bg, #22c55ee1)",
        "--success-text": "var(--toast-success-text, #fff)",
        "--success-border": "var(--toast-success-border, #22c55ee1)",

        // Error toast
        "--error-bg": "var(--toast-error-bg, #ef4444d8)",
        "--error-text": "var(--toast-error-text, #fff)",
        "--error-border": "var(--toast-error-border, #dc2626d8)",

        // Info toast
        "--info-bg": "var(--toast-info-bg, #3b82f6)",
        "--info-text": "var(--toast-info-text, #fff)",
        "--info-border": "var(--toast-info-border, #2563eb)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
