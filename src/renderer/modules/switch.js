import { useState, useEffect, useCallback } from 'react';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';

import { setService, checkService, setLoading, setError } from '../local/switch-reducer';

export default function ControlledSwitches(props) {
    const dispatch = useDispatch();
    const [disabledElement, setDisabled] = useState(true);
    const [flag, setFlag] = useState(false);

    const handleChange = async (event) => {
        try {
            let action = event.target.checked;

            setDisabled(true);
            setFlag(true);
            dispatch(setLoading({
                id: props.id,
                isLoading: true
            }));

            let wantedAction;
            if (action === true) {
                wantedAction = props.status.startCommand;
            } else {
                wantedAction = props.status.stopCommand;
            }
            await new Promise((resolve, reject) => {
                setTimeout(() => { resolve(true) }, 4000)
            })
            let { response } = await controlService(wantedAction, props.status);

            if (response !== 'ERROR' && response !== 'NO-CONNECTION' && response !== 'Timeout' && response !== 'N/A') {
                dispatch(setService({
                    isActive: !props.status.isActive,
                    id: props.id,
                    status: response,
                    consoleMessage: 'Service "' + props.status.name + '" is ' + response + '...'
                }));
                setDisabled(false);
            } else {
                dispatch(setService({
                    isActive: props.status.isActive,
                    id: props.id,
                    status: response,
                    consoleMessage: 'ERROR start/stop"' + props.status.name + '"...'
                }));
            }


            // setChecked(action);
            setFlag(false);

        } catch (error) {
            console.log(error);
            setFlag(false);
            setDisabled(false);
            dispatch(setLoading({
                id: props.id,
                isLoading: false
            }));
        }

    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if (props.status.isLoading) return;
            let { response } = await checkServices(props.status.statusCommand, props.status.name);
            console.log('In' + props.status.name + " " + response)
            setServices(response);
        }, 5000);
        return () => { clearInterval(interval) };
    }, [props.status.isLoading])


    const checkServices = async (statusCommand, service) => {
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
            dispatch(setError({error: true}));
            return {
                response: 'ERROR'
            }
        }
    }

    const setServices = (response) => {
        if (response === 'STOP_PENDING' || response === 'START_PENDING' || response === 'ERROR' || response === 'NO-CONNECTION' || response === 'Timeout') setDisabled(true);
        else setDisabled(false);
        if (response !== 'ERROR')
            dispatch(checkService({
                id: props.id,
                isActive: (response.includes('RUNNING') ? true : false),
                status: response,
                consoleMessage: 'Service "' + props.status.name + '" is ' + response + '...'
            }))
    }

    const controlService = async (action, service) => {
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/${action}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: service.name,
                    dependencies: service.dependencies
                })
            });
            return await responseAPI.json();
        } catch (error) {
            dispatch(setError({error: true}));
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
            disabled={props.status.isLoading || disabledElement}
            color='success'
        />
    );
}
