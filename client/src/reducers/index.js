const INTITIAL_STATE={
    user: null,
    ideaList: {ideas:[], loading: true},
    userIdea:{ideas:[], loading: true},
    alert:{message:null, type:null, show:false}
};

const reducer = (state = INTITIAL_STATE, {type, payload})=>{
    switch(type)
    {
        case "LOGIN_SUCCESS": return {...state, user:payload.user}; 
        case "LOGOUT": return {...state, user:null};
        case "ALL_IDEAS": return {...state, ideaList:{ideas:payload, loading:false}};
        case "USER_IDEAS": return {...state, userIdea:{ideas:payload, loading:false}};
        case "LOGOUT": return {...state, user:null, userIdea:{ideas:[], loading: true}};
        case "SET_ALERT": return {...state, alert:{...payload, show:true}};
        case "REMOVE_ALERT": return {...state, alert:{message:null, type:null, show:false}};
        default: return state;
    }
}

export default reducer;