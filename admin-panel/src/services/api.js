import axios from "axios";
import { BACKEND_URL } from "../config/constant";

export const getStatus = async () => {
  try {
    let res = await axios.get(`${BACKEND_URL}/get-status`);
    if (res && res.status == 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};

export const loginUser = async (username, password) => {
  try {
    let res = await axios.post(`${BACKEND_URL}/login`, {
      username,
      password,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return error;
  }
};

export const getSettings = async () => {
  try {
    let res = await axios.get(`${BACKEND_URL}/get-site-settings`);
    if (res && res.status == 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};

export const getAdminUsers = async () => {
  try {
    let res = await axios.get(`${BACKEND_URL}/get-admin-users`);
    if (res && res.status == 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};

export const updateAdminUser = async (id, data) => {
  try {
    let res = await axios.post(`${BACKEND_URL}/update-admin-user/${id}`, data);
    if (res && res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error in updating admin user:", error);
    return false;
  }
};

export const addAdminUser = async (data) => {
  try {
    let res = await axios.post(`${BACKEND_URL}/add-admin`, data);
    if (res && res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error in updating admin user:", error);
    return false;
  }
};

export const deleteAdminUser = async (id, data) => {
  try {
    let res = await axios.post(`${BACKEND_URL}/delete-admin-user/${id}`);
    if (res && res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error in deleting admin user:", error);
    return false;
  }
};

export const getEnquiryDetails = async (id) => {
  try {
    let url = `${BACKEND_URL}/get-enquiry/${id}`;
    let res = await axios.get(url);
    if (res && res.status == 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log("Error while getting enquiry details : ", error);
    return error;
  }
};

export const deleteCar = async (id) => {
  try {
    let res = await axios.delete(`${BACKEND_URL}/car/${id}`);
    return res;
  } catch (error) {
    console.log("Error while deleting car : ", error);
    return error;
  }
};

export const editCar = async (id, data) => {
  try {
    let res = await axios.put(`${BACKEND_URL}/edit-car/${id}`, { data });
    if (res) {
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

export const verifyOtp = async (data) => {
  try {
    let res = await axios.put(`${BACKEND_URL}/verify-otp`, { data });
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error while verifying OTP : ", error);
    return error;
  }
};

export const getSellerEnquiries = async () => {
  try {
    let res = await axios.get(`${BACKEND_URL}/seller-enquiries`);
    if (res.status == 200) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error while verifying OTP : ", error);
    return error;
  }
};
