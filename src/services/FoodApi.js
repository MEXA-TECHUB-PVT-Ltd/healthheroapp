import {BaseUrl, BaseUrlFood} from '../Helping/BaseUrl';

export const GetFoodApi = async (email, password) => {
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
    const response = await fetch(`${BaseUrlFood}getAllFoods`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const AddFoodUserApi = async (id, password) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${BaseUrlFood}addFood`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
