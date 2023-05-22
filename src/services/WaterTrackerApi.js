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
