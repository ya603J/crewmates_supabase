import { NavLink } from 'react-router-dom';
import peekingImg from '../assets/peeking.7c0ab599.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Home
        </NavLink>
        
        <NavLink to="/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Create a Crewmate!
        </NavLink>
        
        <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Crewmate Gallery
        </NavLink>
      </nav>
      
      <div className="spaceship-container">
        <img src={peekingImg} alt="Spaceship" className="spaceship-img" />
      </div>
    </div>
  );
};

export default Sidebar; 