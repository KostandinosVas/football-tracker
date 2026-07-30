import { useEffect, useState } from "react";
import { fetchMatches } from "../api/footballApi";
import { adaptMatches } from "../api/matchAdapter";
import type { Match } from "../types/match";

interface UseMatchesResult {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
}

export function useMatches(): UseMatchesResult {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const raw = await fetchMatches();
        if (!cancelled) {
          setMatches(adaptMatches(raw));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { matches, isLoading, error };
}