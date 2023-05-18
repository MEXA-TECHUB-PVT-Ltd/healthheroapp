import { BaseUrlRest } from "../Helping/BaseUrl";

export const GetRestTimeApi = async (id) => {
    try {
      const requestOptions = {
        method: 'GET',
        // body: JSON.stringify({
        //   user_id: id,
        //   plan_name: name,
        //   description: description,
        //   exersise_ids: exercise,
        //   created_at:dateTime
        // }).toString(),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(
        `${BaseUrlRest}getRestTimeOfUser?user_id=${id}`,
        requestOptions,
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  };