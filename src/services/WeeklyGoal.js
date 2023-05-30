import {BaseUrlWeekGoal} from '../Helping/BaseUrl';

export const UpdateFirstDayInWeekApi = async (id, noOfDays) => {
  console.log(id, noOfDays);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        user_id: id,
        day: noOfDays,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWeekGoal}updateUserWeekGoals`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const AddFirstDayInWeekApi = async (id, noOfDays) => {
  console.log(id, noOfDays);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        user_id: id,
        day: noOfDays,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWeekGoal}setFirstDayOfWeek`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const AddWeeklyDataApi = async (id, noOfDays, date) => {
  console.log(id, noOfDays, date);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        no_of_days: noOfDays,
        created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWeekGoal}Addweek_goal`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
