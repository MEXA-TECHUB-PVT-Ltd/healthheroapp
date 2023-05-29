import {BaseUrlCountDown, BaseUrlReminder} from '../Helping/BaseUrl';

export const CreateReminder = async (id, time, day) => {
  console.log(id, time, day);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        time: time,
        days: day,
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
export const GetReminder = async id => {
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
      `${BaseUrlReminder}getAllUserReminders?user_id=${id}&page=1&limit=20`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const ActiveReminderApi = async id => {
  console.log(id);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        reminder_id: id,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlReminder}active_reminder`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const InActiveReminderApi = async id => {
  console.log(id);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        reminder_id: id,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlReminder}in_active_reminder`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
