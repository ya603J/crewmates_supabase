import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const DetailPage = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCrewmate(data);
      } catch (error) {
        console.error('Error fetching crewmate:', error);
        setError('Failed to fetch crewmate details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (loading) return <div className="loading">Loading crewmate details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!crewmate) return <div className="not-found">Crewmate not found in space!</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const generateSummary = (crewmate) => {
    const speedDescriptions = {
      1: "extremely slow",
      2: "very slow",
      3: "slow",
      4: "below average speed",
      5: "average speed",
      6: "above average speed", 
      7: "fast",
      8: "very fast",
      9: "extremely fast",
      10: "lightning fast"
    };
    
    const roleDescription = {
      'crew': 'a loyal crew member',
      'impostor': 'a sneaky impostor',
      'engineer': 'a skilled engineer',
      'scientist': 'a brilliant scientist',
      'guardian': 'a protective guardian'
    };
    
    return `${crewmate.name} is ${roleDescription[crewmate.role] || 'a crewmate'} with a ${speedDescriptions[crewmate.speed] || 'mysterious'} movement capability, recognizable by their ${crewmate.color} spacesuit.`;
  };

  return (
    <div className="detail-page">
      <div className="page-header">
        <h1>Crewmate Details</h1>
        <p>Information about your crewmate in space</p>
      </div>
      
      <div className="crewmate-detail">
        <div 
          className="crewmate-avatar large" 
          style={{ backgroundColor: crewmate.color }}
        >
          <div className="crewmate-helmet"></div>
        </div>
        
        <div className="crewmate-info-detail">
          <h2>{crewmate.name}</h2>
          
          <div className="crewmate-summary">
            <p>{generateSummary(crewmate)}</p>
          </div>
          
          <div className="detail-item">
            <span className="label">Role:</span>
            <span className="value">{crewmate.role.charAt(0).toUpperCase() + crewmate.role.slice(1)}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Speed:</span>
            <span className="value">{crewmate.speed} / 10</span>
            <div className="speed-bar">
              <div 
                className="speed-fill" 
                style={{ width: `${crewmate.speed * 10}%` }}
              ></div>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="label">Color:</span>
            <span className="value color-value" style={{ backgroundColor: crewmate.color }}></span>
          </div>
          
          <div className="detail-item">
            <span className="label">Launched:</span>
            <span className="value">{formatDate(crewmate.created_at)}</span>
          </div>
        </div>
      </div>
      
      <div className="detail-actions">
        <Link to={`/edit/${id}`} className="edit-btn">Edit Crewmate</Link>
        <Link to="/gallery" className="back-btn">Back to Gallery</Link>
      </div>
    </div>
  );
};

export default DetailPage; 