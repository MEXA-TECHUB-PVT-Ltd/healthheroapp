import {
  Addition,
  DietPlanId,
  EmailRegisteredId,
  EXERCISE,
  PaymentPriceId,
  PaymentSuccessfulId,
  PlanDataExerciseID,
  SevenByFourDayId,
  SevenByFourId,
  SevenByFourWeekId,
  TimeTaken,
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
export const TimeTakenAction = id => {
  return {type: TimeTaken, ExId: id};
};
export const SevenByFour = id => {
  return {type: SevenByFourId, ExId: id};
};
export const SevenByFourWeek = id => {
  return {type: SevenByFourWeekId, ExId: id};
};
export const SevenByFourDay = id => {
  return {type: SevenByFourDayId, ExId: id};
};

export const PlanDataExercise = id => {
  return {type: PlanDataExerciseID, ExId: id};
};
export const EmailRegistered = id => {
  return {type: EmailRegisteredId, ExId: id};
};
export const PaymentSuccessful = id => {
  return {type: PaymentSuccessfulId, ExId: id};
};
export const PaymentPrice = id => {
  return {type: PaymentPriceId, ExId: id};
};
