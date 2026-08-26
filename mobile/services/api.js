const API_URL = "http://192.168.15.3:3000";

export async function getStations() {
  const response = await fetch(`${API_URL}/stations`);

  if (!response.ok) {
    throw new Error("Erro ao buscar estações");
  }

  return response.json();
}
