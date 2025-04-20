import { Link } from 'react-router-dom';

const CrewmateCard = ({ crewmate }) => {
  const { id, name, color, role } = crewmate;

  return (
    <div className="crewmate-card">
      <div className="crewmate-avatar" style={{ backgroundColor: color }}>
        <div className="crewmate-helmet"></div>
      </div>
      <div className="crewmate-info">
        <h3>{name}</h3>
        <p className="role">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </div>
      <div className="crewmate-actions">
        <Link to={`/crewmate/${id}`} className="view-btn">View</Link>
        <Link to={`/edit/${id}`} className="edit-btn">Edit</Link>
      </div>
    </div>
  );
};

export default CrewmateCard; 