import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './modules/main-page';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          <MainPage></MainPage>
        </>
      } />
      </Routes>
    </Router>
  );
}
