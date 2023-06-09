import {
  Addition,
  DietPlanId,
  EXERCISE,
  UserPassword,
  WaterTrackerId,
  WeightReview,
  WorkoutPlanData,
  WorkoutPlanId,
} from './type';

export const Add = id => {
  return {type: Addition, id: id};
};
export const Exercise_Id = id => {
  return {type: EXERCISE, ExId: id};
};
export const Workout_Plan_Id = id => {
  return {type: WorkoutPlanId, ExId: id};
};
export const Diet_Id = id => {
  return {type: DietPlanId, ExId: id};
};
export const Water_Id = id => {
  return {type: WaterTrackerId, ExId: id};
};
export const User_password = id => {
  return {type: UserPassword, ExId: id};
};
export const DataWorkPlan = id => {
  return {type: WorkoutPlanData, ExId: id};
};
export const WeightReviewId = id => {
  return {type: WeightReview, ExId: id};
};
