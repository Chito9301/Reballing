"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trophy, Star, Target, Crown, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AchievementBadge } from "@/components/achievement-badge"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

interface UserStats {
  level: number
  xp: number
  xpToNext: number
  totalXp: number
  rank: number
  achievements: Achievement[]
  dailyChallenges: DailyChallenge[]
  weeklyChallenge: WeeklyChallenge
}

interface Achievement {
  id: string
  name: string
  description: string
  type: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

interface DailyChallenge {
  id: string
  title: string
  description: string
  xpReward: number
  completed: boolean
  progress: number
  maxProgress: number
}

interface WeeklyChallenge {
  id: string
  title: string
  description: string
  xpReward: number
  premiumReward: string
  completed: boolean
  progress: number
  maxProgress: number
  endsAt: Date
}

export default function GamificationPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock leaderboard data
  const globalLeaderboard = [
    {
      id: "1",
      username: "@viral_legend",
      name: "Viral Legend",
      level: 47,
      xp: 125420,
      photoURL: "/placeholder.svg?height=40&width=40",
      badge: "diamond" as const,
    },
    {
      id: "2",
      username: "@challenge_king",
      name: "Challenge King",
      level: 43,
      xp: 108930,
      photoURL: "/placeholder.svg?height=40&width=40",
      badge: "platinum" as const,
    },
    {
      id: "3",
      username: "@trend_master",
      name: "Trend Master",
      level: 41,
      xp: 95340,
      photoURL: "/placeholder.svg?height=40&width=40",
      badge: "gold" as const,
    },
    {
      id: "4",
      username: "@creative_pro",
      name: "Creative Pro",
      level: 38,
      xp: 87500,
      photoURL: "/placeholder.svg?height=40&width=40",
      badge: "silver" as const,
    },
    {
      id: "5",
      username: "@rising_talent",
      name: "Rising Talent",
      level: 35,
      xp: 76420,
      photoURL: "/placeholder.svg?height=40&width=40",
      badge: "bronze" as const,
    },
  ]

  useEffect(() => {
    // Mock user stats - in real app this would come from Firebase
    const mockStats: UserStats = {
      level: 12,
      xp: 2340,
      xpToNext: 660,
      totalXp: 15840,
      rank: 1247,
      achievements: [
        {
          id: "1",
          name: "Primer Reto",
          description: "Completa tu primer reto",
          type: "bronze",
          unlocked: true,
          unlockedAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          name: "Viral Starter",
          description: "Consigue 100 likes en una publicación",
          type: "silver",
          unlocked: true,
          unlockedAt: new Date("2024-01-20"),
        },
        {
          id: "3",
          name: "Creador Popular",
          description: "Alcanza 1000 seguidores",
          type: "gold",
          unlocked: false,
          progress: 456,
          maxProgress: 1000,
        },
        {
          id: "4",
          name: "Maestro Viral",
          description: "Consigue 10K likes en total",
          type: "platinum",
          unlocked: false,
          progress: 3240,
          maxProgress: 10000,
        },
        {
          id: "5",
          name: "Leyenda de Challz",
          description: "Alcanza el nivel 50",
          type: "diamond",
          unlocked: false,
          progress: 12,
          maxProgress: 50,
        },
      ],
      dailyChallenges: [
        {
          id: "1",
          title: "Creador Activo",
          description: "Publica 2 retos hoy",
          xpReward: 100,
          completed: true,
          progress: 2,
          maxProgress: 2,
        },
        {
          id: "2",
          title: "Interacción Social",
          description: "Da 10 likes a otros usuarios",
          xpReward: 50,
          completed: false,
          progress: 6,
          maxProgress: 10,
        },
        {
          id: "3",
          title: "Comentarista",
          description: "Comenta en 5 publicaciones",
          xpReward: 75,
          completed: false,
          progress: 2,
          maxProgress: 5,
        },
      ],
      weeklyChallenge: {
        id: "weekly_1",
        title: "Semana Viral",
        description: "Consigue 500 likes en total esta semana",
        xpReward: 1000,
        premiumReward: "Badge Exclusivo + 30 días Premium",
        completed: false,
        progress: 234,
        maxProgress: 500,
        endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      },
    }

    setUserStats(mockStats)
    setLoading(false)
  }, [])

  const calculateLevelProgress = () => {
    if (!userStats) return 0
    return (userStats.xp / (userStats.xp + userStats.xpToNext)) * 100
  }

