import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { stages } from './config/stages';
import TopNav from './components/TopNav/TopNav';
import StagePage from './pages/StagePage/StagePage';

export default function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        {stages.map((stage) => (
          <Route
            key={stage.id}
            path={stage.path}
            element={<StagePage key={stage.id} stage={stage} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
