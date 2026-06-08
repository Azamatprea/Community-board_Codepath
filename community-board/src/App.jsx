import matches from './data'
import MatchCard from './MatchCard'

function App() {
  return (
    <div className="app">
      <header>
        <h1>⚽ FIFA World Cup 2026</h1>
        <p>Match Schedule & Events</p>
      </header>
      <div className="grid">
        {matches.map(match => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            flag1={match.flag1}
            team2={match.team2}
            flag2={match.flag2}
            date={match.date}
            venue={match.venue}
            group={match.group}
            time={match.time}
          />
        ))}
      </div>
    </div>
  )
}

export default App