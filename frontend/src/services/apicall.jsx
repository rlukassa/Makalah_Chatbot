export async function askToBackend(question) {
  const response = await fetch('http://localhost:5000/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  })
  if (!response.ok) throw new Error('Gagal koneksi server')
  return response.json()
}