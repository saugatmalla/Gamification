<template>
    <div class="xl:grid xl:grid-cols-1 xl:w-5/6 min-h-[var(--app-fill-height)] mx-auto px-6">
        <div class="text-txt-primary mt-4 ">
            <svg
            @click="gotoStaticPage"
                class="h-4 w-4 inline cursor-pointer"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                />
            </svg>
            <span @click="gotoStaticPage" class="uppercase font-bold italic ml-2 cursor-pointer">{{$t("back_to_home")}}</span>
        </div>

        <!-- Navbar: 72px; Margin: 16px; Back div: 24px -->
        <!-- <div class="xl:absolute xl:w-full xl:top-[calc(50%-88px)] xl:-translate-y-[calc(50%-44px)]"> -->
        <div class="xl:h-full xl:pb-[102px]"><!--  -->
            <div
                class="xl:flex xl:space-x-4 items-center justify-center"
            >
                <!-- :class="[
                    (appBranding.marketing_image_url || appBranding.marketing_video_url) ? 'xl:grid-cols-3' : 'xl:grid-cols-1',
                ]" -->

                <div
                    v-if="appBranding?.marketing_video_url || appBranding?.marketing_image_url"
                    class="hidden sm:block xl:hidden sm:mt-4"
                >
                    <!-- video -->
                    <video
                        v-if="appBranding.marketing_video_url"
                        autoplay
                        controls
                        muted
                        loop
                        height="100%"
                        width="100%"
                        class="max-w-[677px] max-h-[600px]"
                    >
                        <source :src="appBranding.marketing_video_url" type="video/mp4" />video is not supported
                    </video>
                    <!-- image -->
                    <img
                        v-else-if="appBranding?.marketing_image_url"
                        class="mx-auto max-h-[600px]"
                        :src="appBranding.marketing_image_url"
                        alt="login image en"
                    />
                </div>
                
                <!-- input container -->
                <div
                    class="shrink-0 mt-4 p-4 mx-auto xl:mx-0 sm:w-[300px] xl:w-[331px] bg-primary-bg/50"
                >
                    <div class>
                        <img v-if="appPageSettings?.login?.header_image"
                         class="mx-auto w-auto h-auto max-w-full max-h-32" :src="appPageSettings?.login?.header_image" alt="logo" />

                         <div v-else class="text-txt-primary text-center uppercase font-bold text-3xl tracking-wider">
                            Login
                         </div>

                        <div v-if="step == 0">
                            <form v-if="selectedLoginOption == 'phone'" @submit.prevent="loginWithPhoneNumber" class="mt-6"  novalidate>
                                <TextField
                                    :fieldLabel="$t('phone')"
                                    type="tel"
                                    @changed="setPhoneNumber"
                                    :errorMsg="errorMsg"
                                    autocomplete="off"
                                    class="mb-2"
                                    ref="phoneNumberElement"
                                ></TextField>
                                <Button  :label="$t('login')" :btnDisabled="isBtnLoginLoading"
                                ></Button>
                            </form>
                            <form v-else-if="selectedLoginOption == 'email'" @submit.prevent="loginWithEmail" class="mt-6"  novalidate>
                                <TextField
                                    :fieldLabel="$t('email')"
                                    type="email"
                                    @changed="setEmail"
                                    :errorMsg="errorMsg"
                                    class="mb-2"
                                    ref="emailElement"
                                ></TextField>
                                <Button :label="$t('login')" :btnDisabled="isBtnLoginLoading"
                                ></Button>
                            </form>
                            <div class="mt-4" v-if="loginOption.email">
                                <p class="text-txt-primary font-bold uppercase text-center">
                                {{$t('or')}}
                                </p>

                                <Button  v-if="selectedLoginOption == 'phone'" :label="$t('login_with_email')" :btnDisabled="isBtnLoginLoading"
                                @click="switchLoginOption('email')" class="capitalize"></Button>

                                <Button v-else-if="selectedLoginOption == 'email'" :label="$t('login_with_phone')" :btnDisabled="isBtnLoginLoading"
                                @click="switchLoginOption('phone')" class="capitalize"></Button> 
                            </div>
                        </div>
                        <!-- confirmation form -->
                        <div v-else>
                            <form
                            @submit.prevent="verifyOtp"
                            class="mt-6 transition-all duration-300 ease-linear"
                        >
                            <p class="text-center text-txt-primary">
                                <span>
                                    {{$t("enter_verification_code", {
                                        phone: phoneNumber.replace(/\d(?=(?:\D*\d){0,6} *$)/g, "*")
                                    })}}
                                </span>
                                <span
                                    class="sm:block ml-2 font-bold text-txt-accent uppercase"
                                    role="button"
                                    @click="changePhoneNumber"
                                >{{$t("change")}}</span>
                            </p>
                                <!-- confirmation pin input field -->
                                <div class="text-center mt-6">
                                    <div id="otp" class="flex space-x-4 justify-center">
                                        <!-- <input
                                            class="inline w-[58px] h-12 bg-input-background text-txt-primary text-center italic font-bold uppercase outline-none"
                                            maxlength="1"
                                            as="input"
                                            v-for="index in [...Array(otpLength).keys()]"
                                            :key="index"
                                            type="text"
                                            inputmode="numeric"
                                            auto-complete="one-time-code"
                                            :id="`otp-${index}`"
                                            v-model="otp[index]"
                                            @keyup="(e) => handleOTPInput(e, index)"
                                            :ref="(el) => { otpRef[index] = el as HTMLInputElement }"
                                        />-->
                                        <TextField
                                            :fieldLabel="$t('code')"
                                            autoComplete="one-time-code"
                                            :errorMsg="errorMsg"
                                            @changed="setPhoneAuthCode"
                                            ref="verifyAuthCodeElement"
                                            class="mb-2"
                                        ></TextField>
                                    </div>
                                    <div class>
                                        <p class="text-txt-primary">
                                            <span class="mr-2">{{$t("didnt_receive_code")}}</span>
                                            <span
                                                role="button"
                                                class="sm:block uppercase font-bold text-txt-accent"
                                                @click="loginWithPhoneNumber"
                                            >{{$t("send_again")}}</span>
                                        </p>
                                        <button
                                            class="w-full mt-4 flex justify-center items-center bg-btn-primary rounded-[4px] h-[54px] text-btn-txt text-lg font-bold hover:bg-btn-hover transition-colors duration-200 disabled:bg-btn-disabled disabled:text-btn-disabled-text disabled:cursor-not-allowed"
                                            @click.prevent="verifyOtp"
                                            :disabled="isBtnOtpLoading"
                                        >{{$t("continue")}}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="mt-6 text-center text-txt-primary">
                            <span>{{$t("dont_have_account")}}</span>
                            <span
                                class="ml-2 font-bold text-txt-accent uppercase cursor-pointer"
                                role="link"
                                @click="$router.push('/signup')"
                            > {{$t("sign_up")}} </span>
                        </div>
                    </div>
                </div>

                <div
                    v-if="appBranding?.marketing_video_url || appBranding?.marketing_image_url"
                    class="hidden xl:block sm:mt-4"
                >
                    <!-- video -->
                    <video
                        v-if="appBranding.marketing_video_url"
                        autoplay
                        controls
                        muted
                        loop
                        height="100%"
                        width="100%"
                        class="max-w-[677px] max-h-[600px]"
                    >
                        <source :src="appBranding.marketing_video_url" type="video/mp4" />video is not supported
                    </video>
                    <!-- image -->
                    <img
                        v-else-if="appBranding?.marketing_image_url"
                        class="mx-auto max-w-[700px] max-h-[600px]"
                        :src="appBranding.marketing_image_url"
                        alt="login image en"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, onBeforeMount, ref, onMounted, watch } from 'vue';
