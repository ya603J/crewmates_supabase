import { Link } from 'react-router-dom';
import crewmatesImg from '../assets/crewmates.43d07b24.png';
import ufoImg from '../assets/spaceship.3d8f767c.png'

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to the Crewmate Creator!</h1>
        
        <p className="welcome-text">
          Here is where you can create your very own set of crewmates before sending them off into space!
        </p>
        
        <div className="crewmates-image">
          <img src={crewmatesImg} alt="Crewmates" />
        </div>
        
        <div className="ufo-image">
          <img src={ufoImg} alt="UFO" />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 