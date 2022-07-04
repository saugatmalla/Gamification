<template>
    <div class="w-5/6 m-auto pt-8">
        <div class="mt-6 mb-4 text-txt-primary flex justify-between items-center">
            <div class="italic font-[800] uppercase text-2xl">
                {{$t("my_profile")}}
            </div>
             <div class="cursor-pointer transform-transition duration-300 ease-linear hover:scale-110" @click.prevent="userLogout">
                <svg width="16" height="16" class="inline mb-1 mr-2" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.72667 10.3933L7.66667 11.3333L11 8L7.66667 4.66667L6.72667 5.60667L8.44667 7.33333H2V8.66667H8.44667L6.72667 10.3933ZM14 2H2V6H3.33333V3.33333H12.6667V12.6667H3.33333V10H2V14H14V2Z"
                        fill-rule="evenodd" clip-rule="evenodd" />
                </svg>
                <span class="">{{$t("logout")}}</span>
            </div>
        </div>
        <div class="mb-4 w-full text-txt-primary text-right">
           
        </div>

        <form>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField :defaultValue="authUser.first_name" :fieldLabel="$t('first_name')" :isRequired="true"
                    :readOnly="true" class="sm:col-span-1"></TextField>
                <TextField :defaultValue="authUser.last_name" :fieldLabel="$t('last_name')" :isRequired="true" :readOnly="true"
                    class="sm:col-span-1"></TextField>
                <TextField :defaultValue="userEmail" :fieldLabel="$t('email')" :readOnly="true" class="sm:col-span-2"
                    v-if="userEmail"></TextField>
                <TextField :defaultValue="userPhone" :fieldLabel="$t('phone')" :readOnly="true" class="sm:col-span-2"
                    v-if="userPhone"></TextField>

                <TextField :defaultValue="authUser.dob" :fieldLabel="$t('date_of_birth')" :isRequired="true"
                    :readOnly="true" class="sm:col-span-1"></TextField>
                <TextField v-if="userDefaultAddress?.province" :defaultValue="$t(provinces[userDefaultAddress?.province])" fieldLabel="Province" :isRequired="true" :readOnly="true"
                    class="sm:col-span-1"></TextField>
            </div>
            <div v-for="term in authUser.app_terms" :key="term.id"
            class="mt-4">
                <input class="shrink-0 mr-2 mt-1"
                    type="checkbox" :name="term.id + '-term'" :id="term.id + '-term'" :checked="term.is_accepted" @change="toggleTerm(term.id)"/>
                <label :for="term.id + '-term'"
                    class="text-txt-primary cursor-pointer"
                    v-html="term.locales.find(el => el.locale.toLocaleLowerCase() === selectedLanguage)?.term || term.term">
                </label>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import TextField from "../../../components/inputs/TextField.vue";
import { useAuth } from "../../../composables/useAuth";
import useAppSetup from '../../../composables/useAppSetup';
import GAnalytics from '../../../utils/GAnalytics';

const router = useRouter();
const { logout, authUser, userContactDetails, userDefaultAddress, getUserProfile, toggleAppTerms } = useAuth();
const {selectedLanguage} = useAppSetup();

const userEmail = computed(() => {
    return userContactDetails.find(el => el.contact_type === "email")?.contact_value;
});

const userPhone = computed(() => {
    return userContactDetails.find(el => el.contact_type === "phone")?.contact_value;
});

const provinces: { [key: string]: string } = {
    'AB': 'alberta',
    'BC': 'british_columbia',
    'MB': 'manitoba',
    'NB': 'new_brunswick',
    'NL': 'newfoundland_and_labrador',
    'NS': 'nova_scotia',
    'ON': 'ontario',
    'PE': 'prince_edward_island',
    'QC': 'quebec',
    'SK': 'saskatchewan',
    'YT': 'yukon',
    'NU': 'nunavut',
    'NT': 'northwest_territoriess',
}

const toggleTerm = (termId: number) => {
    console.log(termId);
    toggleAppTerms(termId);
}

const userLogout = async () => {
    await logout();
    GAnalytics.logCustomEvent('myprofile_logout', {})
    router.push("/login");
};


onMounted(async () => {
    await getUserProfile({contactDetails: true, addresses: true, terms: true});
    // await getUserContactDetails();
    // await getUserAdresses();
});


</script>