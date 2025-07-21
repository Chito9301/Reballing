"use client"

import { Trophy, Star, Award, Target, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type AchievementType = "first_post" | "viral_content" | "follower_milestone" | "challenge_winner" | "streak"

interface AchievementBadgeProps {
  type: AchievementType
  title: string
  description?: string
  size?: "sm" | "md" | "lg"
  unlocked?: boolean
}

export function AchievementBadge({ type, title, description, size = "md", unlocked = false }: AchievementBadgeProps) {
  const icons = {
    first_post: Star,
    viral_content: Zap,
    follower_milestone: Trophy,
    challenge_winner: Award,
    streak: Target,
  }

  const colors = {
    first_post: "from-blue-600 to-blue-800",
    viral_content: "from-purple-600 to-pink-600",
    follower_milestone: "from-yellow-600 to-orange-600",
    challenge_winner: "from-green-600 to-emerald-600",
    streak: "from-red-600 to-rose-600",
  }

  const Icon = icons[type]

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Badge
        className={`
          bg-gradient-to-r ${colors[type]}
          text-white border-none
          ${sizeClasses[size]}
          ${unlocked ? "" : "opacity-50 grayscale"}
        `}
      >
        <Icon className={`${iconSizes[size]} mr-1`} />
        {title}
      </Badge>
      {description && <p className="text-xs text-zinc-400 text-center max-w-20">{description}</p>}
    </div>
  )
}
