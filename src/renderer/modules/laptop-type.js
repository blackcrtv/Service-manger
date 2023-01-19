import classes from '../../css/laptopType.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { loadServices } from '../local/switch-reducer';

const LaptopType = ()=>{
    const dispatch = useDispatch();

    const handleClick = async (event) =>{
        let callResp = await postAPI(event.target.value);
        if(callResp === false || callResp?.error === true){
            return console.log('Eroare')
        }
        dispatch(loadServices({
            services: callResp.response
        }));
    }

    const postAPI = async (value) =>{
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/file/get-remote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: value
                })
            });
            return await responseAPI.json();
        } catch (error) {
            return false;
        }
    }

    return (<>
       <div className={classes['wrapper']}>
        <h1>Choose type of remote desktop</h1>
        <div className={classes['buttons']}>
            <button onClick={handleClick} value='tightVNC'>TightVNC</button>
            <button onClick={handleClick} value='rdp'>RDP service</button>
        </div>
       </div>
    </>
    )
}

export default LaptopType;


