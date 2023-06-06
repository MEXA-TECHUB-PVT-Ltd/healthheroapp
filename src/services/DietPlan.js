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

export const UpdateDietPlanApi = async (
  dietId,
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
    dietId,
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
      method: 'PUT',
      body: JSON.stringify({
        diet_plan_id: dietId,
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
      `${BaseUrlDietPlan}update_dietPlan`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetDietPlanApi = async (dietId, id) => {
  console.log(dietId, id);
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

export const AddFoodUserApi = async (
  id,
  planId,
  meal_time,
  foodId,
  quantity,
  unit,
  date,
) => {
  console.log(id, planId, meal_time, foodId, quantity, unit, date);
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user_id: id,
        diet_plan_id: planId,
        meal_time: meal_time,
        food_id: foodId,
        quantity: quantity,
        unit: unit,
        created_at: date,
      }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlDietPlan}/addFoodIntake`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetHistoryApi = async (id, dietId) => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: JSON.stringify({
      //   user_id: id,
      //   diet_plan_id: planId,
      //   meal_time: meal_time,
      //   food_id: foodId,
      //   quantity: quantity,
      //   unit: unit,
      //   created_at: date,
      // }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlDietPlan}getHistory/?user_id=${id}&diet_plan_id=${dietId}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const GetFoodApi = async (userId, planId) => {
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
      `${BaseUrlDietPlan}getdailyConsumption/?user_id=${userId}&diet_plan_id=${planId}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const GetDietPlanIDApi = async id => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrlDietPlan}getDietPlanOfUser/?user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
