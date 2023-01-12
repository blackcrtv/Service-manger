import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ConsoleFeedback from './modules/console-feedback';
import ServiceList from './modules/service-list';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          <ServiceList></ServiceList>
          <ConsoleFeedback></ConsoleFeedback>
        </>
      } />
      </Routes>
    </Router>
  );
}
