<template>
    <section class="w-5/6 h-full m-auto pb-32">
        <div
            class="inline-block pt-4 text-txt-primary cursor-pointer"
            role="button"
            @click="gotoStaticPage"
        >
            <svg
                class="mb-1 h-4 w-4 inline"
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
            <span class="uppercase font-bold italic ml-3">{{$t("back_to_home")}}</span>
        </div>
        <form v-if="!campaignExpired" @submit.prevent="signup" novalidate>
            <div class="mt-6 mb-4 text-txt-primary italic font-[800] uppercase text-2xl">{{$t("sign_up")}}</div>
            <!-- 
                    TODO:
                    - A̶d̶d̶ v̶a̶l̶i̶d̶a̶t̶i̶o̶n̶ (̶a̶n̶d̶ e̶r̶r̶o̶r̶ m̶e̶s̶s̶a̶g̶e̶)̶
                    - Add grid layout (col_span)
                    - D̶a̶t̶e̶ p̶i̶c̶k̶e̶r̶ i̶s̶ o̶v̶e̶r̶f̶l̶o̶w̶i̶n̶g̶ t̶h̶e̶ p̶a̶g̶e̶
            -->
            <template
                v-for="(setting, index) in appRegistrationSettings.registration_fields.phone"
                :key="setting.field_key"
            >
                <DatePicker
                    v-if="(setting.field_type == 'dob') || setting.field_type == 'date'"
                    :fieldLabel="$t(setting.field_key)"
                    :isRequired="setting.is_required"
                    :fieldId="setting.field_key"
                    :errorMsg="$t('required_field', {field_label: $t(setting.field_key) })"
                    @changed="handleInputs"
                    class="mb-4"
                    :allow-future-dates="false"
                    :ref="(el: InputFields) => { inputComponents[index] = el }"
                ></DatePicker>

                <SelectField
                    v-else-if="setting.field_type == 'select'"
                    :fieldLabel="$t(setting.field_key)"
                    :optionLabel="(setting.field_key === 'province' ) ? 'select_province' : undefined"
                    :isRequired="setting.is_required"
                    :fieldId="setting.field_key"
                    :options="(setting.field_key === 'province' ) ? PROVINCES :
                        [{ text: '', value: '' }]"
                    @changed="handleInputs"
                    :errorMsg="$t('required_field', {field_label: $t(setting.field_key) })"
                    class="mb-4"
                    :ref="(el: InputFields) => { inputComponents[index] = el }"
                ></SelectField>

                <TextField
                    v-else
                     :fieldLabel="$t(setting.field_key)"
                    :type="setting.field_type"
                    :isRequired="setting.is_required"
                    :fieldId="setting.field_key"
                    :errorMsg="$t('required_field', {field_label: $t(setting.field_key) })"
                    @changed="handleInputs"
                    class="mb-4"
                    :ref="(el: InputFields) => { inputComponents[index] = el }"
                ></TextField>
            </template>
            <div class>
                <!-- <div class="flex items-start space-x-2">
                    <input class="mt-1 shrink-0"
                    type="checkbox" name="optionalTerm" id="optionalTerm" v-model="optionalTerm" />
                    <label for="optionalTerm"
                        class="text-txt-primary cursor-pointer">
                        <p>
                            {{$t('marketing_consent_text')}} 
                        </p>
                        <p>
                           {{$t('campaign_contact_text')}} 
                        </p>
                    </label>
                </div>
                <div class="flex space-x-2 ">
                    <input class="shrink-0 mt-1"
                     type="checkbox" name="requiredTerm" id="requiredTerm" v-model="requiredTerm" />
                    <label for="requiredTerm"
                        class="text-txt-primary cursor-pointer">
                    {{$t("agreement_prefix")}} 
                        <u
                            class="cursor-pointer"
                            @click.prevent="openContestRules"
                        >{{$t("agreement_rules")}}</u>
                        <u class="ml-1 cursor-pointer" @click.prevent="openTermsAndConditions">{{$t("agreement_terms")}} </u>.
                    </label>
                </div>
                <ErrorMsg :errorMsg="$t('required')" :showError="isRequiredTermError"></ErrorMsg> -->

                <div v-for="term in appRegistrationSettings.app_terms" :key="term.id">
                   <input class="shrink-0 mr-2 mt-1"
                     type="checkbox" :name="term.id + '-term'" :id="term.id + '-term'" v-model="termsValue[term.id].value"/>
                     <label :for="term.id + '-term'"
                        class="text-txt-primary cursor-pointer"
                        v-html="term.locales.find(el => el.locale.toLocaleLowerCase() === selectedLanguage)?.term || term.term">
                    </label>
                    <ErrorMsg :errorMsg="$t('required')" :showError="termsValue[term.id].hasError"></ErrorMsg>
                </div>
                
                <p class="text-txt-error" :class="{ 'hidden': !formError }">{{ formError }}</p>
                <button
                    class="w-full mt-6 flex justify-center items-center bg-btn-primary rounded-[4px] h-[54px] text-btn-text text-lg font-bold uppercase hover:bg-btn-hover transition-colors duration-200 disabled:bg-btn-disabled disabled:text-btn-disabled-text disabled:cursor-not-allowed"
                    :disabled="isBtnSignupLoading"
                >{{$t("sign_up")}} </button>
            </div>
        </form>
        <div
            v-else
            class="w-full h-full text-txt-primary text-center mt-20 text-2xl uppercase font-bold"
        >{{ formError }}</div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUpdate, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import useAppSetup from '../../../composables/useAppSetup';
