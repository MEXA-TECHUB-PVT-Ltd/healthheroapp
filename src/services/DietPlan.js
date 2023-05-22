import {BaseUrl, BaseUrlDietPlan} from '../Helping/BaseUrl';

export const AddDietPlan = async (
  id,
  weight,
  targetWeight,
  height,
  age,
  gender,
  dietBudget,
  active,
  purpose,
  date,
) => {
  console.log(
    id,
    weight,
    targetWeight,
    height,
    age,
    gender,
    dietBudget,
    active,
    purpose,
    date,
  );
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        weight: weight,
        targetted_weight: targetWeight,
        height: height,
        age: age,
        gender: gender,
        diet_budget: dietBudget,
        activity_status: active,
        purpose: purpose,
        created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlDietPlan}add_dietPlan`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetDietPlanApi = async (dietId, id) => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: JSON.stringify({
      //   user_id: id,
      //   weight: weight,
      //   targetted_weight: targetWeight,
      //   height: height,
      //   age: age,
      //   gender: gender,
      //   diet_budget: dietBudget,
      //   activity_status: active,
      //   purpose: purpose,
      //   created_at: date,
      // }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlDietPlan}get_dietPlan/?diet_plan_id=${dietId}&user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
