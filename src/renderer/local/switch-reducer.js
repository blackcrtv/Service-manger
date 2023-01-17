import { createSlice } from '@reduxjs/toolkit';

const servicesObject = [
    {
      name: "TermService",
      os: "windows",
      dependencies: ["UmRdpService"],
      status: "IDLE",
      startCommand: "rdp/start",
      stopCommand: "rdp/stop",
      statusCommand: "rdp/status",
      isActive: false,
      isLoading: false
    },
    {
        name: "Teltonik",
        os: "router",
        dependencies: [],
        status: "IDLE",
        startCommand: "teltonik/start",
        stopCommand: "teltonik/stop",
        statusCommand: "teltonik/status",
        isActive: false,
        isLoading: false
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
                        isActive: !serv.isActive,
                        isLoading: false
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
                        dependencies: action.payload.dependencies,
                        status: "IDLE",
                        startCommand: (action.payload.os === 'rdp' ? "rdp/start" : "teltonik/start"),
                        stopCommand: (action.payload.os === 'rdp' ? "rdp/stop" : "teltonik/stop"),
                        statusCommand: (action.payload.os === 'rdp' ? "rdp/status" : "teltonik/status"),
                        isActive: false,
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
            if(state.services[action.payload.id].isLoading) return {...state}
            
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
        },
        setLoading: (state, action) => {

            let servicesNew = state.services.map((serv, i)=>{
                if(i === action.payload.id){
                    serv = {
                        ...serv,
                        isLoading: action.payload.isLoading
                    }
                }
                return serv;
            });
            return {
                ...state,
                services:[
                    ...servicesNew
                ]
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setService, checkService, addService, setLoading, popConsole } = controlService.actions

export default controlService.reducer