import ControlledSwitches from './switch';
import { BarLoader } from 'react-spinners';
import classes from '../../css/services.module.css';
import { useSelector } from 'react-redux';

const ServiceList = () => {

    const stateServices = useSelector(state => state.controlService.services);

    return (
      stateServices.map((serv, i) => {
        let style = '';
            if(serv.status === "RUNNING"){
                style = "active";
            }else if(serv.status === "STOPPED"){
                style = "stopped";
            }else if(serv.status.includes("RUNNING") || serv.status.includes("STOPP")){
                style = "pending";
            }else if(serv.status.includes("ERROR")){
                style = "error";
            }
            return (
                <div key={i} className={`${classes['wrapper-elements']} ${classes[style]}`}>
                    <div className={classes['service-name']}>{serv.name}</div>
                    <ControlledSwitches status={serv} id={i}></ControlledSwitches>
                    {serv.status}
                    {serv.isLoading ? <BarLoader height = {5} width={200} color = {serv.isActive ? "#d63636" : "#15762a"}></BarLoader> : <></>}
                </div>
            )
        })

    );
}

export default ServiceList;