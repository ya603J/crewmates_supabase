import { Link } from 'react-router-dom';
import CrewmateForm from '../components/CrewmateForm';

const CreatePage = () => {
  return (
    <div className="create-page">
      <div className="page-header">
        <h1>Create a Crewmate!</h1>
        <p>Design your perfect crewmate before sending them to space</p>
      </div>
      
      <CrewmateForm />
      
      <div className="page-navigation">
        <Link to="/gallery" className="nav-link">View All Crewmates</Link>
      </div>
    </div>
  );
};

export default CreatePage; 