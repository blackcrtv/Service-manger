import classes from '../../css/console.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { popConsole } from '../local/switch-reducer';

const ConsoleFeedback = (params) => {
    const dispatch = useDispatch();
    const consoleMessages = useSelector(state => state.controlService.consoleMessages)

    useEffect(()=>{
        removeMessage();
        return ()=>{}
    },[consoleMessages])

    const removeMessage = async ()=>{
        console.log('Delete')
        await new Promise((resolve, reject)=>{
            setTimeout(()=>{resolve(true)},3000)
        });
        if(consoleMessages.length) dispatch(popConsole());
    }

    return (
        (
            consoleMessages.length ? <div className={classes.console}>
             {
                 consoleMessages.map((mess,i)=>{
                     return <div key={i} className={classes['log-mess']}>{mess}</div>
                 })
             }
            </div>
            :
            <></>

        )
    );
}

export default ConsoleFeedback;