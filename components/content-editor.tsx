"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sliders, Eye, Sparkles } from "lucide-react"

interface ContentEditorProps {
  mediaUrl: string
  mediaType: "image" | "video"
  onSave: (filters: FilterSettings) => void
}

interface FilterSettings {
  brightness: number
  contrast: number
  saturation: number
  filter: string
}

export function ContentEditor({ mediaUrl, mediaType, onSave }: ContentEditorProps) {
  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    filter: "none",
  })

  const [activeTab, setActiveTab] = useState("filters")

  const presetFilters = [
    { name: "Original", filter: "none", brightness: 100, contrast: 100, saturation: 100 },
    { name: "Vintage", filter: "sepia(0.5)", brightness: 110, contrast: 120, saturation: 80 },
    { name: "B&W", filter: "grayscale(1)", brightness: 105, contrast: 110, saturation: 0 },
    { name: "Dramático", filter: "contrast(1.3)", brightness: 95, contrast: 130, saturation: 120 },
    { name: "Suave", filter: "blur(0.5px)", brightness: 105, contrast: 95, saturation: 110 },
    { name: "Vibrante", filter: "saturate(1.5)", brightness: 100, contrast: 105, saturation: 150 },
  ]

  const applyPreset = (preset: (typeof presetFilters)[0]) => {
    setFilters({
      brightness: preset.brightness,
      contrast: preset.contrast,
      saturation: preset.saturation,
      filter: preset.filter,
    })
  }

  const getFilterStyle = () => ({
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) ${filters.filter}`,
  })

  return (
    <div className="space-y-4">
      {/* Preview */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="h-5 w-5" />
            Vista Previa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {mediaType === "image" ? (
              <img
                src={mediaUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover"
                style={getFilterStyle()}
              />
            ) : (
              <video src={mediaUrl} className="w-full h-full object-cover" style={getFilterStyle()} controls muted />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor Controls */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-zinc-800">
              <TabsTrigger value="filters" className="flex-1 data-[state=active]:bg-purple-600">
                <Sparkles className="h-4 w-4 mr-2" />
                Filtros
              </TabsTrigger>
              <TabsTrigger value="adjust" className="flex-1 data-[state=active]:bg-purple-600">
                <Sliders className="h-4 w-4 mr-2" />
                Ajustes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {presetFilters.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="border-zinc-700 hover:bg-purple-600/20"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="adjust" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Brillo: {filters.brightness}%</label>
                  <Slider
                    value={[filters.brightness]}
                    onValueChange={([value]) => setFilters({ ...filters, brightness: value })}
                    min={50}
                    max={150}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Contraste: {filters.contrast}%</label>
                  <Slider
                    value={[filters.contrast]}
                    onValueChange={([value]) => setFilters({ ...filters, contrast: value })}
                    min={50}
                    max={150}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Saturación: {filters.saturation}%</label>
                  <Slider
                    value={[filters.saturation]}
                    onValueChange={([value]) => setFilters({ ...filters, saturation: value })}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              className="flex-1 border-zinc-700 bg-transparent"
              onClick={() => applyPreset(presetFilters[0])}
            >
              Restablecer
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => onSave(filters)}
            >
              Aplicar Cambios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
