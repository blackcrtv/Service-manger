import { createSlice } from '@reduxjs/toolkit';

export const controlService = createSlice({
    name: 'manageService',
    initialState: {
        services: [],
        consoleMessages: [],
        errorConnection: false
    },
    reducers: {
        setService: (state, action) => {
            let servicesNew = state.services.map((serv, i)=>{
                if(i === action.payload.id){
                    serv = {
                        ...serv,
                        status: action.payload.status,
                        isActive: action.payload.isActive,
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
        loadServices: (state, action) =>{
            return {
                ...state,
                services:[
                    ...action.payload.services
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
                        alias: action.payload.alias,
                        os: (action.payload.os === 'rdp' ? "windows" : "router"),
                        dependencies: action.payload.dependencies,
                        status: "IDLE",
                        startCommand: (action.payload.os === 'rdp' ? "rdp/start" : "teltonik/start"),
                        stopCommand: (action.payload.os === 'rdp' ? "rdp/stop" : "teltonik/stop"),
                        statusCommand: (action.payload.os === 'rdp' ? "rdp/status" : "teltonik/status"),
                        isActive: false,
                        isLoading: false,
                        isDisabled: true
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
                        isActive: action.payload.isActive,
                        isDisabled: false
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
        },
        setDisabled: (state, action) => {

            let servicesNew = state.services.map((serv, i)=>{
                if(i === action.payload.id){
                    serv = {
                        ...serv,
                        isDisabled: action.payload.isDisabled
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
        },
        setError: (state, action) => {
            return {
                ...state,
                errorConnection: action.payload.error
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setService,setError, checkService, addService, setLoading, popConsole, loadServices, setDisabled } = controlService.actions

export default controlService.reducer