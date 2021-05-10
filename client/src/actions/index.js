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
        dispatch(getAllIdeas());
        //alert
    } catch (error) {
        console.log(error);
    }
};

export const updateIdea = (body, id)=>async dispatch=>{
    try {
        const res = await api.put(`/idea/${id}`, body);
        dispatch(getAllIdeas());
    } catch (error) {
        console.log(error);
    }
};

export const deleteIdea = (id)=>async dispatch=>{
    try {
        const res = await api.delete(`/idea/${id}`);
        dispatch(getAllIdeas());
        dispatch(getUserIdeas());
        //alert
    } catch (error) {
        console.log(error);
    }
};

export const vote = (id)=>async dispatch=>{
    try {
        const res = await api.post(`/idea/vote/${id}`);
        dispatch(getAllIdeas());
    } catch (error) {
        console.log(error);
    }
};