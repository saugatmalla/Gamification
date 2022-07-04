import { BusinessBranding, LoyaltyAppSetup, AppPageSettings, RegistrationSettings, Locale, LoginOption } from '../middlewares/auth';
import { reactive, ref, readonly } from 'vue';
import i18n from '../i18n';

import { HttpClient } from '../utils';

const httpClient = new HttpClient(import.meta.env.VITE_AUTH_API_URL).httpClient;

const initAppBranding: BusinessBranding = {
    "logo_url": '',
    "background_color": '',
    "primary_color": '',
    "secondary_color": '',
    "accent_color": '',
    "btn_primary_color": '',
    "btn_secondary_color": '',
    "btn_accent_color": '',
    "btn_text_color": '',
    "btn_hover_color": '',
    "btn_hover_text_color": '',
    "btn_disabled_color": '',
    "btn_disabled_text_color": '',
    "btn_negative_color": '',
    "btn_negative_text_color": '',
    "btn_negative_hover_color": '',
    "btn_negative_hover_text_color": '',
    "text_primary_color": '',
    "text_secondary_color": '',
    "text_accent_color": '',
    "text_error_color": '',
    "input_bg_color": '',
    "input_text_color": '',
    "input_text_secondary_color": '',
    "input_text_accent_color": '',
    "nav_primary_color": '',
    "nav_primary_active_color": '',
    "nav_primary_inactive_color": '',
    "nav_secondary_color": '',
    "nav_secondary_active_color": '',
    "nav_secondary_inactive_color": '',
    "nav_accent_color": '',
    "font_source": '',
    "font_family": '',
    "background_image_url": '',
    "marketing_video_url": '',
    "marketing_image_url": '',
}
const initAppSetup: LoyaltyAppSetup = {
    "logo_url": '',
    "background_color": '',
    "primary_color": '',
    "secondary_color": '',
    "accent_color": '',
    "btn_primary_color": '',
    "btn_secondary_color": '',
    "btn_accent_color": '',
    "btn_text_color": '',
    "btn_hover_color": '',
    "btn_hover_text_color": '',
    "btn_disabled_color": '',
    "btn_disabled_text_color": '',
    "btn_negative_color": '',
    "btn_negative_text_color": '',
    "btn_negative_hover_color": '',
    "btn_negative_hover_text_color": '',
    "text_primary_color": '',
    "text_secondary_color": '',
    "text_accent_color": '',
    "text_error_color": '',
    "input_bg_color": '',
    "input_text_color": '',
    "input_text_secondary_color": '',
    "input_text_accent_color": '',
    "nav_primary_color": '',
    "nav_primary_active_color": '',
    "nav_primary_inactive_color": '',
    "nav_secondary_color": '',
    "nav_secondary_active_color": '',
    "nav_secondary_inactive_color": '',
    "nav_accent_color": '',
    "font_source": '',
    "font_family": '',
    "background_image_url": '',
    "marketing_video_url": '',
    "marketing_image_url": '',
    "ga_tracking_id": "",
    "app_token": "",
    "start_date": "",
    "end_date": "",
    "currency_name": "",
    "currency_name_plural": "",
}

const initRegistrationSettings: RegistrationSettings = {
    email: false,
    phone: false,
    registration_fields: {
        phone: [{
            label: '',
            registration_method: '',
            field_key: '',
            field_type: '',
            placeholder: '',
            help_text: '',
            error_text: '',
            is_required: false,
            sort_order: 1,
            meta: ''
        }]
    }
}

const initLoginOption: LoginOption = {
    email: false,
    phone: false,
}

const appBranding = reactive<BusinessBranding>(initAppBranding);
const appSetup = reactive<LoyaltyAppSetup>(initAppSetup);
const appPageSettings = reactive<AppPageSettings>({})
const appRegistrationSettings = reactive<RegistrationSettings>(initRegistrationSettings);
const appToken = ref('');
const { t, setLocaleMessage, availableLocales } = i18n.global;
const appLocales = ref<Locale[]>()
const selectedLanguage = ref('')
const loginOption = ref<LoginOption>(initLoginOption);

