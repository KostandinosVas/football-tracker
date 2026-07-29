export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED";

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crestUrl: string | null;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  kickoffTime: string; // ISO 8601
  competition: string;
}