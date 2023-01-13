import classes from '../../css/addForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addService } from '../local/switch-reducer';


const AddServiceForm = (props)=>{
    const dispatch = useDispatch();

    const [serviceName, setServiceName ] = useState('');
    const [osType, setOsType ] = useState('rdp');
    const [formClear, setFormClear ] = useState(false);

    const setForm = (event)=>{
        let inputService = document.getElementById('service-name').value;
        let selectOsType = document.getElementById('os-type').value;
        if(inputService === ''){
            return;
        }
        setFormClear(true)
        dispatch(addService({
            name: inputService,
            os: selectOsType
        }))
    }

    useEffect(()=>{
        if(formClear){
            document.getElementById('service-name').html = '';
            props.clearForm();
            setFormClear(false);
        }
    },[formClear])

    return(
        <div className={classes['wrapper']}>
            <div>
                <label>Service: </label>
                <input id='service-name' placeholder='Service name...'></input>
            </div>
            <div>
                <label>OS type: </label>
                <select id='os-type' placeholder='OS type'>
                    <option value='rdp'>Windows</option>
                    <option value='teltonik'>Router</option>
                </select>
            </div>
            <button onClick={setForm} className={classes['submit-button']}>Submit</button>
        </div>
    )
}

export default AddServiceForm;