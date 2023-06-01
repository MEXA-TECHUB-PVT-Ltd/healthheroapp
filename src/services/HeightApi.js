import {BaseUrlHeightApi, BaseUrlWorkout} from '../Helping/BaseUrl';

export const GetWeeklyWeightApi = async id => {
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
      `${BaseUrlHeightApi}getWeightHistory?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const AddWeightWithoutProfileApi = async (id, weight, unit) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        weight: weight,
        weight_unit: unit,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlHeightApi}addWeight`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const UpdateWeightWithoutProfileApi = async (id, weight, unit) => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        weight_review_id: id,
        weight: weight,
        weight_unit: unit,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlHeightApi}updateWeight`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
