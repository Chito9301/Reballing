"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppIcon } from "@/components/app-icon";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  // Estados para login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Estados para registro
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);

  // Manejar login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      await signIn(loginEmail, loginPassword);
      router.push("/dashboard"); // Cambia a la ruta que quieras tras login
    } catch (error: any) {
      setLoginError(error.message || "Error al iniciar sesión");
    } finally {
      setLoginLoading(false);
    }
  };

  // Manejar registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError(null);

    if (!regName.trim() || !regUsername.trim()) {
      setRegError("Por favor completa todos los campos");
      setRegLoading(false);
      return;
    }

    try {
      await signUp(regEmail, regPassword, regUsername);
      router.push("/login"); // O redirige a dashboard si quieres login automático
    } catch (error: any) {
      setRegError(error.message || "Error al registrarse");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <AppIcon size={80} />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Challz
            </h1>
            <p className="mt-2 text-zinc-400">Desafía tu rutina. Reta tu mundo.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 rounded-lg">
              <TabsTrigger value="login" className="rounded-md">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-md">
                Registrarse
              </TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login" className="mt-6 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-zinc-400">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-zinc-900 border-zinc-700"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm text-zinc-400">
                      Contraseña
                    </Label>
                    <Link href="/recuperar" className="text-xs text-purple-400 hover:text-purple-300">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-900 border-zinc-700"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Iniciando..." : "Iniciar Sesión"}
                </Button>
                {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
              </form>

              <div className="relative my-6">
                <Separator className="bg-zinc-800" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-zinc-500">
                  O continúa con
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Aquí puedes agregar lógica para login con Google, Apple, etc. */}
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
                  {/* SVG Google */}
                  Google
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
                  {/* SVG Apple */}
                  Apple
                </Button>
              </div>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register" className="mt-6 space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-sm text-zinc-400">
                    Nombre
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Tu nombre"
                    className="bg-zinc-900 border-zinc-700"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-username" className="text-sm text-zinc-400">
                    Nombre de usuario
                  </Label>
                  <Input
                    id="register-username"
                    type="text"
                    placeholder="@username"
                    className="bg-zinc-900 border-zinc-700"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-sm text-zinc-400">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-zinc-900 border-zinc-700"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-sm text-zinc-400">
                    Contraseña
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-900 border-zinc-700"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={regLoading}
                >
                  {regLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
                {regError && <p className="text-red-500 mt-2">{regError}</p>}
              </form>

              <div className="relative my-6">
                <Separator className="bg-zinc-800" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-zinc-500">
                  O regístrate con
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Aquí puedes agregar lógica para registro con Google, Apple, etc. */}
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
                  {/* SVG Google */}
                  Google
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
                  {/* SVG Apple */}
                  Apple
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-zinc-500">
            Al continuar, aceptas nuestros{" "}
            <Link href="/terminos" className="text-purple-400 hover:text-purple-300">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacidad" className="text-purple-400 hover:text-purple-300">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
