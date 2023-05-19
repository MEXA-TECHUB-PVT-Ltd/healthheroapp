import {BaseUrlCountDown, BaseUrlReminder} from '../Helping/BaseUrl';

export const CreateReminder = async (id, time, day) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        time: time,
        day: day,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlReminder}create_reminder`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetReminder = async (id) => {
  try {
    const requestOptions = {
      method: 'GET',
    //   body: JSON.stringify({
    //     user_id: id,
    //     time: time,
    //     day: day,
    //   }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlReminder}getAllUserReminders?user_id=${id}&page=1&limit=4`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
