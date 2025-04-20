import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-logo">
        Crewmate Creator
      </Link>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link create">Create Crewmate</Link>
      </div>
    </nav>
  );
};

export default Navigation; 