import axios from "axios";
import { BACKEND_URL } from "../config/constant";

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
