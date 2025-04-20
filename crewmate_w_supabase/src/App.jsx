import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/crewmate/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
