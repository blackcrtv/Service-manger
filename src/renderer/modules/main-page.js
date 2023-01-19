import ConsoleFeedback from './console-feedback';
import ServiceList from './service-list';
import AddService from './add-service';
import ErrorModule from './error-module';

import { useSelector, useDispatch } from 'react-redux';
import { loadServices, setError } from '../local/switch-reducer';
import { useEffect, useState } from 'react';

const MainPage = ()=>{
    const stateServices = useSelector(state => state.controlService.services);
    const errorConn = useSelector(state => state.controlService.errorConnection);

    const dispatch = useDispatch();
    // const [error, setError] = useState(false);
    const [req, setReq] = useState(false);
  
    useEffect(()=>{
      getData().then((response)=>{
        if(response === false || response.error === true){
            return dispatch(setError({error: true}));
        }
        dispatch(loadServices({
            services: response.response
        }));
        dispatch(setError({error: false}));
        setReq(true);
      })
      return () => {};
    },[])
    
    const retryFunction = async () =>{
        let response = await getData();

        if(response === false || response.error === true){
            return dispatch(setError({error: true}));
        }
        dispatch(loadServices({
            services: response.response
        }));
        dispatch(setError({error: false}));
        setReq(true);
    }

    const getData = async () => {
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/file/load`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await responseAPI.json();
        } catch (error) {
            return false
        }
    }

    let display = <></>;
    if(errorConn){
        display = <ErrorModule onRetry={retryFunction}></ErrorModule>;
    }else if(req){
        display = <>
            <ServiceList></ServiceList>
            {stateServices.length > 0 ? <AddService></AddService> : <></>}
            <ConsoleFeedback></ConsoleFeedback>
        </>
    }

    return (<>
        { display }
    </>
    )
}

export default MainPage;


