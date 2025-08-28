import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn("group hover:shadow-lg transition-shadow duration-200", className)}>
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 gradient-brand rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}