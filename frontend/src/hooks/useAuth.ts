import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";
import { useRefreshToken } from "./token";

export const useAuth = () => {
    const {
        data: accessToken,
        isLoading: isRefreshLoading,
        isError: isRefreshError,
    } = useRefreshToken();

    const { data, isError, isLoading } = useQuery({
        queryFn: () => getUser(accessToken!),
        queryKey: ["user", accessToken],
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!accessToken,
    });

    if (isRefreshLoading) {
        return { data: null, isError: false, isLoading: true };
    }

    if (isRefreshError || !accessToken) {
        return { data: null, isError: true, isLoading: false };
    }

    return { data, isError, isLoading };
};
