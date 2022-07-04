import { User, UserSession, ContactDetail, UserAddress, UserProfileDetail } from '../middlewares/auth';
import { readonly, ref, reactive, computed } from 'vue';
import useAppState from './useAppState';
import { HttpClient } from '../utils';
import useAppSetup from './useAppSetup';
import i18n from '../i18n';


const httpClient = new HttpClient(import.meta.env.VITE_AUTH_API_URL).httpClient;
const { appToken } = useAppSetup();
const { t, locale } = i18n.global;

const isLoggedIn = ref(false);
const authToken = ref('');
const verificationToken = ref('');

const initUser: User = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    type: '',
    loyalty_number: '',
    points: 0,
    lifetime_points: 0,
    uuid: '',
    dob: '',
    profile_pic: '',
    referral_key: '',
}

const initUserContactDetails: ContactDetail[] = [
    {
        id: 1,
        contact_type: '',
        contact_value: '',
        is_verified: false,
        is_primary: false
    }
]

const initUserAddresses: UserAddress[] = [
    {
        id: 1,
        address_line_1: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
        is_default: true,
    }
]

const authUser = reactive<User>(initUser);
const userContactDetails = reactive<ContactDetail[]>(initUserContactDetails);
const userAddresses = reactive<UserAddress[]>(initUserAddresses);

const { setLoadingMsg, toggleLoading } = useAppState();