import { useAuth } from '../../../composables/useAuth';
import TextField from '../../../components/inputs/TextField.vue'
import DatePicker from '../../../components/inputs/DatePicker.vue'
import SelectField from '../../../components/inputs/SelectField.vue';
import ErrorMsg from '../../../components/Error/ErrorMsg.vue';
import { UserSession } from '../../../middlewares';
import { useI18n} from 'vue-i18n';
import GAnalytics from '../../../utils/GAnalytics';

type InputFields = InstanceType<typeof TextField> | InstanceType<typeof DatePicker> | InstanceType<typeof SelectField>

const { appRegistrationSettings, setRegistrationSettings, selectedLanguage } = useAppSetup();
const { registerWithPhoneNumber } = useAuth()
const router = useRouter();
const {t} = useI18n();

let user: {
    phone_number: string;
    email: string;
    [key: string]: string;
} = {
    phone_number: '',
    email: ''
}

let initSession: UserSession = {
    phoneNumber: '',
    verificationToken: '',
    step: 0
}

const PROVINCES = [
    { value: 'AB', text: 'alberta' },
    { value: 'BC', text: 'british_columbia' },
    { value: 'MB', text: 'manitoba' },
    { value: 'NB', text: 'new_brunswick' },
    { value: 'NL', text: 'newfoundland_and_labrador' },
    { value: 'NT', text: 'northwest_territories' },
    { value: 'NS', text: 'nova_scotia' },
    { value: 'NU', text: 'nunavut' },
    { value: 'ON', text: 'ontario' },
    { value: 'PE', text: 'prince_edward_island' },
    { value: 'QC', text: 'quebec' },
    { value: 'SK', text: 'saskatchewan' },
    { value: 'YT', text: 'yukon' }
]

// const PROVINCES = [
//     { value: 'AB', text: 'Alberta' },
//     { value: 'BC', text: 'British Columbia' },
//     { value: 'MB', text: 'Manitoba' },
//     { value: 'NB', text: 'New Brunswick' },
//     { value: 'NL', text: 'Newfoundland and Labrador' },
//     { value: 'NS', text: 'Nova Scotia' },
//     { value: 'ON', text: 'Ontario' },
//     { value: 'PE', text: 'Prince Edward Island' },
//     { value: 'QC', text: 'Quebec' },
//     { value: 'SK', text: 'Saskatchewan' },
//     { value: 'YT', text: 'Yukon' },
//     { value: 'NU', text: 'Nunavut' },
//     { value: 'NT', text: 'Northwest Territories' },
// ]

// const FR_PROVINCES = [
//     { value: 'AB', text: 'L\'Alberta' },
//     { value: 'BC', text: 'La Colombie-Britannique' },
//     { value: 'MB', text: 'Le Manitoba' },
//     { value: 'NB', text: 'Le Nouveau-Brunswick' },
//     { value: 'NL', text: 'La Terre-Neuve-et-Labrador' },
//     { value: 'NS', text: 'La Nouvelle-Écosse' },
//     { value: 'ON', text: 'L\'Ontario' },
//     { value: 'PE', text: 'Île-du-Prince-Édouard' },
//     { value: 'QC', text: 'Le Québec' },
//     { value: 'SK', text: 'La Saskatchewan' },
//     { value: 'YT', text: 'Le Yukon' },
//     { value: 'NU', text: 'Le Nunavut' },
//     { value: 'NT', text: 'Les Territoires du Nord-Ouest' },
// ]

