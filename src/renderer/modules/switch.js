import { useState, useCallback, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';

import { setService, checkService, changeServiceStatus } from '../local/switch-reducer';

export default function ControlledSwitches(props) {
    const dispatch = useDispatch();
    const [disabledElement, setDisabled] = useState(true);
    const [flag, setFlag] = useState(false);

    const handleChange = async (event) => {
        try {
            let action = event.target.checked;

            setDisabled(true);
            setFlag(true);

            let wantedAction;
            if (action === true) {
                wantedAction = props.status.startCommand;
            } else {
                wantedAction = props.status.stopCommand;
            }

            let { response } = await controlService(wantedAction, props.status.name);

            if(response !== 'ERROR'){
                dispatch(setService({
                    isActive:!props.status.isActive, 
                    id: props.id,
                    status: response,
                    consoleMessage: 'Service "' + props.status.name + '" is ' + response + '...'  
                }));
            }else{
                dispatch(setService({
                    isActive: props.status.isActive, 
                    id: props.id,
                    status: response,
                    consoleMessage: 'ERROR start/stop"' + props.status.name + '"...'  
                }));
            }


            // setChecked(action);
            setFlag(false);
            setDisabled(false);

        } catch (error) {
            console.log(error);
            setFlag(false);
            setDisabled(false);
        }

    };

    useEffect(() => {
        if(flag) return null;
        const interval = setInterval(async () => {
            await setServices();
        }, 3000);
        return () => clearInterval(interval);
    }, [props.status.length]);


    const checkServices = async (statusCommand, service)=>{
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/${statusCommand}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: service
                })
            });
            return await responseAPI.json(); 
        } catch (error) {
            return {
                response: 'ERROR'
            }
        }
    }

    const setServices = async ()=>{
        let { response } = await checkServices(props.status.statusCommand, props.status.name);
        if(response === 'STOP_PENDING' || response === 'START_PENDING' || response === 'ERROR') setDisabled(true);
        else setDisabled(false);
        if(response !== 'ERROR')
            dispatch(checkService({
                id: props.id,
                isActive: (response === 'RUNNING' ? true : false),
                status: response,
                consoleMessage: 'Service "' + props.status.name + '" is ' + response + '...'  
            }))
    }

    const controlService = async (action, service)=>{
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/${action}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: service
                })
            });
            return await responseAPI.json(); 
        } catch (error) {
            return {
                response: 'ERROR'
            }
        }
    }

    return (
        <Switch
            checked={props.status.isActive}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={disabledElement}
            color='success'
        />
    );
}
