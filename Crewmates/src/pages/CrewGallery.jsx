import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../client';
import { COLOR_OPTIONS } from '../constants/attributes';
import { CrewmateAvatar } from '../components/CrewmateAvatar';

// Map color name to a basic hex for the card border
const colorHex = {
  Red: '#ef4444', Blue: '#3b82f6', Green: '#10b981', Yellow: '#f59e0b',
  Purple: '#8b5cf6', Cyan: '#06b6d4', Orange: '#f97316', Pink: '#ec4899',
  Lime: '#84cc16', Obsidian: '#475569'
};

export const CrewGallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    setLoading(true);
    const { data } = await api.getCrewmates();
    setCrewmates((data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    setLoading(false);
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading...</p>;
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your Crewmate Gallery!</h2>
        <p>You haven't made a crewmate yet!</p>
        <Link to="/create">
          <button className="btn" style={{ marginTop: '12px' }}>Create one here!</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Crewmate Gallery!</h1>

      {/* Crew Stats - Stretch Feature 2 */}
      <CrewStats crewmates={crewmates} />

      <div className="crewmate-grid">
        {crewmates.map(c => (
          <CrewmateCard key={c.id} crewmate={c} />
        ))}
      </div>
    </div>
  );
};

const CrewmateCard = ({ crewmate }) => {
  const { id, name, speed, color } = crewmate;
  const hex = colorHex[color] || '#888';

  return (
    <div
      className="crewmate-card"
      style={{ borderColor: hex }}
    >
      <CrewmateAvatar colorName={color} size={90} />

      <p><strong>Name of Crewmate:</strong>{' '}
        <span style={{ background: '#666', padding: '1px 6px', borderRadius: '4px' }}>{name}</span>
      </p>
      <p><strong>Speed of Crewmate:</strong>{' '}
        <span style={{ background: '#666', padding: '1px 6px', borderRadius: '4px' }}>{speed} mph</span>
      </p>
      <p><strong>Color of Crewmate:</strong>{' '}
        <span style={{ background: hex, color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '13px' }}>{color}</span>
      </p>

      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <Link to={`/crewmate/${id}`}>
          <button className="btn" style={{ fontSize: '13px', padding: '6px 14px' }}>View Details</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button className="btn" style={{ fontSize: '13px', padding: '6px 14px' }}>Edit Crewmate</button>
        </Link>
      </div>
    </div>
  );
};

// Stretch Feature 2: Summary statistics
const CrewStats = ({ crewmates }) => {
  const total = crewmates.length;
  const avgSpeed = (crewmates.reduce((s, c) => s + Number(c.speed), 0) / total).toFixed(1);

  // Color distribution
  const colorCounts = crewmates.reduce((acc, c) => {
    acc[c.color] = (acc[c.color] || 0) + 1;
    return acc;
  }, {});
  const topColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0];

  // Stretch Feature 3: Success metric
  const uniqueCats = new Set(crewmates.map(c => c.category)).size;
  let success = Math.min(20 + total * 15 + uniqueCats * 10 + (parseFloat(avgSpeed) >= 4 ? 15 : 0), 100);

  return (
    <div style={{ background: '#444', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px', fontSize: '14px' }}>
      <strong>Crew Stats:</strong>{' '}
      {total} crewmates &nbsp;|&nbsp;
      Avg speed: {avgSpeed} mph &nbsp;|&nbsp;
      Most common color: {topColor[0]} ({Math.round(topColor[1] / total * 100)}%) &nbsp;|&nbsp;
      <strong style={{ color: success >= 75 ? '#4ade80' : success >= 50 ? '#fbbf24' : '#f87171' }}>
        Mission Readiness: {success}%
      </strong>
    </div>
  );
};
