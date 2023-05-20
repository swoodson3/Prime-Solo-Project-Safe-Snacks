
// Reducer function that handles the state updates for dogs
const dogsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DOGS':
        console.log('setting dogs', action.payload)
        // When the action type is 'SET_DOGS', update the state with the dog data from the action payload
      return action.payload;
      case 'CREATE_DOG':
        // When the action type is 'CREATE_DOG', add the newly created dog to the existing state by creating a new array with the existing state and the new dog
        return [...state, action.payload];
      default:
        return state;
    }
  };

  export default dogsReducer;

  

