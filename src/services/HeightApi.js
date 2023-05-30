import { BaseUrlHeightApi, BaseUrlWorkout } from "../Helping/BaseUrl";

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
        `${BaseUrlHeightApi}getWeekilyWeightReport?user_id=${id}`,
        requestOptions,
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  };