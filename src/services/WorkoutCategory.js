import {BaseUrlCategory, BaseUrlWorkout} from '../Helping/BaseUrl';

export const GetAllCategories = async name => {
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
      `${BaseUrlCategory}getAllcategories?page=1&limit=2
          `,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
