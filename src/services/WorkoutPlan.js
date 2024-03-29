import {BaseUrl, BaseUrlWorkout} from '../Helping/BaseUrl';

export const GetBeginner = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}get_for_beginners?page=1&limit=20
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetAdvance = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}get_for_advance?page=1&limit=20
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetIntermediate = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}get_for_intermediate?page=1&limit=20
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetSearchData = async name => {
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
      `${BaseUrlWorkout}search_plan?name=${name}
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWorkoutById = async name => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}workoutPlansByCategory_id?category_id=${name}&page=1&limit=20
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWorkoutPlanById = async name => {
  console.log(name);
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}getWorkoutPlanById?workout_plan_id=${name}
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWorkoutPlanAll = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}getWorkoutPlanById?workout_plan_id=${id}
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const PostReview = async (id, plan_id, review) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        workout_plan_id: plan_id,
        review: review,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}review_on_workout
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const RestartProgressAPI = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}restartProgress?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetAllWorkoutPlanAPI = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}getAllWorkoutPlans?page=1&limit=50`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWeeklyReport = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}getWeekilyReport?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const StartWorkoutPlanApi = async (id, workoutId, PlanTime, time) => {
  console.log(id, workoutId, PlanTime, 'created_at ----->', time);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        workout_plan_id: workoutId,
        time: PlanTime,
        created_at: time,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}start_workout`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

// ------------- workout plan exercise------------------

export const ExerciseOfTheDay = async name => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrl}workout_plan_exersises/exersise_of_day
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetExerciseID = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrl}workout_plan_exersises/getAllExersises?page=1&limit=20`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
