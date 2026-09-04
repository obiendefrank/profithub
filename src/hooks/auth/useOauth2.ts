import { useCallback, useState } from 'react';
import { clearAuthData } from '@/utils/auth-utils';
import { requestOidcAuthentication } from '@deriv-com/auth-client';

type TClient = {
    logout: () => Promise<void>;
    is_logged_in?: boolean;
    [key: string]: any;
};

type TUseOauth2Options = {
    handleLogout?: () => Promise<void>;
    client?: TClient;
};

export const useOauth2 = (options?: TUseOauth2Options) => {
    const [isSingleLoggingIn, setIsSingleLoggingIn] = useState(false);

    const oAuthLogout = useCallback(async () => {
        try {
            clearAuthData(false);
            if (options?.handleLogout) {
                await options.handleLogout();
            }
            window.location.reload();
        } catch (error) {
            console.error('OAuth logout error:', error); // eslint-disable-line no-console
        }
    }, [options?.handleLogout]);

    const retriggerOAuth2Login = useCallback(async () => {
        try {
            setIsSingleLoggingIn(true);
            const query_param_currency = sessionStorage.getItem('query_param_currency') || 'USD';
            await requestOidcAuthentication({
                redirectCallbackUri: `${window.location.origin}/callback`,
                ...(query_param_currency
                    ? {
                          state: {
                              account: query_param_currency,
                          },
                      }
                    : {}),
            });
        } catch (error) {
            console.error('Retrigger OAuth2 login error:', error); // eslint-disable-line no-console
        } finally {
            setIsSingleLoggingIn(false);
        }
    }, []);

    return {
        oAuthLogout,
        retriggerOAuth2Login,
        isSingleLoggingIn,
    };
};

export default useOauth2;
