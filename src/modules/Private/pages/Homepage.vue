<template>
    <div class="relative">
        <section class="w-[90%] md:w-5/6 mx-auto py-6">
            <div class="grid grid-cols-1 xl:grid-cols-2">
                <div v-if="appPageSettings.home?.enable_code_entry" class="mt-5 xl:mt-0">
                    <!--Start: Enter pin field -->
                    <form @submit.prevent="claimReward" class="sm:flex sm:items-center" novalidate>
                        <div class="w-full sm:flex-grow md:flex-grow-0 md:w-[387px] mr-2">

                            <!-- Override default class height with inline style -->
                            <TextField 
                                class="my-2"
                                fieldHeight="56px"
                                :fieldLabel="$t('enter_pin')"
                                type="text"
                                :isRequired="true"
                                fieldId="keyword"
                                autoComplete="off"
                                @changed="keywordChanged"
                                ref="keywordElement"
                            >
                                <template #prependIcon>
                                    <img v-if="appPageSettings?.home?.code_entry_icon"
                                        :src="appPageSettings.home?.code_entry_icon" alt="code icon" />
                                </template>
                            </TextField>
                        </div>
                        <div class="self-center">
                            <Button :label="$t('enter')" 
                            class="w-full sm:w-[157px] h-[56px]"
                            style="margin-top: 0;"
                            :disabled="isBtnLoading"
                            ></Button>
                        </div>
                    </form>

                    <p v-if="showSuccessMsg" class="flex space-x-3 mt-2 text-txt-primary" key="success">
                        <span>
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg" class="text-txt-accent mt-1">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M6.00002 11.2L1.80002 6.99998L0.400024 8.39998L6.00002 14L18 1.99998L16.6 0.599976L6.00002 11.2Z" />
                            </svg>
                        </span>
                        <span>{{ successMsg  }}</span>
                    </p>
                    <p v-else-if="errorMsg" class="text-txt-error mt-2 animate-shake-error" key="error">
                        {{ errorMsg }}
                    </p>
                    <!--End: Enter pin field -->
                </div>

                <div class="row-start-1 xl:col-start-2 xl:justify-self-end text-txt-primary">
                    <div class="flex space-x-4 xl:justify-end">
                        <div v-if="appPageSettings.home?.show_sweepstakes"
                            class="p-1 text-center uppercase italic h-16 w-1/2 xl:w-[145px] border-2 border-txt-accent rounded-[4px] bg-black">
                            <div class="-mb-1 text-xs leading-4">{{$t("sweeptakes")}}</div>
                            <div class="text-2xl leading-8 text-txt-accent font-[800]">{{ authUser.lifetime_points }}
                            </div>
                            <div class="-mt-1 text-xs leading-4">{{$t("entries")}}</div>
                        </div>
                        <i18n-t keypath="you_have_points" tag="div" v-if="appPageSettings.home?.show_total_points"
                        class="p-1 text-center uppercase italic h-16 w-1/2 xl:w-[145px] border-2 border-txt-accent rounded-[4px] bg-black -mb-1 text-xs leading-4">
                            <template #points >
                                <div class="text-2xl leading-8 text-txt-accent font-[800] -mt-1">
                                    {{ userCurrentPoints }}
                                </div>
                            </template>

                            <template #currency_name >
                                <div class="-mt-1 text-xs leading-4"> 
                                    {{ userCurrentPoints == 1 ?
                                    appSetup.currency_name : appSetup.currency_name_plural
                                    }} 
                                </div>
                            </template>
                        </i18n-t>
                    </div>

                    <CampaignTimer v-if="appPageSettings.home?.show_countdown" :end-date="appSetup.end_date || ''" class="mt-5 xl:mb-0 xl:text-right" />
                </div>
            </div>

            <div class="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-start gap-x-4 gap-y-4">
                <div v-for="reward in rewards" :key="reward.id" class="inline-block relative">
                    <!-- overlay -->
                    <div
                        class="absolute bg-primary/90 w-full h-full max-w-[308px] max-h-[340px] px-2 sm:px-5 pt-2 sm:pt-6 pb-3 sm:pb-5">
                    </div>

                    <div class="relative max-w-[308px] max-h-[340px] px-2 sm:px-5 pt-2 sm:pt-6 pb-3 sm:pb-5 bg-secondary/50 flex flex-col justify-start items-center cursor-pointer"
                        :class="{ 'bg-secondary/20': reward.total_qty - reward.total_claimed === 0 || userCurrentPoints < reward?.points_required }"
                        @click.prevent="selectReward(reward)">
                        <div
                            class="max-w-[180px] h-[48px] font-bold text-sm text-center leading-5 text-txt-primary font-ProximaNova-Regular">
                            {{getRewardsLocalizedName(reward.locales) || reward.name}}
                        </div>

                        <div
                            class="flex items-center justify-center mx-auto p-2 sm:p-4 max-w-[308px] h-[160px] max-h-[160px] text-center"
                            :class="{'h-32': (reward.id === prizeMsg?.id) && prizeMsg?.show }">
                            <img class="mx-auto max-w-full max-h-full w-auto h-auto"
                                :class="{ 'opacity-40': reward.total_qty - reward.total_claimed === 0 || userCurrentPoints < reward?.points_required}"
                                :src="reward?.image_url" :alt="reward?.desc" />
                        </div>
                        <p class="h-4 m-0 font-bold text-xs xs:text-sm uppercase italic"
                            :class="[reward.total_qty - reward.total_claimed > 0 && userCurrentPoints >= reward?.points_required ? 'text-txt-accent' : 'text-txt-primary']"
                            style="padding: 0 5px;">
                            {{ $t("points_required", {points: reward?.points_required, currency_name: reward?.points_required == 1 ?
                                    appSetup.currency_name : appSetup.currency_name_plural }) }}
                        </p>
                        <div
                            class="mt-4 max-w-[260px] h-6 text-[10px] xs:text-xs text-center text-txt-primary leading-3">
                            {{t("reward_remaining_qty", {qty: (reward.total_qty - reward.total_claimed).toLocaleString('en-US')})}}
                        </div>
                        <div class="w-full px-1 sm:px-0">
                            <button
                                class="w-full h-[32px] bg-btn-primary text-btn-text uppercase font-bold text-lg rounded-[4px] hover:bg-btn-hover transition-colors duration-200 disabled:bg-btn-disabled disabled:text-btn-disabled-text disabled:cursor-not-allowed"
                                :disabled="reward.total_qty - reward.total_claimed === 0 || userCurrentPoints < reward?.points_required"
                                @click.stop="addToCart(reward)">
                                {{
                                        reward.total_qty - reward.total_claimed === 0 ?
                                           $t("sold_out")  : $t("redeem")
                                }}
                            </button>
                        </div>
                        <div 
                         v-if="(reward.id === prizeMsg?.id) && prizeMsg?.show"
                        class="flex items-end h-8 text-center text-txt-primary text-xs"
                        :class="{'text-txt-error': prizeMsg?.show && prizeMsg?.type === 'error'}"
                        >
                            {{prizeMsg.msg}}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-show="isMerchOpen"
            class="hidden short:block absolute top-0 min-h-screen h-full w-screen bg-primary-bg bg-opacity-40 md:bg-opacity-80 filter backdrop-blur-sm transition-all duration-300 linear"> 
        </div>
    </div>
    <Merch ref="merchComponent" :show="isMerchOpen" @dismiss-merch="openMerch(false)"></Merch>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import Merch from "./Merch.vue";
