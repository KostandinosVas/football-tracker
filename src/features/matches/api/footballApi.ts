const API_BASE = import.meta.env.VITE_FOOTBALL_API_BASE;
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;


// Raw shapes -- exactly what the API gives us, ugly names and all
export interface RawTeam {
  id: number;
  name: string;
  shortName: string;
  crest: string | null;
}

export interface RawMatch {
  id: number;
  utcDate: string;
  status: string;
  competition: { name: string };
  homeTeam: RawTeam;
  awayTeam: RawTeam;
  score: {
    fullTime: { home: number | null; away: number | null };
  };
}

interface RawMatchesResponse {
  matches: RawMatch[];
}

export async function fetchMatches(): Promise<RawMatch[]> {
  const response = await fetch(`${API_BASE}/matches`, {
    headers: { "X-Auth-Token": API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Football API error: ${response.status}`);
  }

  const data: RawMatchesResponse = await response.json();
  return data.matches;
}