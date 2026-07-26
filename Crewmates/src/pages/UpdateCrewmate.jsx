import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../client';
import { CATEGORIES, COLOR_OPTIONS } from '../constants/attributes';

export const UpdateCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [color, setColor] = useState('Red');
  const [speed, setSpeed] = useState(1.0);
  const [category, setCategory] = useState('Engineering & Tech');
  const [role, setRole] = useState('');
  const [weapon, setWeapon] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadCrewmate();
  }, [id]);

  const loadCrewmate = async () => {
    setLoading(true);
    const { data, error } = await api.getCrewmateById(id);
    if (error || !data) {
      setErrorMsg('Crewmate not found.');
    } else {
      setName(data.name || '');
      setColor(data.color || 'Red');
      setSpeed(Number(data.speed) || 1.0);
      setCategory(data.category || 'Engineering & Tech');
      setRole(data.role || CATEGORIES[data.category || 'Engineering & Tech'].roles[0]);
      setWeapon(data.weapon || CATEGORIES[data.category || 'Engineering & Tech'].weapons[0]);
    }
    setLoading(false);
  };

  const handleCategorySelect = (catName) => {
    setCategory(catName);
    setRole(CATEGORIES[catName].roles[0]);
    setWeapon(CATEGORIES[catName].weapons[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setErrorMsg('Name cannot be empty.'); return; }
    setSaving(true);
    const { error } = await api.updateCrewmate(id, { name: name.trim(), color, speed: Number(speed), category, role, weapon });
    setSaving(false);
    if (error) { setErrorMsg(error.message); } else { navigate('/gallery'); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const { error } = await api.deleteCrewmate(id);
    setDeleting(false);
    if (!error) navigate('/gallery');
  };

  const activeCat = CATEGORIES[category] || CATEGORIES['Engineering & Tech'];

  if (loading) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Link to={`/crewmate/${id}`} className="back-link">← Back to Details</Link>

      <h1>Update Crewmate</h1>

      {errorMsg && <div className="error-msg">{errorMsg}</div>}

      <form onSubmit={handleUpdate}>
        <div className="create-form-grid">
          {/* Name */}
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          {/* Speed */}
          <div className="form-group">
            <label>Speed (mph):</label>
            <input
              type="number"
              value={speed}
              onChange={e => setSpeed(e.target.value)}
              min="0.5" max="10" step="0.5"
            />
          </div>

          {/* Color */}
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Color:</label>
            {COLOR_OPTIONS.map(col => (
              <label key={col.name} className="radio-option">
                <input type="radio" name="color" value={col.name} checked={color === col.name} onChange={() => setColor(col.name)} />
                {col.name}
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div style={{ marginBottom: '16px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Division:</label>
            {Object.keys(CATEGORIES).map(cat => (
              <label key={cat} className="radio-option">
                <input type="radio" name="category" value={cat} checked={category === cat} onChange={() => handleCategorySelect(cat)} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div style={{ marginBottom: '16px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Role ({category}):</label>
            {activeCat.roles.map(r => (
              <label key={r} className="radio-option">
                <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} />
                {r}
              </label>
            ))}
          </div>
        </div>

        {/* Weapon */}
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>Weapon ({category}):</label>
            {activeCat.weapons.map(w => (
              <label key={w} className="radio-option">
                <input type="radio" name="weapon" value={w} checked={weapon === w} onChange={() => setWeapon(w)} />
                {w}
              </label>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Update Crewmate'}
          </button>
          <button type="button" className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            Delete Crewmate
          </button>
        </div>
      </form>

      {/* Delete confirm dialog */}
      {showConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div style={{ background: '#444', borderRadius: '10px', padding: '32px', textAlign: 'center', maxWidth: '360px' }}>
            <p style={{ fontSize: '16px', marginBottom: '20px', color: '#fff' }}>
              Are you sure you want to delete <strong>{name}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button className="btn" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
