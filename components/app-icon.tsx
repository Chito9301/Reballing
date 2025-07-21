import Image from "next/image"

export function AppIcon({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ width: size, height: size }}>
      <Image src="/challz-icon.png" alt="Challz App Icon" width={size} height={size} className="object-cover" />
    </div>
  )
}
