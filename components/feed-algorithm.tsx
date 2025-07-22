"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Settings, TrendingUp, Users, Clock, Zap } from "lucide-react"

interface AlgorithmSettings {
  viralWeight: number
  followingWeight: number
  interestWeight: number
  recentWeight: number
  preset: string
}

interface FeedAlgorithmProps {
  onSettingsChange: (settings: AlgorithmSettings) => void
  currentSettings: AlgorithmSettings
}

export function FeedAlgorithm({ onSettingsChange, currentSettings }: FeedAlgorithmProps) {
  const [settings, setSettings] = useState<AlgorithmSettings>(currentSettings)

  const presets = [
    {
      id: "viral",
      name: "Viral",
      description: "Prioriza contenido con más interacciones",
      icon: TrendingUp,
      settings: { viralWeight: 80, followingWeight: 10, interestWeight: 5, recentWeight: 5, preset: "viral" },
    },
    {
      id: "social",
      name: "Social",
      description: "Enfoque en usuarios que sigues",
      icon: Users,
      settings: { viralWeight: 20, followingWeight: 60, interestWeight: 15, recentWeight: 5, preset: "social" },
    },
    {
      id: "recent",
      name: "Reciente",
      description: "Contenido más nuevo primero",
      icon: Clock,
      settings: { viralWeight: 10, followingWeight: 20, interestWeight: 10, recentWeight: 60, preset: "recent" },
    },
    {
      id: "balanced",
      name: "Balanceado",
      description: "Mezcla equilibrada de todo",
      icon: Zap,
      settings: { viralWeight: 25, followingWeight: 25, interestWeight: 25, recentWeight: 25, preset: "balanced" },
    },
  ]

  const applyPreset = (presetSettings: AlgorithmSettings) => {
    setSettings(presetSettings)
    onSettingsChange(presetSettings)
  }

  const updateWeight = (key: keyof AlgorithmSettings, value: number) => {
    const newSettings = { ...settings, [key]: value, preset: "custom" }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Settings className="h-5 w-5" />
            Personalizar Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Presets */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Configuraciones Rápidas</h3>
            <RadioGroup
              value={settings.preset}
              onValueChange={(value) => {
                const preset = presets.find((p) => p.id === value)
                if (preset) applyPreset(preset.settings)
              }}
              className="grid grid-cols-2 gap-3"
            >
              {presets.map((preset) => (
                <div key={preset.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={preset.id} id={preset.id} />
                  <Label
                    htmlFor={preset.id}
                    className="flex items-center gap-2 cursor-pointer text-white hover:text-purple-400"
                  >
                    <preset.icon className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">{preset.name}</p>
                      <p className="text-xs text-zinc-400">{preset.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Custom Weights */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Ajustes Personalizados</h3>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  Contenido Viral
                </Label>
                <Badge variant="secondary" className="bg-zinc-800 text-white">
                  {settings.viralWeight}%
                </Badge>
              </div>
              <Slider
                value={[settings.viralWeight]}
                onValueChange={([value]) => updateWeight("viralWeight", value)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  Usuarios que Sigues
                </Label>
                <Badge variant="secondary" className="bg-zinc-800 text-white">
                  {settings.followingWeight}%
                </Badge>
              </div>
              <Slider
                value={[settings.followingWeight]}
                onValueChange={([value]) => updateWeight("followingWeight", value)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-pink-500" />
                  Tus Intereses
                </Label>
                <Badge variant="secondary" className="bg-zinc-800 text-white">
                  {settings.interestWeight}%
                </Badge>
              </div>
              <Slider
                value={[settings.interestWeight]}
                onValueChange={([value]) => updateWeight("interestWeight", value)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm text-white flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Contenido Reciente
                </Label>
                <Badge variant="secondary" className="bg-zinc-800 text-white">
                  {settings.recentWeight}%
                </Badge>
              </div>
              <Slider
                value={[settings.recentWeight]}
                onValueChange={([value]) => updateWeight("recentWeight", value)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Total Check */}
          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Total:</span>
              <Badge
                variant={
                  settings.viralWeight + settings.followingWeight + settings.interestWeight + settings.recentWeight ===
                  100
                    ? "default"
                    : "destructive"
                }
                className={
                  settings.viralWeight + settings.followingWeight + settings.interestWeight + settings.recentWeight ===
                  100
                    ? "bg-green-600"
                    : "bg-red-600"
                }
              >
                {settings.viralWeight + settings.followingWeight + settings.interestWeight + settings.recentWeight}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
