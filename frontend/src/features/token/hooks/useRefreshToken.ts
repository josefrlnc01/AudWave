import { getRefreshToken } from "@/features/auth/api/authApi";
import { useQuery } from "@tanstack/react-query";


export const useRefreshToken = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["refresh-token"],
    queryFn: getRefreshToken,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: () => (localStorage.getItem('isAuth') === 'true' ? 9 * 60 * 1000 : false),
    refetchIntervalInBackground: true,
  });

  return { data, isError, isLoading }
};
