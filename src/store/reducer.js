const initialState = {
  id: 0,
  exerciseId: 0,
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Addition':
      return {
        id: action.id,
      };
    // case 'EXERCISE':
    //   return {
    //     exerciseId: action.id,
    //   };

    default:
      break;
  }
};
export default mainReducer;
