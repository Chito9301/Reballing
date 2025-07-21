"use client"

import { Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ViralBadgeProps {
  isViral?: boolean
  viralScore?: number
  size?: "sm" | "md" | "lg"
  showScore?: boolean
  className?: string
}

export function ViralBadge({
  isViral = false,
  viralScore = 0,
  size = "md",
  showScore = false,
  className = "",
}: ViralBadgeProps) {
  if (!isViral && viralScore < 70) return null

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
    <Badge
      className={`
        bg-gradient-to-r from-red-600 to-orange-600 
        hover:from-red-700 hover:to-orange-700
        text-white border-none
        animate-pulse
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <Flame className={`${iconSizes[size]} mr-1`} />
      VIRAL
      {showScore && viralScore > 0 && <span className="ml-1 font-bold">{viralScore}</span>}
    </Badge>
  )
}
