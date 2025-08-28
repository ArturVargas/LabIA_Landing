import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TestimonialProps {
  content: string
  author: string
  rating?: number
  className?: string
}

export function TestimonialCard({ content, author, rating = 5, className }: TestimonialProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-foreground mb-4 leading-relaxed">&quot;{content}&quot;</p>
        <p className="text-sm text-muted-foreground font-semibold">— {author}</p>
      </CardContent>
    </Card>
  )
}