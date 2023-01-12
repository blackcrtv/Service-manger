import Switch from './switch';
import classes from '../../css/services.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';


const ServiceList = (params) => {

    const stateServices = useSelector(state => state.controlService.services)

    return (
      stateServices.map((serv, i) => {
            return (
                <div key={i} className={`${classes['wrapper-elements']} ${serv.status === "RUNNING" ? classes.active : classes.stopped}`}>
                    <div className={classes['service-name']}>{serv.name}</div>
                    <Switch status={serv} id={i}></Switch>
                    {serv.status}
                </div>
            )
        })

    );
}

export default ServiceList;