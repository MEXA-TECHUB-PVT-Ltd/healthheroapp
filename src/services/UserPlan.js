import {BaseUrlCategory, BaseUrlPlan, BaseUrlWorkout} from '../Helping/BaseUrl';

export const GetPlanApi = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      //   body: new URLSearchParams({
      //     email: email,
      //     password: password,
      //   }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlPlan}getAllUserPlans?user_id=${id}&page=1&limit=50
          `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const CreatePlanApi = async (
  id,
  name,
  description,
  exercise,
  dateTime,
) => {
  console.log(id, name, description, exercise, dateTime);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        plan_name: name,
        description: description,
        exersise_ids: exercise,
        created_at: dateTime,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlPlan}create_my_plan`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const AddExercise = async (id, workout_plan_id, array) => {
  console.log(id, workout_plan_id, array);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        user_id: id,
        workout_plan_id: workout_plan_id,
        array: array,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlPlan}addExersise_in_myPlan`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
