import { BaseUrlPrivacy } from "../Helping/BaseUrl";

export const GetPrivacyApi = async (id, time) => {
    try {
      const requestOptions = {
        method: 'GET',
        // body: JSON.stringify({
        //   user_id: id,
        //   time: time,
        // }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      };
      const response = await fetch(
        `${BaseUrlPrivacy}getAllPrivacyPlicies`,
        requestOptions,
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  };