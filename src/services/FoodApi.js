import {BaseUrlFood} from '../Helping/BaseUrl';

export const CreateFoodApi = async (
  added,
  id,
  name,
  calories,
  measure,
  unit,
  protein,
  carbs,
  fats,
  monoFats,
  saturFats,
  suger,
  fiber,
  sodium,
  calcium,
  iron,
  vitaminA,
  vitamin_b,
  vitamin_c,
  cholestrol,
) => {
  console.log(
    added,
    id,
    name,
    calories,
    measure,
    unit,
    protein,
    carbs,
    fats,
    monoFats,
    saturFats,
    suger,
    fiber,
    sodium,
    calcium,
    iron,
    vitaminA,
    vitamin_b,
    vitamin_c,
    cholestrol,
  );
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        added_by: added,
        added_by_id: id,
        food_name: name,
        energy_calories: calories,
        measure: measure,
        units: unit,
        protein: protein,
        carbs: carbs,
        fats: fats,
        monosaturated_fats: monoFats,
        saturated_fats: saturFats,
        suger: suger,
        fiber: fiber,
        sodium: sodium,
        calcium: calcium,
        iron: iron,
        vitamin_A: vitaminA,
        vitamin_b: vitamin_b,
        vitamin_c: vitamin_c,
        cholestrol: cholestrol,
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
export const GetCreateFoodApi = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      // body: JSON.stringify({
      // }).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${BaseUrlFood}getAllFoods`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
