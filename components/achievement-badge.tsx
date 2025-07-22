import { Trophy, Star, Target, Zap, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AchievementBadgeProps {
  type: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  achievement: string
  unlocked?: boolean
  className?: string
}

export function AchievementBadge({ type, achievement, unlocked = false, className }: AchievementBadgeProps) {
  const config = {
    bronze: {
      icon: Target,
      className: unlocked ? "bg-amber-600 text-white" : "bg-zinc-700 text-zinc-400",
    },
    silver: {
      icon: Star,
      className: unlocked ? "bg-gray-400 text-white" : "bg-zinc-700 text-zinc-400",
    },
    gold: {
      icon: Trophy,
      className: unlocked ? "bg-yellow-500 text-white" : "bg-zinc-700 text-zinc-400",
    },
    platinum: {
      icon: Zap,
      className: unlocked ? "bg-purple-600 text-white" : "bg-zinc-700 text-zinc-400",
    },
    diamond: {
      icon: Crown,
      className: unlocked ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-zinc-700 text-zinc-400",
    },
  }

  const { icon: Icon, className: badgeClassName } = config[type]

  return (
    <Badge className={cn("flex items-center gap-1 text-xs", badgeClassName, className)}>
      <Icon className="h-3 w-3" />
      {achievement}
    </Badge>
  )
}
