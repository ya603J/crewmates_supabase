import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CrewmateForm from '../components/CrewmateForm';

const EditPage = () => {
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

  if (loading) return <div className="loading">Loading crewmate...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!crewmate) return <div className="not-found">Crewmate not found in space!</div>;

  return (
    <div className="edit-page">
      <div className="page-header">
        <h1>Edit Crewmate</h1>
        <p>Update {crewmate.name}'s attributes</p>
      </div>
      
      <CrewmateForm crewmate={crewmate} isEditing={true} />
      
      <div className="page-navigation">
        <Link to={`/crewmate/${id}`} className="nav-link">Back to Details</Link>
        <Link to="/gallery" className="nav-link">Back to Gallery</Link>
      </div>
    </div>
  );
};

export default EditPage; 