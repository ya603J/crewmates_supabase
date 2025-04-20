import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const CrewmateForm = ({ crewmate, isEditing = false }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState('red');
  const [role, setRole] = useState('crew');
  const [loading, setLoading] = useState(false);

  const colors = ['red', 'blue', 'green', 'pink', 'orange', 'yellow', 'black', 'white', 'purple', 'brown'];
  const roles = ['crew', 'impostor', 'engineer', 'scientist', 'guardian'];
  
  useEffect(() => {
    if (crewmate) {
      setName(crewmate.name || '');
      setSpeed(crewmate.speed || 1);
      setColor(crewmate.color || 'red');
      setRole(crewmate.role || 'crew');
    }
  }, [crewmate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const crewmateData = {
      name,
      speed,
      color,
      role,
      created_at: isEditing ? crewmate.created_at : new Date().toISOString(),
    };
    
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('crewmates')
          .update(crewmateData)
          .eq('id', crewmate.id);
        
        if (error) throw error;
        navigate(`/crewmate/${crewmate.id}`);
      } else {
        const { error } = await supabase
          .from('crewmates')
          .insert([crewmateData]);
        
        if (error) throw error;
        navigate('/gallery');
      }
    } catch (error) {
      console.error('Error saving crewmate:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!isEditing) return;
    
    const confirmed = window.confirm('Are you sure you want to eject this crewmate into deep space?');
    if (!confirmed) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', crewmate.id);
      
      if (error) throw error;
      navigate('/gallery');
    } catch (error) {
      console.error('Error deleting crewmate:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="crewmate-form">
      <div className="crewmate-preview" style={{ backgroundColor: color }}>
        <div className="crewmate-helmet"></div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter crewmate name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="speed">Speed (1-10):</label>
          <div className="range-container">
            <input
              id="speed"
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
            <span className="range-value">{speed}</span>
          </div>
        </div>
        
        <div className="form-group">
          <label>Color:</label>
          <div className="color-options">
            {colors.map((c) => (
              <div
                key={c}
                className={`color-option ${color === c ? 'selected' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Role:</label>
          <div className="role-options">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                className={`role-option ${role === r ? 'selected' : ''}`}
                onClick={() => setRole(r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Crewmate' : 'Launch Crewmate'}
          </button>
          
          {isEditing && (
            <button 
              type="button" 
              className="delete-button" 
              onClick={handleDelete}
              disabled={loading}
            >
              Eject Crewmate
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CrewmateForm; 