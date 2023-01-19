import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ConsoleFeedback from './modules/console-feedback';
import ServiceList from './modules/service-list';
import AddService from './modules/add-service';

import { useSelector, useDispatch } from 'react-redux';
import { loadServices} from './local/switch-reducer';
import { useEffect } from 'react';

export default function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    window.electron.ipcRenderer.on('ipc-example', (arg) => {
      console.log(arg)
        dispatch(loadServices({
            services: arg
        }));
    });
    window.electron.ipcRenderer.sendMessage('ipc-example', 'service-object');

  },[])



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
