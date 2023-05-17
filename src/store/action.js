import {Addition, Assign, Subtraction} from './type';

export const Add = id => {
  return {type: Addition, id: id};
};
