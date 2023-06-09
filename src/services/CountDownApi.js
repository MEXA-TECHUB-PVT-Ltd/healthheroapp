import {BaseUrlCountDown} from '../Helping/BaseUrl';

export const TakeCountDownApi = async (id, time) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        time: time,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlCountDown}addCountDown`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetCountDownApi = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: JSON.stringify({
      //   user_id: id,
      //   time: time,
      // }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlCountDown}getCountDownTimeOfUser?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
