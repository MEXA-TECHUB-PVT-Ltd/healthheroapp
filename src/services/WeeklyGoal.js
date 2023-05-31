import {BaseUrlWeekGoal} from '../Helping/BaseUrl';

export const UpdateFirstDayInWeekApi = async (id, noOfDays) => {
  console.log(id, noOfDays, 'update one');
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
      `${BaseUrlWeekGoal}updateFirstDayOfWeek`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const AddFirstDayInWeekApi = async (id, noOfDays) => {
  console.log(id, noOfDays, 'add one is');
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

export const GetProgressReportApi = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: JSON.stringify({
      //   user_id: id,
      //   plan_id: planId,
      //   exersise_id: exercise,
      // }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWeekGoal}getProgressOfThisWeek?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWeeklyGoalDaysApi = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: JSON.stringify({
      //   user_id: id,
      //   plan_id: planId,
      //   exersise_id: exercise,
      // }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWeekGoal}getDaysOfTraining?user_id=${id}`,
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
export const UpdateWeeklyDataApi = async (id, noOfDays, date) => {
  console.log(id, noOfDays);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        user_id: id,
        no_of_days: noOfDays,
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
