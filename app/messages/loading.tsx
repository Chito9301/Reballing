import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MessagesLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 bg-zinc-800" />
            <div>
              <Skeleton className="h-6 w-24 bg-zinc-800 mb-1" />
              <Skeleton className="h-3 w-32 bg-zinc-800" />
            </div>
          </div>
          <Skeleton className="h-10 w-10 bg-zinc-800" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="px-4 pb-4">
          <Skeleton className="h-10 w-full bg-zinc-800 rounded-md" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 pt-32 pb-20">
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32 bg-zinc-800" />
                      <Skeleton className="h-3 w-8 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-3 w-48 bg-zinc-800" />
                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
