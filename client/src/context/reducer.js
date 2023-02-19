
export const actionType = {
    SET_USER: 'SET_USER',
    SET_HACKTHONS: 'SET_HACKATHONS',
    SET_ALL_USERS: 'SET_ALL_USERS'
}


export const reducer =(state, action)=>{
    switch(action.type){
        case actionType.SET_USER:
            return {...state, user: action.user};

        case actionType.SET_HACKTHONS:
            return {...state, hackathons: action.hackathons};

        case actionType.SET_ALL_USERS: 
            return {...state, allUsers: action.allUsers};

    }
}