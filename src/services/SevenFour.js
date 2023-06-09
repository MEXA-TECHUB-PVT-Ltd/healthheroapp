import {BaseUrlSevenFOur} from '../Helping/BaseUrl';

export const GetSevenFourApi = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: new URLSearchParams({
      //   email: email,
      //   password: password,
      // }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlSevenFOur}getAllSevenByFour`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetSevenById = async (id) => {
  console.log(id);
  try {
    const requestOptions = {
      method: 'GET',
      // body: new URLSearchParams({
      //   email: email,
      //   password: password,
      // }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlSevenFOur}getSevenByFour?seven_by_four_challenge_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetSevenAll = async (id) => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: new URLSearchParams({
      //   email: email,
      //   password: password,
      // }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlSevenFOur}getSevenByFour?seven_by_four_challenge_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
