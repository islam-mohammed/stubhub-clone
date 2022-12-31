import axios, { Axios, AxiosInstance } from "axios";
import { Request } from "express-validator/src/base";

const axiosServer = (req: Request): AxiosInstance => {
  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: req.headers,
  });
};
export default axiosServer;
