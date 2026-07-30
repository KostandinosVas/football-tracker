import type { RawMatch } from "./footballApi";
import type { Match, MatchStatus } from "../types/match";

function mapStatus(rawStatus: string): MatchStatus {
  switch (rawStatus) {
    case "IN_PLAY":
    case "PAUSED":
      return "LIVE";
    case "FINISHED":
      return "FINISHED";
    case "POSTPONED":
    case "SUSPENDED":
    case "CANCELLED":
      return "POSTPONED";
    case "SCHEDULED":
    case "TIMED":
    default:
      return "SCHEDULED";
  }
}

export function adaptMatch(raw: RawMatch): Match {
  return {
    id: raw.id,
    homeTeam: {
      id: raw.homeTeam.id,
      name: raw.homeTeam.name,
      shortName: raw.homeTeam.shortName,
      crestUrl: raw.homeTeam.crest,
    },
    awayTeam: {
      id: raw.awayTeam.id,
      name: raw.awayTeam.name,
      shortName: raw.awayTeam.shortName,
      crestUrl: raw.awayTeam.crest,
    },
    homeScore: raw.score.fullTime.home,
    awayScore: raw.score.fullTime.away,
    status: mapStatus(raw.status),
    kickoffTime: raw.utcDate,
    competition: raw.competition.name,
  };
}

export function adaptMatches(raws: RawMatch[]): Match[] {
  return raws.map(adaptMatch);
}