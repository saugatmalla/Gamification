
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { HttpClient } from '../../utils/HttpClient';
import { User } from './models';
import useAppSetup from '../../composables/useAppSetup';
import { useAuth } from '../../composables/useAuth';

const httpClient = new HttpClient(import.meta.env.VITE_AUTH_API_URL).httpClient;

export async function redirect(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const { appToken, setAppToken, getInitSetup } = useAppSetup();
    const { setIsLoggedIn, authToken, setAuthToken } = useAuth();

    if (appToken.value === '') {
        try {
            await getInitSetup()
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
                throw new Error(e.message);
            }
        }
    }

    if (authToken.value === '') {
        let token = window.localStorage.getItem('token');

        // check the query param for a token
        if (!token) {
            if (to.query.token && typeof (to.query.token) === 'string' && to.query.token !== '') {
                token = to.query.token as string;
            }

            // if the token is present set it in local storage
            if (token) {
                window.localStorage.setItem('token', token);
            }
        }

        if (!token) {
            setIsLoggedIn(false);
            next()
            return;
        }

        setAuthToken(token);
    }

    try {
        await getProfile({ authToken: authToken.value, appToken: appToken.value });

        next({
            name: 'Homepage'
        });
        setIsLoggedIn(true);
        return
    } catch (err) {
        setIsLoggedIn(false);
    }

    next()

}

async function getProfile(headers: { appToken: string; authToken: string }): Promise<User> {
    const result = await httpClient.get<User>(`/v1/clients/users/profile?contactDetails=false&addresses=false`, {
        headers: {
            'app-token': headers.appToken,
            'auth-token': headers.authToken,
        }
    });

    if (result.error) {
        throw new Error(JSON.stringify(result));
    }
    return result
}