import { useState } from "react";
import { signUp } from "../src/firebase/auth/signup";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await signUp(email, password);
    if (error) setError(error);
    else alert("Usuario registrado!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Registrarse</button>
      {error && <p>{error}</p>}
    </form>
  );
}


