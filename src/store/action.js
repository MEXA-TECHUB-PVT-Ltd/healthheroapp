import {Addition, Assign, EXERCISE, Subtraction} from './type';

export const Add = id => {
  return {type: Addition, id: id};
};
export const ExerCiseId = id => {
  return {type: EXERCISE, ExId: id};
};
