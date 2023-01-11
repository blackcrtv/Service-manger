// import Switch from './switch';
import classes from '../../css/services.module.css';
// import { useDispatch, useSelector } from 'react-redux';

const servicesObject = [
    {
      name: "TeamViewer",
      os: "router",
      status: "STOPPED",
      startCommand: "teltonik/start",
      stopCommand: "teltonik/start"
    },
    {
      name: "XboxGipSvc",
      os: "windows",
      status: "RUNNING",
      startCommand: "rdp/start",
      stopCommand: "rdp/start"
    },
    {
      name: "RabbitMQ",
      os: "windows",
      status: "RUNNING",
      startCommand: "rdp/start",
      stopCommand: "rdp/start"
    }
  ]

const ServiceList = (params) => {

    // const stateServices = useSelector(state => state.controlService)

    return (
        servicesObject.map((serv, i) => {
            return (
                <div key={i} className={`${classes['wrapper-elements']} ${serv.status === "RUNNING" ? classes.active : classes.stopped}`}>
                    <div>{serv.name}</div>
                    {/* <Switch status={serv}></Switch> */ 'action'}
                    <div>{serv.status}</div>
                    {/* {stateServices[serv.name]?.status} */}
                </div>
            )
        })

    );
}

export default ServiceList;