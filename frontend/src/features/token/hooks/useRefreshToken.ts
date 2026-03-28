import { getRefreshToken } from "@/features/auth/api/authApi";
import { useQuery } from "@tanstack/react-query";


export const useRefreshToken = () => {
  const {data, isError, isLoading} = useQuery({
    queryKey: ['refresh-token'],
    queryFn:getRefreshToken,
    retry:false,
    refetchOnWindowFocus: false,
    refetchOnMount:false
  })

  return {data, isError, isLoading}
};
