
import { useSelector, useDispatch } from 'react-redux';
import { checkService, setLoading } from '../local/switch-reducer';
import { useState } from 'react';
import { FaSync } from 'react-icons/fa';
import classes from '../../css/restart-button.module.css';



const RestartRouter = (params) =>{
    const stateServices = useSelector(state => state.controlService.services);
    const [pressed, setPressed] = useState(false);
    const dispatch = useDispatch();


    const restartRouter = async ()=>{
        try {
            dispatch(setLoading({
                isLoading: true,
                id: params.id
            }));

            let resultApi = await restartCommand();
            if(!response) throw new Error('Eroare api!');

            dispatch(checkService({
                id: params.id,
                isActive: false,
                status:  resultApi.response,
                consoleMessage: 'Service "' + params.serv.alias + '" ' + resultApi.response + '...'
            }));

            dispatch(setLoading({
                id: params.id,
                isLoading: false
            }));
        } catch (error) {
            console.log(error);
            dispatch(setLoading({
                id: params.id,
                isLoading: false
            }));
        }
    }

    const restartCommand = async (service) => {
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/teltonik/restart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await responseAPI.json();
        } catch (error) {
            return false
        }
    }

    return (
        <button disabled={params.serv.isLoading || params.serv.isDisabled} onClick={restartRouter} className={classes['restart-button']}><FaSync></FaSync></button>
    )
}

export default RestartRouter;