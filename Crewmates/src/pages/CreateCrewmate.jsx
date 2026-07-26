import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../client';
import { CATEGORIES, COLOR_OPTIONS, SPEED_OPTIONS } from '../constants/attributes';
import { CrewmateAvatar } from '../components/CrewmateAvatar';

export const CreateCrewmate = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [color, setColor] = useState('Red');
  const [speed, setSpeed] = useState(1.0);
  const [category, setCategory] = useState('Engineering & Tech');
  const [role, setRole] = useState(CATEGORIES['Engineering & Tech'].roles[0]);
  const [weapon, setWeapon] = useState(CATEGORIES['Engineering & Tech'].weapons[0]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCategorySelect = (catName) => {
    setCategory(catName);
    setRole(CATEGORIES[catName].roles[0]);
    setWeapon(CATEGORIES[catName].weapons[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter a name.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    const { error } = await api.createCrewmate({
      name: name.trim(),
      color,
      speed: Number(speed),
      category,
      role,
      weapon,
    });

    setSubmitting(false);
    if (error) {
      setErrorMsg(error.message || 'Failed to save crewmate.');
    } else {
      navigate('/gallery');
    }
  };

  const activeCat = CATEGORIES[category];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Create a New Crewmate</h1>

      {/* Small avatar lineup at top */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
        {COLOR_OPTIONS.slice(0, 8).map(c => (
          <CrewmateAvatar key={c.name} colorName={c.name} size={36} />
        ))}
      </div>

      {errorMsg && <div className="error-msg">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="create-form-grid">
          {/* Name */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter crewmate's name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Speed */}
          <div className="form-group">
            <label>Speed (mph):</label>
            <input
              type="number"
              placeholder="Enter speed in mph"
              value={speed}
              onChange={e => setSpeed(e.target.value)}
              min="0.5"
              max="10"
              step="0.5"
            />
          </div>

          {/* Color */}
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Color:</label>
            {COLOR_OPTIONS.map(col => (
              <label key={col.name} className="radio-option">
                <input
                  type="radio"
                  name="color"
                  value={col.name}
                  checked={color === col.name}
                  onChange={() => setColor(col.name)}
                />
                {col.name}
              </label>
            ))}
          </div>
        </div>

        {/* Category - Stretch Feature 1 */}
        <div style={{ marginBottom: '16px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Division:</label>
            {Object.keys(CATEGORIES).map(cat => (
              <label key={cat} className="radio-option">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => handleCategorySelect(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Role - restricted by category */}
        <div style={{ marginBottom: '16px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Role ({category}):</label>
            {activeCat.roles.map(r => (
              <label key={r} className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        {/* Weapon - restricted by category */}
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Weapon ({category}):</label>
            {activeCat.weapons.map(w => (
              <label key={w} className="radio-option">
                <input
                  type="radio"
                  name="weapon"
                  value={w}
                  checked={weapon === w}
                  onChange={() => setWeapon(w)}
                />
                {w}
              </label>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Crewmate'}
          </button>
        </div>
      </form>
    </div>
  );
};
