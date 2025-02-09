import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router basename="/imageboard">
      <Routes>
        {/* Hauptseite */}
        <Route path="/" element={<MainPage />} />

        {/* Dynamische Boards basierend auf der URL */}
        <Route path="/:boardName" element={<BoardPage />} />

        {/* Fallback für ungültige Routen */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}