import CampaignTimer from "../../../components/CampaignTimer.vue";
import { useAuth } from '../../../composables/useAuth';
import { useRewards } from '../../../composables/useRewards';
import { Rewards } from '../../../middlewares/auth/models';
import useAppSetup from "../../../composables/useAppSetup";
import useAppState from "../../../composables/useAppState";
import { useI18n } from "vue-i18n";
import { getRewardsLocalizedName } from "../../../composables/utils";
import TextField from "../../../components/inputs/TextField.vue";
import Button from "../../../components/buttons/Button.vue";
import GAnalytics from "../../../utils/GAnalytics";

const { appSetup, appPageSettings} = useAppSetup();
const { toggleCart } = useAppState();
const { authUser, getUserProfile } = useAuth();
const { setRewards, userCurrentPoints } = useRewards()
const { t } = useI18n()

const rewards = ref<Rewards[]>([])
const keywordElement = ref<InstanceType<typeof TextField>>()
const merchComponent = ref<InstanceType<typeof Merch>>()

const prizeMsg = ref<{
    id?: number;
    show: boolean;
    msg: string;
    type: 'success' | 'error';
}>({id: undefined, show: false, msg: '', type: 'success'})

async function init() {
    await setRewards()
    const { availableRewards } = useRewards()
    if (availableRewards.value)
        rewards.value = availableRewards.value
}

