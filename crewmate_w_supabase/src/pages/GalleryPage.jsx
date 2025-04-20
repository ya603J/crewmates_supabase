import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CrewmateCard from '../components/CrewmateCard';

const GalleryPage = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setCrewmates(data || []);
      } catch (error) {
        console.error('Error fetching crewmates:', error);
        setError(
          'Failed to fetch crewmates. This might be because: ' +
          '1) The "crewmates" table does not exist in your Supabase database. Create it using the SQL in create_table.sql. ' +
          '2) Your Supabase credentials in .env are incorrect.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmates();
  }, []);

  if (loading) return <div className="loading">Loading crewmates...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Crewmate Gallery</h1>
        <p>Here are all the crewmates you've created and sent to space!</p>
      </div>

      {crewmates.length === 0 ? (
        <div className="empty-state">
          <p>No crewmates have been created yet! Create your first one to get started.</p>
          <Link to="/create" className="create-btn">Create a Crewmate!</Link>
        </div>
      ) : (
        <div className="crewmates-grid">
          {crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage; 