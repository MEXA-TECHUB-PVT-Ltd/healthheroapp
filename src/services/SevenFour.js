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
export const GetSevenById = async id => {
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
export const GetSevenAll = async id => {
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
export const GetUserSevenByFour = async (id, sevenbyfourId) => {
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
      `${BaseUrlSevenFOur}getUserWorkoutStartedDays?user_id=${id}&sev_by_fourChallenge_id=${sevenbyfourId}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const StartSevenByFourApi = async (
  id,
  sevenbyfourId,
  weekId,
  dayId,
  time,
  date,
) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: new URLSearchParams({
        user_id: id,
        sev_by_fourChallenge_id: sevenbyfourId,
        week_id: weekId,
        day_id: dayId,
        time: time,
        created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlSevenFOur}start_seven_by_four`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const CompleteSevenByFourApi = async id => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: new URLSearchParams({
        user_inAction_sevByFour_id: id,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlSevenFOur}start_seven_by_four`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
