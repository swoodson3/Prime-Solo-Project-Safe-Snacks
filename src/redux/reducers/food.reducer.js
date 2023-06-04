

const foodReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FOOD':
        console.log('setting food', action.payload);
        return action.payload;
      case 'CREATE_FOOD':
        return [...state, action.payload];
        case 'ADD_FOOD':
            return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default foodReducer;