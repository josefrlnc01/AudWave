import { getRefreshToken } from "@/features/auth/api/authApi";
import { tokenStore } from "@/lib/token.store";
import { useQuery } from "@tanstack/react-query";


export const useRefreshToken = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true'
  const { data, isError, isLoading } = useQuery({
    queryKey: ["refresh-token"],
    queryFn: getRefreshToken,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !tokenStore.get() && isAuth ,
    refetchInterval:isAuth ?  9 * 60 * 1000 : false ,
    refetchIntervalInBackground: true,
  });

  return { data: data ?? tokenStore.get(), isError, isLoading }
};
