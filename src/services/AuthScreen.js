import {BaseUrl} from '../Helping/BaseUrl';

export const LoginApi = async (email, password) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: new URLSearchParams({
        email: email,
        password: password,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(`${BaseUrl}user/login`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const SignUpApi = async (email, password) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: new URLSearchParams({
        email: email,
        password: password,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrl}user/register_user`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const ForgetPasswordApi = async email => {
  console.log(email);
  try {
    const requestOptions = {
      method: 'POST',
      body: new URLSearchParams({
        email: email,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrl}emailVerification/sendEmail`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const VerifyOTP = async (email, otp) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: new URLSearchParams({
        email: email,
        otp: otp,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrl}emailVerification/verifyOTP`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const ResetPasswordApi = async (email, password) => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: new URLSearchParams({
        email: email,
        password: password,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrl}user/updatePassword`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const UpdateProfileApi = async (
  id,
  name,
  gender,
  focusedArea,
  height,
  weight,
  weightUnit,
  heightUnit,
) => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: new URLSearchParams({
        user_id: id,
        user_name: name,
        gender: gender,
        focusedAreas: focusedArea,
        height: height,
        weight: weight,
        weight_unit: weightUnit,
        height_unit: heightUnit,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };
    const response = await fetch(
      `${BaseUrl}user/updateProfile?current_user_id=${id}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
