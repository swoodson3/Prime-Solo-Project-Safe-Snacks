const dogsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DOGS':
        return action.payload;
      case 'CREATE_DOG':
        return [...state, action.payload];
      default:
        return state;
    }
  };

  export default dogsReducer;

  

