function MatchCard({ team1, flag1, team2, flag2, date, venue, group, time }) {
    return (
      <div className="card">
        <div className="group-badge">Group {group}</div>
        <div className="teams">
          <div className="team">
            <img src={`https://flagcdn.com/48x36/${flag1}.png`} alt={team1} />
            <span>{team1}</span>
          </div>
          <span className="vs">VS</span>
          <div className="team">
            <img src={`https://flagcdn.com/48x36/${flag2}.png`} alt={team2} />
            <span>{team2}</span>
          </div>
        </div>
        <div className="divider" />
        <p>📅 {date}</p>
        <p>🕐 {time}</p>
        <p>🏟️ {venue}</p>
        <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noreferrer">
          <button>Match Info ⚽</button>
        </a>
      </div>
    )
  }
  
  export default MatchCard