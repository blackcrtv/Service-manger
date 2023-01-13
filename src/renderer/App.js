import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ConsoleFeedback from './modules/console-feedback';
import ServiceList from './modules/service-list';
import AddService from './modules/add-service';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          <ServiceList></ServiceList>
          <ConsoleFeedback></ConsoleFeedback>
          <AddService></AddService>
        </>
      } />
      </Routes>
    </Router>
  );
}
