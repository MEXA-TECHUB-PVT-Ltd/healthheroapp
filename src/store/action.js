import {Addition, Assign, EXERCISE, Subtraction} from './type';

export const Add = id => {
  return {type: Addition, id: id};
};
export const ExerCise = id => {
  return {type: EXERCISE, id: id};
};
