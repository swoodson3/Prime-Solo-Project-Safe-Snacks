// Reducer function that handles the state updates for dangerous plants
const dangerousplantsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DANGEROUS_PLANTS':
            return action.payload;
        case 'ADD_DANGEROUS_PLANT':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default dangerousplantsReducer;