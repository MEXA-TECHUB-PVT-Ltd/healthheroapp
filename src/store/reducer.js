const initialState = {
  id: null,
  exerciseId: null,
  dietPlanId: null,
  workoutPlanId: null,
  waterTrackerId: null,
  userPassword: null,
  workoutPlanData: [],
  WeightReview: null,
  TimeTaken: null,
  SevenByFourId: null,
  SevenByFourWeekId: null,
  SevenByFourDayId: null,
  PlanDataExerciseID: [],
  EmailRegisteredId: null,
  PaymentSuccessfulId: null,
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
    case 'WeightReview':
      return {...state, WeightReview: action.ExId};
    case 'TimeTaken':
      return {...state, TimeTaken: action.ExId};
    case 'SevenByFourId':
      return {...state, SevenByFourId: action.ExId};
    case 'SevenByFourWeekId':
      return {...state, SevenByFourWeekId: action.ExId};
    case 'SevenByFourDayId':
      return {...state, SevenByFourDayId: action.ExId};
    case 'PlanDataExerciseID':
      return {...state, PlanDataExerciseID: action.ExId};
    case 'EmailRegisteredId':
      return {...state, EmailRegisteredId: action.ExId};
    case 'PaymentSuccessfulId':
      return {...state, PaymentSuccessfulId: action.ExId};
    default:
      break;
  }
};
export default mainReducer;
