
import classes from '../../css/addService.module.css';
import { useEffect, useState } from 'react';
import AddServiceForm from './add-service-form';

const AddService = (params) => {

    const [click, setClicked ] = useState(false);

    const addServiceHandle = ()=>{
        setClicked((prevClick)=>{
            return !prevClick
        })
    }

    const isFormOK = ()=>{
        setClicked(false)
    }

    return (
    <div className={classes['wrapper']}>
        {(click ? <AddServiceForm clearForm={isFormOK}></AddServiceForm> : <></>)}
        <button onClick={addServiceHandle} className={(!click ? classes['btn'] : classes['hide-btn'])}>{click ? 'CLOSE' : '+Add Service'}</button>
    </div>
    );
}

export default AddService;