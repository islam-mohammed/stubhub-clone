import axios, { AxiosInstance } from "axios";
import { IncomingMessage } from "http";

const axiosHelper = (req: IncomingMessage | undefined): AxiosInstance => {
  return axios.create({
    baseURL:
      typeof window === "undefined"
        ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
        : "/",
    headers: req?.headers,
  });
};
export default axiosHelper;
