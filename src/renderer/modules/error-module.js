import classes from '../../css/error.module.css';

const ErrorModule = (props)=>{
    return (<>
       <div className={classes['wrapper']}>
        <h1>Can't connect to api! Try start/restart windows service Teltonik-Rdp</h1>
        <button onClick={props.onRetry}>Retry</button>
       </div>
    </>
    )
}

export default ErrorModule;


