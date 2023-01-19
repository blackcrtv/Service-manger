import classes from '../../css/addForm.module.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addService } from '../local/switch-reducer';


const AddServiceForm = (props)=>{
    const dispatch = useDispatch();

    const [formClear, setFormClear ] = useState(false);

    const setForm = ()=>{
        let inputService = document.getElementById('service-name').value;
        let aliasService = document.getElementById('service-alias').value;
        let selectOsType = document.getElementById('os-type').value;
        let dependenciesString = document.getElementById('dependencies').value;
        if(inputService === ''){
            return;
        }
        setFormClear(true);

        setData({name: inputService, alias: aliasService, dependencies: (dependenciesString !== '' ? dependenciesString.split(',') : []), os: selectOsType}).then((response)=>{
            if(response === false || response?.response === false){
                return false;
            }
            dispatch(addService({
                name: inputService,
                alias: aliasService,
                dependencies: (dependenciesString !== '' ? dependenciesString.split(',') : []),
                os: selectOsType
            }));
        })
    }

    const setData = async (service) => {
        try {
            let responseAPI = await fetch(`http://localhost:5004/api/file/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: {
                        name: service.name,
                        alias: service.alias,
                        os: (service.os === 'rdp' ? "windows" : "router"),
                        dependencies: service.dependencies,
                        status: "IDLE",
                        startCommand: (service.os === 'rdp' ? "rdp/start" : "teltonik/start"),
                        stopCommand: (service.os === 'rdp' ? "rdp/stop" : "teltonik/stop"),
                        statusCommand: (service.os === 'rdp' ? "rdp/status" : "teltonik/status"),
                        isActive: false,
                        isLoading: false
                    }
                }
                )
            });
            return await responseAPI.json();
        } catch (error) {
            return false
        }
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
                <label>Alias: </label>
                <input id='service-alias' placeholder='Service alias...'></input>
            </div>
            <div>
                <label>Dependencies: </label>
                <input id='dependencies' placeholder='Dependencies with ","'></input>
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