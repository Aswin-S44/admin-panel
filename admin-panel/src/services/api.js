import axios from "axios";
import { BACKEND_URL } from "../config/constant";

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
