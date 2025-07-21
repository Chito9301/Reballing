"use client"

import { ArrowLeft, Trophy, Star, Target, Zap, Award, Crown, Flame } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AchievementBadge } from "@/components/achievement-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProtectedRoute from "@/components/protected-route"

export default function GamificationPage() {
  const userStats = {
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    totalChallenges: 45,
    viralContent: 3,
    followers: 1250,
    streak: 7,
  }

  const achievements = [
    { type: "first_post" as const, title: "Primera Publicación", description: "Sube tu primer reto", unlocked: true },
    { type: "viral_content" as const, title: "Contenido Viral", description: "Consigue 1000+ vistas", unlocked: true },
    {
      type: "follower_milestone" as const,
      title: "Influencer",
      description: "Alcanza 1000 seguidores",
      unlocked: true,
    },
    { type: "challenge_winner" as const, title: "Ganador", description: "Gana un reto semanal", unlocked: false },
    { type: "streak" as const, title: "Racha de Fuego", description: "7 días consecutivos", unlocked: true },
  ]

  const leaderboard = [
    { rank: 1, name: "María Rodríguez", username: "@mariarodriguez", points: 15420, level: 28 },
    { rank: 2, name: "Carlos Pérez", username: "@carlosperez", points: 12890, level: 24 },
    { rank: 3, name: "Ana López", username: "@analopez", points: 11250, level: 22 },
    { rank: 4, name: "Juan Díaz", username: "@juandiaz", points: 9870, level: 19 },
    { rank: 5, name: "Laura Martínez", username: "@lauramartinez", points: 8650, level: 17 },
    { rank: 12, name: "Tú", username: "@usuario", points: userStats.xp, level: userStats.level, isCurrentUser: true },
  ]

  const weeklyChallenge = {
    title: "Reto de la Semana: Creatividad Extrema",
    description: "Crea el contenido más original usando solo objetos de tu casa",
    reward: "500 XP + Insignia Especial",
    timeLeft: "3 días",
    participants: 1247,
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-purple-500" />
              Gamificación
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-4">
          <div className="p-4 max-w-4xl mx-auto">
            {/* User Level Card */}
            <Card className="mb-6 bg-gradient-to-r from-purple-900 to-pink-900 border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Nivel {userStats.level}</h2>
                      <p className="text-purple-200">Challenger Avanzado</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">{userStats.xp.toLocaleString()}</p>
                    <p className="text-purple-200 text-sm">XP Total</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Progreso al siguiente nivel</span>
                    <span className="text-white">
                      {userStats.xp}/{userStats.xpToNext} XP
                    </span>
                  </div>
                  <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-3 bg-purple-800" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.totalChallenges}</p>
                  <p className="text-xs text-zinc-400">Retos Completados</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <Flame className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.viralContent}</p>
                  <p className="text-xs text-zinc-400">Contenido Viral</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.followers.toLocaleString()}</p>
                  <p className="text-xs text-zinc-400">Seguidores</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.streak}</p>
                  <p className="text-xs text-zinc-400">Días de Racha</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
                <TabsTrigger
                  value="achievements"
                  className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Logros
                </TabsTrigger>
                <TabsTrigger
                  value="leaderboard"
                  className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Ranking
                </TabsTrigger>
                <TabsTrigger
                  value="challenges"
                  className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Retos
                </TabsTrigger>
              </TabsList>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="p-4">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Tus Logros</h3>
                  <p className="text-sm text-zinc-400">Desbloquea insignias completando retos y alcanzando hitos</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {achievements.map((achievement, index) => (
                    <AchievementBadge
                      key={index}
                      type={achievement.type}
                      title={achievement.title}
                      description={achievement.description}
                      unlocked={achievement.unlocked}
                      size="lg"
                    />
                  ))}
                </div>

                {/* Progress Section */}
                <Card className="mt-6 bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white">Próximos Logros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300">Maestro de Retos (50 retos)</span>
                          <span className="text-zinc-400">{userStats.totalChallenges}/50</span>
                        </div>
                        <Progress value={(userStats.totalChallenges / 50) * 100} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300">Influencer Pro (5000 seguidores)</span>
                          <span className="text-zinc-400">{userStats.followers}/5000</span>
                        </div>
                        <Progress value={(userStats.followers / 5000) * 100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="p-4">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Ranking Semanal</h3>
                  <p className="text-sm text-zinc-400">Los usuarios con más puntos esta semana</p>
                </div>

                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <Card
                      key={user.rank}
                      className={`
                        ${
                          user.isCurrentUser
                            ? "bg-gradient-to-r from-purple-900 to-pink-900 border-purple-700"
                            : "bg-zinc-900 border-zinc-800"
                        }
                      `}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                              ${
                                user.rank === 1
                                  ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                                  : user.rank === 2
                                    ? "bg-gradient-to-r from-gray-400 to-gray-600"
                                    : user.rank === 3
                                      ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                                      : "bg-zinc-700"
                              }
                            `}
                            >
                              {user.rank <= 3 ? (user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉") : user.rank}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white">{user.name}</p>
                              <p className="text-sm text-zinc-400">{user.username}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-white">{user.points.toLocaleString()} XP</p>
                            <p className="text-sm text-zinc-400">Nivel {user.level}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Weekly Challenge Tab */}
              <TabsContent value="challenges" className="p-4">
                <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-800 mb-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      {weeklyChallenge.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-100 mb-4">{weeklyChallenge.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-green-200">Recompensa</p>
                        <p className="font-bold text-white">{weeklyChallenge.reward}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-200">Tiempo restante</p>
                        <p className="font-bold text-white">{weeklyChallenge.timeLeft}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-green-200">
                        {weeklyChallenge.participants.toLocaleString()} participantes
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">Participar Ahora</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Challenges */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Retos Diarios</h3>

                  {[
                    { title: "Sube tu primera foto del día", xp: 50, completed: true },
                    { title: "Comenta en 3 publicaciones", xp: 30, completed: true },
                    { title: "Consigue 10 likes en una publicación", xp: 100, completed: false },
                    { title: "Sigue a 2 usuarios nuevos", xp: 25, completed: false },
                  ].map((challenge, index) => (
                    <Card key={index} className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                              w-6 h-6 rounded-full flex items-center justify-center
                              ${challenge.completed ? "bg-green-600" : "bg-zinc-700"}
                            `}
                            >
                              {challenge.completed ? "✓" : "○"}
                            </div>
                            <div>
                              <p className={`font-medium ${challenge.completed ? "text-green-400" : "text-white"}`}>
                                {challenge.title}
                              </p>
                              <p className="text-sm text-zinc-400">+{challenge.xp} XP</p>
                            </div>
                          </div>
                          {!challenge.completed && (
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Completar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
