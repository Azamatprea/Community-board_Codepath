import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../client';
import { COLOR_OPTIONS } from '../constants/attributes';
import { CrewmateAvatar } from '../components/CrewmateAvatar';

export const CrewmateDetail = () => {
  const { id } = useParams();

  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCrewmate();
  }, [id]);

  const loadCrewmate = async () => {
    setLoading(true);
    const { data, error: err } = await api.getCrewmateById(id);
    if (err || !data) {
      setError('Crewmate not found.');
    } else {
      setCrewmate(data);
    }
    setLoading(false);
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading...</p>;

  if (error || !crewmate) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p style={{ color: '#f87171' }}>{error}</p>
        <Link to="/gallery"><button className="btn" style={{ marginTop: '12px' }}>Back to Gallery</button></Link>
      </div>
    );
  }

  const { name, color, speed, category, role, weapon, bio } = crewmate;
  const colorObj = COLOR_OPTIONS.find(c => c.name.toLowerCase() === (color || '').toLowerCase()) || COLOR_OPTIONS[0];
  const speedVal = Number(speed) || 1.0;

  // Dynamic speed remark (matches reference example)
  let speedRemark = 'You may want to find a Crewmate with more speed, this one is kind of slow 😬';
  if (speedVal >= 7.5) speedRemark = 'Lightning fast! This crewmate can outrun any impostor ⚡';
  else if (speedVal >= 4.0) speedRemark = 'Pretty speedy! This crewmate handles missions well 🏃';

  return (
    <div className="detail-page">
      <Link to="/gallery" className="back-link">← Back to Gallery</Link>

      <h1>Crewmate: {name}</h1>

      <CrewmateAvatar colorName={color} size={130} />

      <div className="detail-stats" style={{ marginTop: '20px' }}>
        <h2>Stats:</h2>
        <p>Color: {color}</p>
        <p>Speed: {speed} mph</p>
        <p>Division: {category}</p>
        <p>Role: {role}</p>
        <p>Weapon: {weapon}</p>

        {bio && (
          <p style={{ marginTop: '12px', fontStyle: 'italic', color: '#ccc', fontSize: '14px' }}>{bio}</p>
        )}

        <p style={{ marginTop: '20px', fontWeight: '600', fontSize: '14px' }}>
          {speedRemark}
        </p>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to={`/edit/${id}`}>
          <button className="btn">Wanna edit this Crewmate?</button>
        </Link>
      </div>

      {/* Crewmate pair image (like reference) */}
      <div style={{ marginTop: '32px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <CrewmateAvatar colorName={color} size={55} />
        <CrewmateAvatar colorName="Pink" size={55} />
      </div>
    </div>
  );
};
