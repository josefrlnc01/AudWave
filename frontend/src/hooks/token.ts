import { getRefreshToken } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";


export const useRefreshToken = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["refresh-token"],
    queryFn: getRefreshToken,
    retry: false,
    refetchInterval: 9 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return { data, isError, isLoading }
};
