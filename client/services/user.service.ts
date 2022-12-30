import { AxiosError } from "./../node_modules/axios/index.d";
import axios from "axios";
import User from "../models/user";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function signUp(user: User) {
  try {
    const response = await axios.post(`${baseUrl}/users/signup`, user);
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
}

const signOut = async () => {
  try {
    const res = await axios.post(`/api/users/signout`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const userServcie = {
  signUp,
  signOut,
};
