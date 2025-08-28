export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export async function api(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
