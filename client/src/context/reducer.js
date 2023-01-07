
export const actionType = {
    SET_USER: 'SET_USER',
    SET_HACKTHONS: 'SET_HACKATHONS'
}


export const reducer =(state, action)=>{
    switch(action.type){
        case actionType.SET_USER:
            return {...state, user: action.user};

        case actionType.SET_HACKTHONS:
            return {...state, hackathons: action.hackathons};
    }
}