onMounted(() => {
    init()
})

const addToCart = async (reward: Rewards) => {
    if (reward.is_available && (userCurrentPoints.value >= reward?.points_required)) {
        const { addItemToCart } = useRewards()
        try {
            await addItemToCart(reward.id)
            await getUserProfile();
            // toggleCart(true)
            let copy = {...prizeMsg.value}
            prizeMsg.value = {
                id: reward.id,
                show: true,
                msg: t('reward_added_to_cart'),
                type: 'success'
            }
            setTimeout(() => prizeMsg.value = copy, 3000)
        } catch (e) {
            if(e instanceof Error) {
                let copy = {...prizeMsg.value}
                prizeMsg.value = {
                    id: reward.id,
                    show: true,
                    msg: e.message,
                    type: 'error'
                }
                setTimeout(() => prizeMsg.value = copy, 3000)
            }
        }

    }
}

const selectReward = (reward: Rewards) => {
    const { setSelectedReward } = useRewards()
    setSelectedReward(reward)
    openMerch(true)
}

const isMerchOpen = ref(false)

const openMerch = (v: boolean) => {
    isMerchOpen.value = v
    if (v) {
        merchComponent.value?.setRewards()
        document.documentElement.classList.add('overflow-hidden')
    } else {
        document.documentElement.classList.remove('overflow-hidden')
    }
}

const keyword = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const showSuccessMsg = ref(false)
const isBtnLoading = ref(false)

const keywordChanged = (v:string) => {
    errorMsg.value = ''
    keyword.value = v
}
const claimReward = async () => { 
    if (!keyword.value) {
        showSuccessMsg.value = false
        errorMsg.value = t("pin_required")
        return
    }
    isBtnLoading.value = true
    const { claimReward } = useRewards()
    try {
        await claimReward(keyword.value);
        await getUserProfile();
        showSuccessMsg.value = true;

        //make a copy so that when keyword is cleared, the success message retains its pin value
        let savedKeyword = keyword.value.slice()
        
        successMsg.value = t("enter_pin_success_msg",{currency_name: appSetup.currency_name, pin: savedKeyword} )
        errorMsg.value = '';
        keywordElement.value?.clearField() 
        GAnalytics.logCustomEvent('pin_entered_valid', {
            pin: savedKeyword
        })
    }
    catch (e) {
        showSuccessMsg.value = false
        if (e instanceof Error)
            errorMsg.value = e.message
        GAnalytics.logCustomEvent('pin_entered_invalid', {
            pin: keyword.value
        })
    }
    isBtnLoading.value = false
}

watch(keyword, () => {
    if (keyword.value) {
        showSuccessMsg.value = false
        errorMsg.value = ''
    }
})

</script>