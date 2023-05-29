

// Reducer function that handles the state updates for dangerous foods
const dangerousfoodsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DANGEROUS_FOODS':
        return action.payload;
      case 'ADD_DANGEROUS_FOOD':
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default dangerousfoodsReducer;
  