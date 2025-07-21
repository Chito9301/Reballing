"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Video, Type, X, Check } from "lucide-react"
import Image from "next/image"

interface ContentEditorProps {
  onSave: (content: any) => void
  onCancel: () => void
}

export function ContentEditor({ onSave, onCancel }: ContentEditorProps) {
  const [contentType, setContentType] = useState<"video" | "image" | "text">("image")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview(event.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }

  const handleSave = () => {
    onSave({
      type: contentType,
      title,
      description,
      file,
      filters: contentType === "image" ? filters : undefined,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Editor de Contenido</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content Type Selector */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex gap-2">
            <Button
              variant={contentType === "image" ? "default" : "outline"}
              size="sm"
              onClick={() => setContentType("image")}
              className={contentType === "image" ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <Camera className="h-4 w-4 mr-2" />
              Foto
            </Button>
            <Button
              variant={contentType === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setContentType("video")}
              className={contentType === "video" ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button
              variant={contentType === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => setContentType("text")}
              className={contentType === "text" ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <Type className="h-4 w-4 mr-2" />
              Texto
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {contentType !== "text" && (
            <div className="mb-4">
              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={contentType === "video" ? "video/*" : "image/*"}
                    className="hidden"
                  />
                  {contentType === "image" ? (
                    <Camera className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                  ) : (
                    <Video className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                  )}
                  <p className="text-zinc-400">
                    Haz clic para seleccionar {contentType === "image" ? "una foto" : "un video"}
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {preview && contentType === "image" && (
                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain"
                        style={{
                          filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`,
                        }}
                      />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/60"
                    onClick={() => {
                      setFile(null)
                      setPreview(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Editing Tools */}
          {file && contentType === "image" && (
            <div className="mb-4 p-4 bg-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-white mb-3">Filtros</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-400">Brillo</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={filters.brightness}
                    onChange={(e) => setFilters((prev) => ({ ...prev, brightness: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400">Contraste</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={filters.contrast}
                    onChange={(e) => setFilters((prev) => ({ ...prev, contrast: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400">Saturación</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.saturation}
                    onChange={(e) => setFilters((prev) => ({ ...prev, saturation: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Título</label>
              <Input
                placeholder="Título de tu contenido"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Descripción</label>
              <Textarea
                placeholder="Describe tu contenido..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-zinc-800 border-zinc-700 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-zinc-800">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || (contentType !== "text" && !file)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>
    </div>
  )
}
