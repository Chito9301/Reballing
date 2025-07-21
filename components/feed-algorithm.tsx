"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Settings, TrendingUp, Users, Heart, Eye } from "lucide-react"

interface FeedPreferences {
  viralWeight: number
  followingWeight: number
  interestsWeight: number
  recencyWeight: number
  mutedUsers: string[]
  prioritizedCategories: string[]
}

interface FeedAlgorithmProps {
  onPreferencesChange: (preferences: FeedPreferences) => void
  currentPreferences: FeedPreferences
}

export function FeedAlgorithm({ onPreferencesChange, currentPreferences }: FeedAlgorithmProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [preferences, setPreferences] = useState<FeedPreferences>(currentPreferences)

  const handleWeightChange = (type: keyof FeedPreferences, value: number[]) => {
    const newPreferences = { ...preferences, [type]: value[0] }
    setPreferences(newPreferences)
    onPreferencesChange(newPreferences)
  }

  if (!isOpen) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)} className="text-zinc-400 hover:text-white">
        <Settings className="h-4 w-4 mr-2" />
        Personalizar Feed
      </Button>
    )
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-purple-500" />
            Personalización del Feed
          </span>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            ✕
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Algorithm Weights */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Prioridades del Algoritmo</h4>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-red-500" />
                  Contenido Viral
                </span>
                <span className="text-xs text-zinc-400">{preferences.viralWeight}%</span>
              </div>
              <Slider
                value={[preferences.viralWeight]}
                onValueChange={(value) => handleWeightChange("viralWeight", value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Usuarios que Sigues
                </span>
                <span className="text-xs text-zinc-400">{preferences.followingWeight}%</span>
              </div>
              <Slider
                value={[preferences.followingWeight]}
                onValueChange={(value) => handleWeightChange("followingWeight", value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-purple-500" />
                  Tus Intereses
                </span>
                <span className="text-xs text-zinc-400">{preferences.interestsWeight}%</span>
              </div>
              <Slider
                value={[preferences.interestsWeight]}
                onValueChange={(value) => handleWeightChange("interestsWeight", value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300 flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-green-500" />
                  Contenido Reciente
                </span>
                <span className="text-xs text-zinc-400">{preferences.recencyWeight}%</span>
              </div>
              <Slider
                value={[preferences.recencyWeight]}
                onValueChange={(value) => handleWeightChange("recencyWeight", value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Presets Rápidos</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPrefs = {
                  ...preferences,
                  viralWeight: 70,
                  followingWeight: 20,
                  interestsWeight: 10,
                  recencyWeight: 0,
                }
                setPreferences(newPrefs)
                onPreferencesChange(newPrefs)
              }}
              className="text-xs"
            >
              🔥 Viral
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPrefs = {
                  ...preferences,
                  viralWeight: 10,
                  followingWeight: 70,
                  interestsWeight: 10,
                  recencyWeight: 10,
                }
                setPreferences(newPrefs)
                onPreferencesChange(newPrefs)
              }}
              className="text-xs"
            >
              👥 Social
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPrefs = {
                  ...preferences,
                  viralWeight: 20,
                  followingWeight: 20,
                  interestsWeight: 20,
                  recencyWeight: 40,
                }
                setPreferences(newPrefs)
                onPreferencesChange(newPrefs)
              }}
              className="text-xs"
            >
              🕐 Reciente
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPrefs = {
                  ...preferences,
                  viralWeight: 25,
                  followingWeight: 25,
                  interestsWeight: 25,
                  recencyWeight: 25,
                }
                setPreferences(newPrefs)
                onPreferencesChange(newPrefs)
              }}
              className="text-xs"
            >
              ⚖️ Balanceado
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
