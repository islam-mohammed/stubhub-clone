import useSWR from "swr";
import axiosHelper from "../helpers/axios.helper";

import getSWRCacheKey from "../helpers/swr.helper";
import User from "../models/user";

const fetcher = () =>
  axiosHelper(undefined)
    .get("/api/users/current")
    .then((res) => res.data);

export default function useUser() {
  const { data, isLoading, error, mutate } = useSWR(getSWRCacheKey().user);
  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
