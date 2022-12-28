import { AxiosError } from "./../node_modules/axios/index.d";
import axios from "axios";
import User from "../models/user";

async function signUp(url: string, user: User) {
  try {
    const response = await axios.post(url, user);
    console.log(response.data);
  } catch (error) {
    throw new Error(JSON.stringify((error as AxiosError).response?.data));
  }
}

export const userServcie = {
  signUp,
};