const campaignExpired = ref(true)
const signupStarted = ref(false)
const inputComponents = ref<(InputFields)[]>([]);
const isBtnSignupLoading = ref(false)
const formError = ref('')
// const requiredTerm = ref(false)
// const optionalTerm = ref(false)
type terms = {
        [key:string | number]: {
            value: boolean; required: boolean; hasError: boolean;
        }
    }
const termsValue = ref<terms>({

})
// const isRequiredTermError = ref(false)

onBeforeUpdate(() => {
    inputComponents.value = []
})

onMounted(() => {
    let oldSession = window.sessionStorage.getItem('userSession')
    if (!oldSession) {
        window.sessionStorage.setItem('userSession', JSON.stringify(initSession))
    }
    init()
})

const init = async () => {
    try {
        await setRegistrationSettings()
        campaignExpired.value = false
        if(appRegistrationSettings.app_terms){
            appRegistrationSettings.app_terms.forEach(el => {
                termsValue.value[el.id] = {
                    value: false,
                    required: el.is_required,
                    hasError: false
                }
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            formError.value = e.message
        }
    }
    mapUser()
}

const mapUser = () => {
    if (appRegistrationSettings.phone) {
        appRegistrationSettings.registration_fields.phone
            .map(field => field.field_key)
            .forEach(key => user[key] = '')
    } else if (appRegistrationSettings.email) {
        appRegistrationSettings.registration_fields.email
            .map(field => field.field_key)
            .forEach(key => user[key] = '')
    }
    return
}

const gotoStaticPage = () => {
    let baseUrl:string;
    if(selectedLanguage.value === 'en') {
        baseUrl = import.meta.env.VITE_STATIC_PAGE_URL
    } else {
        baseUrl =  import.meta.env.VITE_STATIC_PAGE_URL_FR
    }
    location.href = baseUrl
    console.log(baseUrl)
}

const handleInputs = (v: string, id: string) => {
    user[id] = v
    formError.value = ''
    signupStarted.value = true
}


const checkValidation = () => {
    let valueArray: boolean[] = []
    inputComponents.value.forEach(component => {
        let value = component.validate()
        valueArray.push(value)
    })

    // if(!requiredTerm.value) {
    //     isRequiredTermError.value = true
    //     return false
    // }

    for(const i in termsValue.value) {
        if(termsValue.value[i].required && !termsValue.value[i].value) {
            termsValue.value[i].hasError = true
            valueArray.push(false)
        } else {
            valueArray.push(true)
        }
    }
    if (!valueArray.every(el => el)) {
        GAnalytics.logCustomEvent('signup_field_empty_failed', user)
        return false
    }
    return true
}

const signup = async () => {
    if(!checkValidation()) return
    
    isBtnSignupLoading.value = true
    let data = {
            ...user, ...{
                app_terms: Object.keys(termsValue.value).map(key => {
                    return {
                        id: Number(key),
                        value: termsValue.value[key].value
                    }
                })
            }
        }
    try {
        await registerWithPhoneNumber(data)

        // userSession is added when the compoment is mounted
        // always defined
        const oldSessionObj = <UserSession>JSON.parse(<string>sessionStorage.getItem('userSession'))

        const newSessionObj: UserSession = {
            ...oldSessionObj,
            step: 1, // set the step to 1 for verification screen
            phoneNumber: user.phone_number // required for 'Send Again' otp code

        }
        window.sessionStorage.setItem('userSession', JSON.stringify(newSessionObj))
        GAnalytics.logCustomEvent('signup_successful', data)
        // pushes to login verification screen
        router.push('/login')
    } catch (e) {
        if (e instanceof Error) {
            formError.value = e.message
        }
        GAnalytics.logCustomEvent('signup_failed', data)
    }
    isBtnSignupLoading.value = false
    signupStarted.value = false
}

// watch(requiredTerm, (newVal) => {
//     if(newVal) {
//         isRequiredTermError.value = false
//     }
// })

watch(termsValue, (newVal) => {
        for(const i in newVal) {
            if(newVal[i].value) {
                newVal[i].hasError = false
            }
        }
    }, 
    { deep: true }
)

watch(signupStarted, (newVal) => {
    if(newVal) {
        GAnalytics.logCustomEvent('signup_start', {})
    }
})

</script>