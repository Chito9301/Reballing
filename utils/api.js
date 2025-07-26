// utils/api.js

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchMedia() {
  try {
    const res = await fetch(`${baseUrl}/api/media`, {
      headers: {
        'Content-Type': 'application/json',
        // Si usas autenticación con token, agrega aquí:
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error al obtener media: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('fetchMedia error:', error);
    throw error;
  }
}

// Puedes agregar más funciones para otras llamadas API:
export async function login(email, password) {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Error en login');
  }

  return await res.json();
}