import { useAuth } from '../../../composables/useAuth';
import useAppSetup from '../../../composables/useAppSetup';
import { useRouter } from 'vue-router';
import TextField from '../../../components/inputs/TextField.vue';
import Button from '../../../components/buttons/Button.vue';
import { UserSession } from '../../../middlewares/auth/models'
import { useI18n } from 'vue-i18n';
import GAnalytics from '../../../utils/GAnalytics';

export default defineComponent({
    components: {
        TextField,
        Button
    },

    setup() {
        const router = useRouter()
        const { appBranding, appPageSettings, getLoginOption, loginOption} = useAppSetup()
        const {t, locale} = useI18n()

        const phoneNumberElement = ref<InstanceType<typeof TextField>>()
        const verifyAuthCodeElement = ref<InstanceType<typeof TextField>>()
        const emailElement = ref<InstanceType<typeof TextField>>()

        let initSession: UserSession = {
            phoneNumber: '',
            verificationToken: '',
            step: 0
        }

        const step = ref<0 | 1>(0)
        const isBtnLoginLoading = ref(false)
        const isBtnOtpLoading = ref(false)

        const errorMsg = ref('')

        const phoneNumber = ref('');
        const email = ref('')
        // const otp = ref<string[]>(["", "", "", ""]);
        const phoneAuthCode = ref('');
        const otpRef = ref<HTMLInputElement[]>([]);
        const otpLength = ref(4);
        const selectedLoginOption = ref('');

        const verificationCodeEntered = ref(false)

        onBeforeUpdate(() => {
            otpRef.value = []
        })

        onBeforeMount(() => {
            let oldSession = window.sessionStorage.getItem('userSession')

            if (!oldSession) {
                window.sessionStorage.setItem('userSession', JSON.stringify(initSession))
                return
            }

            let oldSessionObj: UserSession = JSON.parse(oldSession)
            step.value = oldSessionObj.step
            phoneNumber.value = oldSessionObj.phoneNumber
            useAuth().setVerificationToken(oldSessionObj.verificationToken)
        })

        onMounted(async () => {
            verificationCodeEntered.value = false
            try {
                await getLoginOption()
                if(loginOption.value.phone) {
                    selectedLoginOption.value = 'phone'
                } else if(loginOption.value.email) {
                    selectedLoginOption.value = 'email'
                }
            } catch (e) {
                console.log(e)
            }
        })

        const setPhoneNumber = (v: string) => {
            phoneNumber.value = v;
            errorMsg.value = '';
        }

        const setEmail = (v: string) => {
            email.value = v;
            errorMsg.value = '';
        }

        const setPhoneAuthCode = (code: string) => {
            phoneAuthCode.value = code;
            errorMsg.value = '';
            verificationCodeEntered.value = true;
        }
        
        const gotoStaticPage = () => {
            let baseUrl:string;
            if(locale.value === 'en') {
                baseUrl = import.meta.env.VITE_STATIC_PAGE_URL
            } else {
                baseUrl =  import.meta.env.VITE_STATIC_PAGE_URL_FR
            }
            location.href = baseUrl
        }

        const switchLoginOption = (option: string) => {
            selectedLoginOption.value = option;
        }

        // const handleOTPInput = (event: KeyboardEvent, i: number) => {
        //     if (event.key === 'Backspace') {
        //         otp.value[i] = '';
        //         if (i !== 0)
        //             otpRef.value[i - 1].focus();
        //         otpRef.value[i - 1].select();
        //     }
        //     else if (i < (otpLength.value - 1) && otp.value[i] !== '') {
        //         otpRef.value[i + 1].focus()
        //     }
        //     else if (i === (otpLength.value - 1)) {
        //         // on pin complete
        //         console.log('submit')

        //         verifyOtp()
        //         // on pin error
        //         otpRef.value[0].focus()
        //         otp.value = ["", "", "", ""]
        //     }
        // }

        const loginWithPhoneNumber = async () => {
            if (!phoneNumber.value) {
                errorMsg.value = t("phone_number_required")
                phoneNumberElement.value?.setError()
                GAnalytics.logCustomEvent('login_not_provided_phone_number', {
                    locale: locale.value,
                })
                return
            }
            isBtnLoginLoading.value = true;
            try {
                await useAuth().loginWithPhoneNumber(phoneNumber.value);

                GAnalytics.logCustomEvent('login_start', {
                    locale: locale.value,
                    phone_number: phoneNumber.value,
                })

                step.value = 1
                // userSession is added when the compoment is mounted
                // always defined 
                let oldSessionObj = <UserSession>JSON.parse(<string>window.sessionStorage.getItem('userSession'))

                let newSessionObj: UserSession = {
                    ...oldSessionObj,
                    step: 1,
                    phoneNumber: phoneNumber.value
                }
                window.sessionStorage.setItem('userSession', JSON.stringify(newSessionObj))

            } catch (e) {
                if (e instanceof Error) {
                    errorMsg.value = e.message
                    phoneNumberElement.value?.setError()
                }

                GAnalytics.logCustomEvent('login_invalid_phone_number', {
                    locale: locale.value,
                    phone_number: phoneNumber.value,
                })
            }
            isBtnLoginLoading.value = false;
        }

        const loginWithEmail = async () => {
            if (!email.value) {
                errorMsg.value = 'Email required'
                // errorMsg.value = t("required_field", {field_label: t("email")})
                emailElement.value?.setError()
                return
            }
        }

        const verifyOtp = async () => {
            // const phoneAuthCode = otp.value.join('');
            if (!phoneAuthCode.value) {
                errorMsg.value = t("auth_code_required")
                verifyAuthCodeElement.value?.setError()
                return
            }
            isBtnOtpLoading.value = true
            try {
                await useAuth().verifyPhoneAuthCode(Number(phoneAuthCode.value));

                GAnalytics.logCustomEvent('login_successful', {
                    locale: locale.value,
                    phone_number: phoneNumber.value,
                    verification_code: phoneAuthCode.value
                })

                router.push({ name: 'Homepage' })

                // userSession no longer required
                // reset session when logged in 
                window.sessionStorage.setItem('userSession', JSON.stringify(initSession))
            } catch (e) {
                if (e instanceof Error) {
                    errorMsg.value = e.message
                    verifyAuthCodeElement.value?.setError()
                }
                GAnalytics.logCustomEvent('login_failed', {
                    locale: locale.value,
                    phone_number: phoneNumber.value,
                    verification_code: phoneAuthCode.value
                })
            }
            isBtnOtpLoading.value = false
        }

        const changePhoneNumber = () => {
            step.value = 0
            phoneNumber.value = ''
            phoneAuthCode.value = ''
            // otp.value = ["", "", "", ""]
            window.sessionStorage.setItem('userSession', JSON.stringify(initSession))
        }

        watch(verificationCodeEntered, (newValue) => {
            if(newValue) {
                GAnalytics.logCustomEvent('login_verification_code_entry', {})
            }
        })

        return {
            // otp,
            step,
            otpRef,
            otpLength,
            selectedLoginOption,
            phoneNumber,
            isBtnLoginLoading,
            isBtnOtpLoading,
            errorMsg,
            appBranding,
            appPageSettings,
            phoneNumberElement,
            emailElement,
            verifyAuthCodeElement,
            loginOption,
            locale,
            // handleOTPInput,
            switchLoginOption,
            loginWithPhoneNumber,
            loginWithEmail,
            verifyOtp,
            setPhoneNumber,
            setEmail,
            setPhoneAuthCode,
            changePhoneNumber,
            gotoStaticPage
        };
    }
});
</script>