export function useAuth() {
    const setIsLoggedIn = (value: boolean) => {
        if (!value) {
            setAuthToken('');
            setAuthUser(initUser);
        }

        isLoggedIn.value = value;
    }

    const setVerificationToken = (token: string) => {
        verificationToken.value = token
        let oldSession = window.sessionStorage.getItem('userSession')
        if (!oldSession) {
            window.sessionStorage.setItem('userSession', JSON.stringify({ verificationToken: token }))
            return
        }
        let oldSessionObj: UserSession = JSON.parse(oldSession)
        oldSessionObj = { ...oldSessionObj, verificationToken: token }
        window.sessionStorage.setItem('userSession', JSON.stringify(oldSessionObj));
    }

    const loginWithPhoneNumber = async (phoneNumber: string) => {
        const result = await httpClient.post<{ msg: string, verification_token: string }>(`/v1/auth/login/phone?locale=${locale.value}`, {
            phone_number: phoneNumber,
        }, {
            headers: {
                'app-token': appToken.value
            }
        });

        if (result.error && result.statusCode === 400) {
            throw new Error(t("phone_number_invalid"));
        } else if (result.error) {
            throw new Error(t("generic_server_error"));
        }

        setVerificationToken(result.verification_token);
    }

    const verifyPhoneAuthCode = async (code: number) => {
        const result = await httpClient.post(`/v1/auth/login/phone/verify`, {
            verification_token: verificationToken.value,
            auth_code: code
        }, {
            headers: {
                'app-token': appToken.value
            }
        });
        if (result.error && result.statusCode === 400) {
            throw new Error(t("auth_code_invalid_type"));
        } else if (result.error && result.statusCode === 403) {
            throw new Error(t("auth_code_invalid"));
        }
        else if (result.error) {
            throw new Error(t("generic_server_error"));
        }

        setAuthToken(result.token);
    }

    const registerWithPhoneNumber = async <T>(data: T) => {
        const result = await httpClient.post<{ verification_token: string }>(`/v1/registrations/phone?locale=${locale.value}`,
            data, {
            headers: {
                'app-token': appToken.value
            }
        });

        if (result.error && result.statusCode === 400) {
            if (result.msg?.includes('phone')) {
                throw new Error(t("phone_number_invalid"));
            } else if (result.msg?.includes('email')) {
                throw new Error(t("email_invalid"));
            } else {
                throw new Error(result.msg)
            }
        } else if (result.error && result.statusCode === 403) {
            if (result.msg?.includes('app terms')) {
                throw new Error(t("app_terms_not_accepted"));
            }
        }
        else if (result.error && result.statusCode === 409) {
            throw new Error(t("already_registered"));
        } else if (result.error) {
            throw new Error(t("generic_server_error"));
        }

        setVerificationToken(result.verification_token);
    }

    const setAuthUser = (data: User) => {
        Object.assign(authUser, data);
    }

    const userPhone = computed(() => {
        return authUser.contact_details?.find(el => el.contact_type === "phone")?.contact_value || "";
    })

    const userEmail = computed(() => {
        return authUser.contact_details?.find(el => el.contact_type === "email")?.contact_value || "";
    });

    const userDefaultAddress = computed(() => {
        return userAddresses.find(el => el.is_default);
    })

    const getUserProfile = async (data: { contactDetails?: boolean; addresses?: boolean, terms?: boolean } = { contactDetails: false, addresses: false, terms: false }) => {
        const result = await httpClient.get<User>(`/v1/clients/users/profile?contactDetails=${data.contactDetails}&addresses=${data.addresses}&terms=${data.terms}`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(result.msg);
        }

        setAuthUser(result);

        if (result.contact_details) {
            Object.assign(userContactDetails, result.contact_details);
        }
        if (result.addresses) {
            Object.assign(userAddresses, result.addresses);
        }
    }

    const getUserContactDetails = async () => {
        const result = await httpClient.get<{ payload: ContactDetail[] }>(`/v1/clients/users/contact-details`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }

        Object.assign(userContactDetails, result.payload);

    }

    const getUserAdresses = async () => {
        const result = await httpClient.get<{ payload: UserAddress[] }>(`v1/clients/users/addresses`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }

        Object.assign(userAddresses, result.payload);
    }

    const updateUserProfile = async (data: UserProfileDetail) => {
        const result = await httpClient.patch<{ msg: string }>(`/v1/clients/users/profile`, data, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }
    }

    const addUserAddress = async (data: UserAddress) => {
        const result = await httpClient.post<{ msg: string }>(`/v1/clients/users/addresses`, data, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }
    }


    const updateUserAddress = async (data: UserAddress, addressId: number) => {
        const result = await httpClient.patch<{ msg: string }>(`v1/clients/users/addresses/${addressId}`, data, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }
    }

    const toggleAppTerms = async (user_app_term_id: number) => {
        const result = await httpClient.patch<{ msg: string }>(`/v1/clients/users/terms/${user_app_term_id
            }/toggle`, {}, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }
    }

    const setAuthToken = (value: string) => {
        if (value === '') {
            window.localStorage.removeItem('token');
        }

        authToken.value = value;
        window.localStorage.setItem('token', value);
    }

    const requestPasswordReset = async (email: string) => {
        const result = await httpClient.post<{}>(`/v1/clients/passwords/reset`, {
            email,
        });

        if (result.error) {
            throw new Error(result.msg);
        }
    }

    const resendMultiFactor = async () => {
        const result = await httpClient.post<{ msg: string }>(`/api/v2/auth/multi-factor/resend`, {}, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        })
    }

    const logout = async () => {
        const result = await httpClient.post<{ msg: string }>(`/v1/auth/logout`, {}, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value
            }
        });

        if (result.error) {
            throw new Error('error logging out');
        }

        setIsLoggedIn(false);
    }

    return {
        isLoggedIn: readonly(isLoggedIn),
        authUser: readonly(authUser),
        authToken: readonly(authToken),
        userContactDetails: readonly(userContactDetails),
        userAddresses: readonly(userAddresses),
        userPhone,
        userEmail,
        userDefaultAddress,
        getUserAdresses,
        updateUserAddress,
        updateUserProfile,
        addUserAddress,
        loginWithPhoneNumber,
        verifyPhoneAuthCode,
        setIsLoggedIn,
        getUserProfile,
        toggleAppTerms,
        setAuthUser,
        setAuthToken,
        setVerificationToken,
        getUserContactDetails,
        registerWithPhoneNumber,
        requestPasswordReset,
        logout,
        resendMultiFactor,
    }
}