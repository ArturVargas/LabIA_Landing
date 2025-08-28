import { Heart } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center">
        <Heart className="w-5 h-5 text-white fill-white" />
      </div>
      <span className="text-xl font-bold text-gradient"></span>
    </div>
  )
}