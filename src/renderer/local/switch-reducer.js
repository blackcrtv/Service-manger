import { createSlice } from '@reduxjs/toolkit';

const servicesObject = [
    {
      name: "TeamViewer",
      os: "router",
      status: "IDLE",
      startCommand: "rdp/start",
      stopCommand: "rdp/stop",
      statusCommand: "rdp/status",
      isActive: false
    },
    {
      name: "XboxGipSvc",
      os: "windows",
      status: "IDLE",
      startCommand: "rdp/start",
      stopCommand: "rdp/stop",
      statusCommand: "rdp/status",
      isActive: false
    },
    {
      name: "RabbitMQ",
      os: "windows",
      status: "IDLE",
      startCommand: "rdp/start",
      stopCommand: "rdp/stop",
      statusCommand: "rdp/status",
      isActive: false
    }
  ]


export const controlService = createSlice({
    name: 'manageService',
    initialState: {
        services: servicesObject,
        consoleMessages: []
    },
    reducers: {
        setService: (state, action) => {
            let servicesNew = state.services.map((serv, i)=>{
                if(i === action.payload.id){
                    serv = {
                        ...serv,
                        status: action.payload.status,
                        isActive: !serv.isActive
                    }
                }
                return serv;
            });
            return {
                ...state,
                services:[
                    ...servicesNew
                ],
                consoleMessages: [
                    ...state.consoleMessages, 
                    action.payload.consoleMessage
                ]
            }
        },
        addService: (state, action) => {
            return {
                ...state,
                services:[
                    ...state.services,
                    {
                        name: action.payload.name,
                        os: (action.payload.os === 'rdp' ? "windows" : "router"),
                        status: "IDLE",
                        startCommand: (action.payload.os === 'rdp' ? "rdp/start" : "teltonik/start"),
                        stopCommand: (action.payload.os === 'rdp' ? "rdp/stop" : "teltonik/stop"),
                        statusCommand: (action.payload.os === 'rdp' ? "rdp/status" : "teltonik/status"),
                        isActive: false
                    }
                ]
            }
        },
        popConsole:(state)=>{
            let newArr = state.consoleMessages.filter((e,i)=>{
                if(i !== 0) return e;
            })
            return {
                ...state,
                consoleMessages: newArr
            }
        },
        checkService: (state, action) => {
            if(state.services[action.payload.id].status === action.payload.status && state.services[action.payload.id].isActive === action.payload.isActive) return {...state}
            let servicesNew = state.services.map((serv, i)=>{
                if(i === action.payload.id){
                    serv = {
                        ...serv,
                        status: action.payload.status,
                        isActive: action.payload.isActive
                    }
                }
                return serv;
            });
            return {
                ...state,
                services:[
                    ...servicesNew
                ],
                consoleMessages: [
                    ...state.consoleMessages, 
                    action.payload.consoleMessage
                ]
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setService, checkService, addService, changeServiceStatus, popConsole } = controlService.actions

export default controlService.reducer