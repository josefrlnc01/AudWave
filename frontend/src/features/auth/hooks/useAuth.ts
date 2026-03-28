import { getUser } from "@/features/auth/api/authApi";
import { useQuery } from "@tanstack/react-query";
import { useRefreshToken } from "@/features/token/hooks/useRefreshToken";
import { tokenStore } from "@/lib/token.store";
import { useEffect } from "react";

export const useAuth = () => {
    const {
        data: accessToken,
        isLoading: isRefreshLoading,
        isError: isRefreshError,
    } = useRefreshToken();
    const storedToken = tokenStore.get()
    const activeToken = accessToken ?? storedToken

    useEffect(() => {
        if (accessToken) {
            tokenStore.set(accessToken)
        }
    }, [accessToken])

    const { data, isError, isLoading } = useQuery({
        queryFn: () => getUser(activeToken!),
        queryKey: ["user", activeToken],
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!activeToken
    });

    if (isRefreshLoading && !storedToken) {
        return { data: null, isError: false, isLoading: true };
    }

    if (!activeToken && isRefreshError) {
        return { data: null, isError: true, isLoading: false };
    }

    if (!activeToken) {
        return { data: null, isError: true, isLoading: false };
    }

    return { data, isError, isLoading };
};
