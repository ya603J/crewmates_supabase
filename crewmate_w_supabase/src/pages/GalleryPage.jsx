import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CrewmateCard from '../components/CrewmateCard';

const GalleryPage = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [successRate, setSuccessRate] = useState(0);

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
        
        // Calculate statistics once data is loaded
        if (data && data.length > 0) {
          calculateStatistics(data);
          calculateSuccessRate(data);
        }
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
  
  // Calculate various statistics about the crew
  const calculateStatistics = (data) => {
    const stats = {
      totalCrewmates: data.length,
      roles: {},
      colors: {},
      averageSpeed: 0,
      fastCrewmates: 0  // Crewmates with speed > 7
    };
    
    let totalSpeed = 0;
    
    // Count each attribute
    data.forEach(crewmate => {
      // Roles
      if (stats.roles[crewmate.role]) {
        stats.roles[crewmate.role]++;
      } else {
        stats.roles[crewmate.role] = 1;
      }
      
      // Colors
      if (stats.colors[crewmate.color]) {
        stats.colors[crewmate.color]++;
      } else {
        stats.colors[crewmate.color] = 1;
      }
      
      // Speed
      totalSpeed += crewmate.speed;
      if (crewmate.speed > 7) {
        stats.fastCrewmates++;
      }
    });
    
    // Calculate average speed
    stats.averageSpeed = (totalSpeed / data.length).toFixed(1);
    
    // Convert raw counts to percentages
    Object.keys(stats.roles).forEach(role => {
      stats.roles[role] = {
        count: stats.roles[role],
        percentage: Math.round((stats.roles[role] / data.length) * 100)
      };
    });
    
    Object.keys(stats.colors).forEach(color => {
      stats.colors[color] = {
        count: stats.colors[color],
        percentage: Math.round((stats.colors[color] / data.length) * 100)
      };
    });
    
    stats.fastCrewmatesPercentage = Math.round((stats.fastCrewmates / data.length) * 100);
    
    setStatistics(stats);
  };
  
  // Calculate success rate based on crew composition
  const calculateSuccessRate = (data) => {
    if (!data.length) return 0;
    
    let score = 0;
    const totalPossibleScore = data.length * 3; // Max 3 points per crewmate
    
    data.forEach(crewmate => {
      // Speed contributes to success
      if (crewmate.speed >= 8) score += 1.5;
      else if (crewmate.speed >= 5) score += 1;
      else score += 0.5;
      
      // Role importance
      if (crewmate.role === 'engineer') score += 1;
      else if (crewmate.role === 'scientist') score += 0.8;
      else if (crewmate.role === 'impostor') score -= 0.5; // Impostors reduce success!
      else score += 0.5;
      
      // Crew diversity (using color as proxy)
      if (data.filter(c => c.color === crewmate.color).length === 1) {
        score += 0.5; // Bonus for unique colors
      }
    });
    
    // Calculate percentage (0-100)
    const successPercentage = Math.min(100, Math.round((score / totalPossibleScore) * 100));
    setSuccessRate(successPercentage);
  };

  // Helper function to determine success text
  const getSuccessText = (rate) => {
    if (rate >= 90) return 'Exceptional';
    if (rate >= 75) return 'Excellent';
    if (rate >= 60) return 'Good';
    if (rate >= 40) return 'Average';
    if (rate >= 25) return 'Struggling';
    return 'Critical';
  };
  
  // Helper function to determine success class
  const getSuccessClass = (rate) => {
    if (rate >= 90) return 'exceptional';
    if (rate >= 75) return 'excellent';
    if (rate >= 60) return 'good';
    if (rate >= 40) return 'average';
    if (rate >= 25) return 'struggling';
    return 'critical';
  };

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
        <>
          {/* Crew Statistics Section */}
          <div className="crew-stats-container">
            <div className="crew-stats-header">
              <h2>Crew Statistics</h2>
              <div className={`success-rate ${getSuccessClass(successRate)}`}>
                <span className="success-label">Mission Success Rate:</span>
                <span className="success-value">{successRate}%</span>
                <span className="success-text">{getSuccessText(successRate)}</span>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Crewmate Roles</h3>
                <div className="stat-list">
                  {Object.keys(statistics.roles || {}).map(role => (
                    <div key={role} className="stat-item">
                      <span className="stat-name">{role.charAt(0).toUpperCase() + role.slice(1)}:</span>
                      <span className="stat-value">{statistics.roles[role].percentage}%</span>
                      <div className="stat-bar">
                        <div 
                          className="stat-fill" 
                          style={{ width: `${statistics.roles[role].percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Speed Analysis</h3>
                <div className="speed-stats">
                  <div className="stat-highlight">
                    <span>Average Speed</span>
                    <span className="highlight-value">{statistics.averageSpeed}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-name">Fast Crewmates:</span>
                    <span className="stat-value">{statistics.fastCrewmatesPercentage}%</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${statistics.fastCrewmatesPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Color Distribution</h3>
                <div className="color-distribution">
                  {Object.keys(statistics.colors || {}).map(color => (
                    <div 
                      key={color} 
                      className="color-stat" 
                      style={{ 
                        backgroundColor: color,
                        width: `${Math.max(5, statistics.colors[color].percentage)}%` 
                      }}
                      title={`${color}: ${statistics.colors[color].percentage}%`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Crewmate List with success-based styling */}
          <div className={`crewmates-grid success-level-${getSuccessClass(successRate)}`}>
            {crewmates.map((crewmate) => (
              <CrewmateCard key={crewmate.id} crewmate={crewmate} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryPage; 