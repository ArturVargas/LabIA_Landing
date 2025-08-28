import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children: React.ReactNode
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const baseClasses = "font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
    
    const variantClasses = {
      primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl",
      accent: "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl",
      outline: "border-2 border-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
      secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
    }

    return (
      <Button
        ref={ref}
        size={size}
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
CTAButton.displayName = "CTAButton"

export { CTAButton }