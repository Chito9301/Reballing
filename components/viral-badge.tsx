import { Flame, TrendingUp, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ViralBadgeProps {
  type: "viral" | "trending" | "featured"
  className?: string
}

export function ViralBadge({ type, className }: ViralBadgeProps) {
  const config = {
    viral: {
      icon: Flame,
      text: "VIRAL",
      className: "bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse",
    },
    trending: {
      icon: TrendingUp,
      text: "TRENDING",
      className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    },
    featured: {
      icon: Star,
      text: "DESTACADO",
      className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    },
  }

  const { icon: Icon, text, className: badgeClassName } = config[type]

  return (
    <Badge className={cn("flex items-center gap-1 text-xs font-bold", badgeClassName, className)}>
      <Icon className="h-3 w-3" />
      {text}
    </Badge>
  )
}
