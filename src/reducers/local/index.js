
const INITIAL_STATE = {
    loggedIn: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_LOCAL_LOGGED_IN':

            console.log("SET_LOGGED_IN: ", action.payload)

            state.loggedIn = action.payload;

            return {
                ...state
            }

        default:
            return state
    }
};