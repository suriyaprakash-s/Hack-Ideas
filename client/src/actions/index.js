import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

//Authentication
export const login = (user)=> async dispatch=>{
    const body = {user:user}
    try {
        const res = await api.post('/auth', body);
        dispatch({type: "LOGIN_SUCCESS", payload: body});
        setAuthToken(res.data);
        dispatch(getUserIdeas());
    } catch (error) {
        console.log(error);
        dispatch(logout());
    }
};
export const logout = ()=>{
    setAuthToken(null);
    return { type: "LOGOUT" };
};
export const loadUser = ()=>async dispatch=>{
    try {
        const res = await api.get('/auth');
        dispatch({type: "LOGIN_SUCCESS", payload: {user:res.data}});
    } catch (error) {
        console.log(error);
        dispatch(logout());
    }
}

//Ideas
export const getAllIdeas = ()=>async dispatch=>{
    try {
        const res = await api.get('/idea/all');
        dispatch({type:"ALL_IDEAS", payload: res.data});
    } catch (error) {
        console.log(error);
    }
};

export const getUserIdeas = ()=>async dispatch=>{
    try {
        const res = await api.get('/idea/me');
        dispatch({type:"USER_IDEAS", payload: res.data});
    } catch (error) {
        console.log(error);
    }
};

export const createIdea = (body)=>async dispatch=>{
    try {
        const res = await api.post('/idea/', body);
        dispatch(setAlert("Idea created successfully!!!", "success"))
        dispatch(getAllIdeas());
        dispatch(getUserIdeas());
        
    } catch (error) {
        console.log(error);
        dispatch(setAlert("Failed to create Idea, try again later!!!", "error"));
    }
};

export const updateIdea = (body, id)=>async dispatch=>{
    try {
        const res = await api.put(`/idea/${id}`, body);
        dispatch(setAlert("Idea updated successfully!!!", "success"))
        dispatch(getAllIdeas());
        dispatch(getUserIdeas());
    } catch (error) {
        console.log(error);
        dispatch(setAlert("Failed to update Idea, try again later!!!", "error"));
    }
};

export const deleteIdea = (id)=>async dispatch=>{
    try {
        const res = await api.delete(`/idea/${id}`);
        dispatch(getAllIdeas());
        dispatch(getUserIdeas());
        //alert
        dispatch(setAlert("Idea deleted successfully!!!", "success"));
    } catch (error) {
        console.log(error);
        dispatch(setAlert("Failed to delete Idea, try again later!!!", "error"));
    }
};

export const vote = (id)=>async dispatch=>{
    try {
        const res = await api.post(`/idea/vote/${id}`);
        dispatch(getAllIdeas());
        dispatch(getUserIdeas());
    } catch (error) {
        console.log(error);
    }
};

//Alert
export const setAlert = (message, type)=> async dispatch=>{
    dispatch({type:"SET_ALERT", payload:{message:message, type:type}});
    setTimeout(()=>dispatch(removeAlert()), 5000);
}
export const removeAlert = ()=> {
    return {type:"REMOVE_ALERT"}
}