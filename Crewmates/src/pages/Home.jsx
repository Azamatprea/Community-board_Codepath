import React from 'react';
import { Link } from 'react-router-dom';
import { CrewmateAvatar } from '../components/CrewmateAvatar';

const lineupColors = ['Red', 'Blue', 'Green', 'Cyan', 'Yellow', 'Purple', 'Orange', 'Pink', 'Lime', 'Obsidian'];

export const Home = () => {
  return (
    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Welcome to the Crewmate Creator!</h1>
      <p style={{ textAlign: 'center', marginBottom: '32px', fontSize: '15px' }}>
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>

      {/* Crewmate lineup */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
        {lineupColors.map(c => (
          <CrewmateAvatar key={c} colorName={c} size={55} />
        ))}
      </div>

      {/* UFO */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <svg viewBox="0 0 200 100" width="200" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="55" rx="80" ry="22" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
          <path d="M 65 45 C 65 22, 135 22, 135 45 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2.5" />
          <ellipse cx="100" cy="30" rx="20" ry="12" fill="#dbeafe" opacity="0.6" />
          <circle cx="45" cy="55" r="5" fill="#ef4444" />
          <circle cx="70" cy="62" r="5" fill="#a855f7" />
          <circle cx="100" cy="65" r="5" fill="#10b981" />
          <circle cx="130" cy="62" r="5" fill="#3b82f6" />
          <circle cx="155" cy="55" r="5" fill="#f59e0b" />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Link to="/create">
          <button className="btn">Create a Crewmate!</button>
        </Link>
        <Link to="/gallery">
          <button className="btn">Crewmate Gallery</button>
        </Link>
      </div>
    </div>
  );
};