  const formatTimeRemaining = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  if (loading || !userStats) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-black text-white">
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Link href="/trending">
                <Button variant="ghost" size="icon" className="text-zinc-400">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Gamificación</h1>
            </div>
          </header>
          <main className="flex-1 pt-16 pb-20 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin-slow mb-4">
                <Trophy className="h-12 w-12 text-purple-500 mx-auto" />
              </div>
              <p className="text-zinc-400">Cargando tu progreso...</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/trending">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              Gamificación
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-20">
          <div className="p-4">
            {/* User Level Card */}
            <Card className="mb-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-4 border-purple-500">
                    <AvatarImage src={user?.photoURL || "/placeholder.svg"} alt={user?.displayName || "Usuario"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-white">{user?.displayName || "Usuario"}</h2>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Nivel {userStats.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-300">Ranking Global: #{userStats.rank.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={calculateLevelProgress()} className="flex-1" />
                      <span className="text-xs text-zinc-300">
                        {userStats.xp}/{userStats.xp + userStats.xpToNext} XP
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{userStats.totalXp.toLocaleString()}</p>
                    <p className="text-xs text-zinc-400">XP Total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-pink-400">
                      {userStats.achievements.filter((a) => a.unlocked).length}
                    </p>
                    <p className="text-xs text-zinc-400">Logros</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{userStats.level}</p>
                    <p className="text-xs text-zinc-400">Nivel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-zinc-900 mb-6">
                <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-purple-600">
                  <Target className="h-4 w-4 mr-2" />
                  Resumen
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex-1 data-[state=active]:bg-purple-600">
                  <Trophy className="h-4 w-4 mr-2" />
                  Logros
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex-1 data-[state=active]:bg-purple-600">
                  <Crown className="h-4 w-4 mr-2" />
                  Ranking
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Daily Challenges */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Calendar className="h-5 w-5 text-green-500" />
                      Retos Diarios
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userStats.dailyChallenges.map((challenge) => (
                      <div key={challenge.id} className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{challenge.title}</h3>
                            <p className="text-sm text-zinc-400">{challenge.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={challenge.completed ? "bg-green-600" : "bg-zinc-600"}>
                              {challenge.completed ? "Completado" : `${challenge.progress}/${challenge.maxProgress}`}
                            </Badge>
                            <p className="text-xs text-zinc-400 mt-1">+{challenge.xpReward} XP</p>
                          </div>
                        </div>
                        <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Weekly Challenge */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Reto Semanal
                      <Badge className="bg-yellow-600 text-white ml-auto">
                        {formatTimeRemaining(userStats.weeklyChallenge.endsAt)} restantes
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg">{userStats.weeklyChallenge.title}</h3>
                          <p className="text-sm text-zinc-300 mb-2">{userStats.weeklyChallenge.description}</p>
                          <div className="flex items-center gap-4">
                            <Badge className="bg-purple-600 text-white">+{userStats.weeklyChallenge.xpReward} XP</Badge>
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                              {userStats.weeklyChallenge.premiumReward}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-300">Progreso</span>
                          <span className="text-white font-medium">
                            {userStats.weeklyChallenge.progress}/{userStats.weeklyChallenge.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(userStats.weeklyChallenge.progress / userStats.weeklyChallenge.maxProgress) * 100}
                          className="h-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 text-white">Tus Logros</h2>
                  <p className="text-sm text-zinc-400">
                    {userStats.achievements.filter((a) => a.unlocked).length} de {userStats.achievements.length}{" "}
                    desbloqueados
                  </p>
                </div>

                <div className="grid gap-4">
                  {userStats.achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`border-zinc-800 ${
                        achievement.unlocked
                          ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30"
                          : "bg-zinc-900"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <AchievementBadge
                              type={achievement.type}
                              achievement={achievement.name}
                              unlocked={achievement.unlocked}
                              className="text-base px-3 py-2"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${achievement.unlocked ? "text-white" : "text-zinc-400"}`}>
                              {achievement.name}
                            </h3>
                            <p className={`text-sm ${achievement.unlocked ? "text-zinc-300" : "text-zinc-500"}`}>
                              {achievement.description}
                            </p>
                            {achievement.unlocked && achievement.unlockedAt && (
                              <p className="text-xs text-purple-400 mt-1">
                                Desbloqueado el {achievement.unlockedAt.toLocaleDateString()}
                              </p>
                            )}
                            {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-zinc-400">Progreso</span>
                                  <span className="text-zinc-300">
                                    {achievement.progress}/{achievement.maxProgress}
                                  </span>
                                </div>
                                <Progress
                                  value={(achievement.progress / achievement.maxProgress) * 100}
                                  className="h-2"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 text-white">Ranking Global</h2>
                  <p className="text-sm text-zinc-400">Los mejores creadores de Challz</p>
                </div>

                <div className="space-y-3">
                  {globalLeaderboard.map((user, index) => (
                    <Card key={user.id} className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-purple-500">
                            <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.username} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-white">{user.name}</h3>
                              <AchievementBadge type={user.badge} achievement="Top Creator" unlocked />
                            </div>
                            <p className="text-sm text-zinc-400">{user.username}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <Badge className="bg-purple-600 text-white">Nivel {user.level}</Badge>
                              <span className="text-xs text-zinc-500">{user.xp.toLocaleString()} XP</span>
                            </div>
                          </div>
                          {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                          {index === 1 && <Trophy className="h-6 w-6 text-gray-400" />}
                          {index === 2 && <Star className="h-6 w-6 text-amber-600" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* User's Position */}
                <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                        {userStats.rank}
                      </div>
                      <Avatar className="h-12 w-12 border-2 border-purple-500">
                        <AvatarImage src={user?.photoURL || "/placeholder.svg"} alt={user?.displayName || "Usuario"} />
                        <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white">{user?.displayName || "Usuario"}</h3>
                          <Badge className="bg-blue-600 text-white">Tú</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-purple-600 text-white">Nivel {userStats.level}</Badge>
                          <span className="text-xs text-zinc-300">{userStats.totalXp.toLocaleString()} XP</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
