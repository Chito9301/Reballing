// app/signup/page.tsx (o pages/signup.tsx si usas pages router)

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signUp(email, password, username);
      router.push("/login"); // redirige a login tras registro exitoso
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Registro</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="input"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="input"
      />
      <button disabled={loading} type="submit" className="btn-primary">
        {loading ? "Registrando..." : "Registrarse"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
