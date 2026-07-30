import { useMatches } from "./features/matches/hooks/useMatches";

function App() {
  const { matches, isLoading, error } = useMatches();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {matches.map((m) => (
        <li key={m.id}>
          {m.homeTeam.name} vs {m.awayTeam.name} — {m.status}
        </li>
      ))}
    </ul>
  );
}

export default App;