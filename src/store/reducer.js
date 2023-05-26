const initialState = {
  id: null,
  exerciseId: null,
  dietPlanId: null,
  workoutPlanId: null,
  waterTrackerId: null,
  userPassword: null,
  workoutPlanData: [],
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Addition':
      return {...state, id: action.id};
    case 'ExerciseId':
      return {...state, exerciseId: action.ExId};
    case 'DietPlanId':
      return {...state, dietPlanId: action.ExId};
    case 'WorkoutPlanId':
      return {...state, workoutPlanId: action.ExId};
    case 'WaterTrackerId':
      return {...state, waterTrackerId: action.ExId};
    case 'UserPassword':
      return {...state, userPassword: action.ExId};
       case 'WorkoutPlanData':
      return {...state, workoutPlanData: action.ExId};
    default:
      break;
  }
};
export default mainReducer;
