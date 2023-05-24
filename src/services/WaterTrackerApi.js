import {BaseUrlWaterTracker} from '../Helping/BaseUrl';

export const AddWaterApi = async (id, measure, unit, quantity, date) => {
  console.log(id, measure, unit, quantity, date);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        measure: measure,
        measuring_unit: unit,
        quantity: quantity,
        created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWaterTracker}add_water_tracker`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const UpdateWaterApi = async (
  waterId,
  id,
  measure,
  unit,
  quantity,
  date,
) => {
  console.log(waterId, id, measure, unit, quantity, date);
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        water_tracker_id: waterId,
        user_id: id,
        measure: measure,
        measuring_unit: unit,
        quantity: quantity,
        // created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWaterTracker}update_water_tracker`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWaterApi = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      //   body: JSON.stringify({
      //     user_id: id,
      //     measure: measure,
      //     measuring_unit: unit,
      //     quantity: quantity,
      //     created_at: date,
      //   }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWaterTracker}getUser_waterTracker?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetWeeklyWaterApi = async (waterId, id) => {
  try {
    const requestOptions = {
      method: 'GET',
      //   body: JSON.stringify({
      //     user_id: id,
      //     measure: measure,
      //     measuring_unit: unit,
      //     quantity: quantity,
      //     created_at: date,
      //   }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWaterTracker}get_weekly_history?water_tracker_id=${waterId}&user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetWaterRecordApi = async (id, measure, quantity, date) => {
  console.log(id, measure, quantity, date);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        water_tracker_id: measure,
        quantity: quantity,
        created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlWaterTracker}add_record_water_tracker`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
