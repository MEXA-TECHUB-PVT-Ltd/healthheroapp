import {BaseUrl, BaseUrlWorkout} from '../Helping/BaseUrl';

export const GetBeginner = async () => {
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
      `${BaseUrlWorkout}get_for_beginners?page=1&limit=1
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
      //   body: new URLSearchParams({
      //     email: email,
      //     password: password,
      //   }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}get_for_advance?page=1&limit=1
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
      //   body: new URLSearchParams({
      //     email: email,
      //     password: password,
      //   }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlWorkout}get_for_intermediate?page=1&limit=1
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


// ------------- workout plan exercise------------------

export const ExerciseOfTheDay = async name => {
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
      `${BaseUrl}workout_plan_exersises/exersise_of_day
        `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}