export default function useAppSetup() {
    const getInitSetup = async () => {
        const result = await httpClient.get<LoyaltyAppSetup>('/v1/clients/apps/settings/setup/domain', {
            headers: {
                'app-token': appToken.value
            }
        })
        if (result.error) {
            throw new Error('error getting app setup');
        }
        setAppToken(result.app_token);
        Object.assign(appSetup, result);
    }

    const getAppPageSetup = async () => {
        const result = await httpClient.get<AppPageSettings>('v1/clients/apps/settings/pages', {
            headers: {
                'app-token': appToken.value
            }
        })
        if (result.error) {
            throw new Error('error getting app setup');
        }
        Object.assign(appPageSettings, result);
    }

    const getLoginOption = async () => {
        const result = await httpClient.get<LoginOption>('v1/clients/apps/settings/login', {
            headers: {
                'app-token': appToken.value
            }
        })
        if (result.error) {
            throw new Error('error getting login option');
        }
        loginOption.value = {
            email: result.email,
            phone: result.phone
        }
    }

    const setAppToken = async (token: string) => {
        appToken.value = token;
    }

    const setAppSetup = async () => {
        const result = await httpClient.get<LoyaltyAppSetup>(`/v1/clients/apps/settings/setup`, {
            headers: {
                'app-token': appToken.value
            }
        });

        if (result.error) {
            throw new Error('error getting app setup');
        }

        Object.assign(appSetup, result);
    }

    const setAppBranding = async () => {
        const result = await httpClient.get<LoyaltyAppSetup>('/v1/clients/apps/settings/branding', {
            headers: {
                'app-token': appToken.value
            }
        });

        if (result.error) {
            throw new Error('error getting app branding');
        }
        Object.assign(appBranding, result);
    }

    const getAvailableLocales = async () => {
        const result = await httpClient.get<{ payload: Locale[] }>('v1/clients/apps/locales', {
            headers: {
                'app-token': appToken.value
            }
        });

        appLocales.value = result.payload
    }

    const getLocaleTransalations = async (locale: string) => {
        let localeObj = appLocales.value?.find(el => el.name.toLowerCase() === locale)

        if (!localeObj) {
            localeObj = {
                id: 1,
                name: 'en'
            }
        }

        const result = await httpClient.get<{ [key: string]: string }>(`/v1/clients/apps/locales/${localeObj.id}/translations`, {
            headers: {
                'app-token': appToken.value
            }
        });

        if (result.error) {
            throw new Error('error getting translations');
        }
        setLocaleMessage(localeObj.name.toLowerCase(), result);
        setSelectedLanguage(localeObj.name.toLowerCase())
    }

    function setSelectedLanguage(lang: string) {
        i18n.global.locale.value = lang
        selectedLanguage.value = lang
        window.localStorage.setItem('lang', lang);
    }

    const setRegistrationSettings = async () => {
        const result = await httpClient.get<RegistrationSettings>('v1/clients/apps/settings/registration', {
            headers: {
                'app-token': appToken.value
            }
        });
        if (result.error && result.statusCode === 403) {
            throw new Error(t('registration_not_enabled'))
        } else if (result.error) {
            throw new Error(t('generic_server_error'))
        }
        Object.assign(appRegistrationSettings, result);
    }

    return {
        appToken: readonly(appToken),
        appSetup,
        appPageSettings,
        getLoginOption,
        appBranding,
        appRegistrationSettings,
        setAppToken,
        setAppBranding,
        setAppSetup,
        setRegistrationSettings,
        getInitSetup,
        getAppPageSetup,
        getLocaleTransalations,
        getAvailableLocales,
        selectedLanguage: readonly(selectedLanguage),
        setSelectedLanguage,
        loginOption: readonly(loginOption)
    }
}