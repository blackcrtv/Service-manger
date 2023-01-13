
import classes from '../../css/addService.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { popConsole } from '../local/switch-reducer';

const AddService = (params) => {

    const [click, setClicked ] = useState(false)

    const addServiceHandle = ()=>{
        setClicked(true)
        setTimeout(()=>{
            setClicked(false)
        },3000)
    }

    return (
    <div className={classes['wrapper']}>
        <button onClick={addServiceHandle}>+ Add service</button>
        {(click ? <div>Nu e gata inca</div> : <></>)}
    </div>
    );
}

export default AddService;