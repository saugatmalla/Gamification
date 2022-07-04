<template>
    <TransitionRoot :show="show" enter="transition transform ease-in duration-200" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition transform ease-in duration-100" leave-from="opactiy-100"
        leave-to="opacity-0" class>
        <Dialog class="fixed top-0 short:top-[4.5rem]" :open="show">
            <!-- Backdrop -->
            <DialogOverlay
                class="h-screen w-screen bg-primary-bg/40 short:bg-inherit  md:bg-opacity-80 filter backdrop-blur-sm transition-all duration-300 linear">
            </DialogOverlay>
            <section class="h-full absolute top-0 left-0 pt-6 short:pt-2 w-full filter select-none">
                <TransitionChild class enter="transition transform ease-in duration-200" enter-from="opacity-0"
                    enter-to="opacity-100" leave=" " leave-from="opacity-100" leave-to="opacity-0">
                    <div class="flex mb-4 w-full lg:w-5/6 lg:mx-auto px-6 justify-between items-center">
                        <div class="text-txt-primary italic font-[800] uppercase text-2xl">{{ $t("merch") }}</div>
                        <div class="text-txt-primary cursor-pointer hover:scale-110 transition-all duration-200"
                            @click="$emit('dismiss-merch')">
                            <svg width="14" height="14" class="inline mr-2" viewBox="0 0 14 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                                    fill="white" />
                            </svg>
                            {{ $t("close") }}
                        </div>
                    </div>
                    <!-- Carousel Start -->

                    <div class="reward-container">
                        <div v-for="(reward, index) in rewards" :key="reward.id" class="reward-item" :class="
                            `reward-item-${index + 1}`,
                            {
                                'opacity-100': reward.id === selectedReward.id,
                                'opacity-0': reward.id !== selectedReward.id,
                                'xl:opacity-100': (index + 1) < 6,
                                'xl:opacity-0': (availableRewards && availableRewards?.length === 4 && index === 0) || (availableRewards && availableRewards?.length < 3 && index !== 2)
                            }
                        ">
                            <img v-if="reward?.image_url" class="w-full h-full object-contain primary-drop-shadow"
                                :src="reward?.image_url"
                                :class="{ 'opacity-60': selectedReward.total_qty - selectedReward.total_claimed === 0 || userCurrentPoints < selectedReward?.points_required }"
                                :alt="selectedReward?.desc" />
                        </div>
                        <div class="left-[50%] w-full">
                            <div id="active"
                                class="flex flex-col justify-center items-center w-[248px] short:w-[272px] mx-auto">
                                <div
                                    class="h-24 uppercase font-bold italic text-xl short:text-2xl text-center leading-8 text-txt-primary xs:w-[240px]">
                                    {{getRewardsLocalizedName(selectedReward?.locales) || selectedReward.name }}</div>
                                <div
                                    class="mt-4 w-[148px] h-[132px] short:h-[148px] short:sm:w-64 short:sm:h-64 text-center">
                                </div>
                                <p class="h-4 m-0 font-bold uppercase italic" :class="[
                                    selectedReward.total_qty - selectedReward.total_claimed > 0 && userCurrentPoints >= selectedReward?.points_required ? 'text-txt-accent' : 'text-txt-primary',
                                ]" style="padding: 0 5px;">
                                    {{ $t("points_required", {
                                    points: selectedReward?.points_required,
                                    currency_name: selectedReward?.points_required == 1 ? appSetup.currency_name :
                                    appSetup.currency_name_plural
                                    })
                                    }}
                                </p>
                                <div class="">
                                    <p class="mt-4 px-4 text-center text-txt-primary uppercase text-xs font-bold">
                                        {{getRewardsLocalizedDesc(selectedReward?.locales) || selectedReward?.desc}}
                                    </p>
                                </div>
                                <div class="mt-2 text-xs text-txt-primary text-center">
                                    <p class="leading-4 w-2/3 mx-auto">
                                        {{$t("reward_caution")}}
                                    </p>
                                    <p class="mt-2">{{$t("shipping_included")}}</p>
                                    <p class="mt-2">{{$t("while_quantities_last")}}</p>
                                </div>
                                <div class="mt-2 w-[232px] short:w-[272px]">
                                    <button
                                        class="w-full h-10 short:h-14 bg-btn-primary text-btn-text uppercase font-bold text-lg rounded-[4px] hover:bg-btn-hover transition-colors duration-200 disabled:bg-btn-disabled disabled:text-btn-disabled-text disabled:cursor-not-allowed"
                                        :disabled="selectedReward.total_qty - selectedReward.total_claimed === 0 || userCurrentPoints < selectedReward?.points_required"
                                        @click.stop="addToCart">{{ selectedReward.total_qty -
                                        selectedReward.total_claimed === 0 ? $t("sold_out") : $t("redeem")
                                        }}</button>
                                </div>
                                <div class="flex items-end h-8 text-center text-txt-primary text-xs" :class="{'text-txt-error': prizeMsg?.show && prizeMsg?.type === 'error'
                                }, [(selectedReward.id === prizeMsg?.id) && prizeMsg?.show ? 'visible' : 'invisible']">
                                    {{prizeMsg.msg}}
                                </div>
                                <div class="hidden short:flex sm:short:hidden mt-2 w-[272px] justify-between">
                                    <div class="border rounded-full border-txt-accent p-2" @click="getPreviousReward"
                                        v-if="(availableRewards && availableRewards?.length > 1)">
                                        <svg width="30" height="30" viewBox="0 0 30 30" class="text-txt-accent"
                                            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M25 13.75H9.7875L16.775 6.7625L15 5L5 15L15 25L16.7625 23.2375L9.7875 16.25H25V13.75Z"
                                                fill-rule="evenodd" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="border rounded-full p-2 border-txt-accent" @click="getNextReward"
                                        v-if="(availableRewards && availableRewards?.length > 1)">
                                        <svg width="30" height="30" viewBox="0 0 30 30" class="text-txt-accent"
                                            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5 13.75H20.2125L13.225 6.7625L15 5L25 15L15 25L13.2375 23.2375L20.2125 16.25H5V13.75Z"
                                                fill-rule="evenodd" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="z-10 block absolute short:hidden short:sm:block left-4 sm:left-[20%] md:left-[25%] xl:left-[35%] w-12 h-12 border rounded-full border-txt-accent p-2 cursor-pointer transition-transform duration-200 ease-out hover:scale-110"
                            @click="getPreviousReward" v-if="(availableRewards && availableRewards?.length > 1)">
                            <svg width="30" height="30" viewBox="0 0 30 30" class="text-txt-accent" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M25 13.75H9.7875L16.775 6.7625L15 5L5 15L15 25L16.7625 23.2375L9.7875 16.25H25V13.75Z"
                                    fill-rule="evenodd" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <!-- Next Button -->
                        <div class="z-10 block absolute short:hidden short:sm:block right-4 sm:right-0 sm:left-[75%] md:left-[69%] xl:left-[62%] w-12 h-12 border rounded-full p-2 border-txt-accent cursor-pointer transition-transform duration-200 ease-out hover:scale-110"
                            @click="getNextReward" v-if="(availableRewards && availableRewards?.length > 1)">
                            <svg width="30" height="30" viewBox="0 0 30 30" class="text-txt-accent" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 13.75H20.2125L13.225 6.7625L15 5L25 15L15 25L13.2375 23.2375L20.2125 16.25H5V13.75Z"
                                    fill-rule="evenodd" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <!-- Previous Button -->

                    <!-- Carousel End -->
                </TransitionChild>
            </section>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
import { ref } from "vue";
import { useRewards } from "../../../composables/useRewards";
import { useAuth } from "../../../composables/useAuth";
import useAppSetup from "../../../composables/useAppSetup";
import useAppState from "../../../composables/useAppState";
import { Rewards } from "../../../middlewares";
import { getRewardsLocalizedName, getRewardsLocalizedDesc } from "../../../composables/utils";
import { useI18n } from "vue-i18n";

const { selectedReward, availableRewards, setSelectedReward, userCurrentPoints } = useRewards();
const { getUserProfile } = useAuth();
const { appSetup} = useAppSetup();
const { toggleCart } = useAppState();
const {t} = useI18n();

defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true
    }
})
defineExpose({
    setRewards
})

const rewards = ref<Rewards[]>([])
const buttonLoading = ref(false)

const emptyReward: Rewards = {
    id: Math.random(),
    name: "",
    desc: "",
    sku: "",
    image_url: "",
    total_qty: 0,
    total_claimed: 0,
    points_required: 0,
    reward_type: "digital",
    retail_value: 0,
    shipping_required: false,
    shipping_cost: 0,
    sort_order: 1,
    is_available: false,
}

const prizeMsg = ref<{
    id?: number;
    show: boolean;
    msg: string;
    type: 'success' | 'error';
}>({id: undefined, show: false, msg: '', type: 'success'})

function setRewards() {
    rewards.value = [...availableRewards.value as Rewards[]]
    const rewardsLength = rewards.value?.length;
    const currentIndex = rewards.value?.findIndex(el => el.id === selectedReward.value.id);

    if (rewardsLength >= 4) {
        if (currentIndex === 0) {
            let firstHalf = rewards.value?.slice(rewardsLength - 2)
            let secondHalf = rewards.value?.slice(0, rewardsLength - 2)
            rewards.value = [...firstHalf, ...secondHalf]
            return
        } else if (currentIndex === 1) {
            if (rewards.value?.length) {
                const temp = rewards.value?.pop();
                if (temp)
                    rewards.value?.unshift(temp);
                return
            }
        } else if (currentIndex > 2) {
            let firstHalf = rewards.value?.slice(currentIndex - 2, currentIndex)
            let secondHalf = [...rewards.value?.slice(currentIndex), ...rewards.value?.slice(0, currentIndex - 2)]
            rewards.value = [...firstHalf, ...secondHalf]
        }
    } else if (rewardsLength === 3) {
        if (currentIndex === 0) {
            let temp = (rewards.value as Rewards[]).pop()
            if (temp) {
                emptyReward.id = Math.random()
                let firstHalf = [emptyReward, temp]
                rewards.value = [...firstHalf, ...rewards.value]
            }
            return
        } else if (currentIndex === 1) {
            emptyReward.id = Math.random()
            rewards.value?.unshift(emptyReward)
            return
        } else if (currentIndex > 1) {
            let temp = (rewards.value as Rewards[]).shift()
            if (temp) {
                emptyReward.id = Math.random()
                let firstHalf = [emptyReward, ...rewards.value]
                rewards.value = [...firstHalf, temp]
            }
            return
        }
    } else if (rewardsLength === 2) {
        if (currentIndex === 0) {
            emptyReward.id = Math.random()
            let firstHalf = [emptyReward, rewards.value[1]]
            emptyReward.id = Math.random()
            let secondHalf = [rewards.value[0], emptyReward]
            rewards.value = [...firstHalf, ...secondHalf]
        } else if (currentIndex === 1) {
            emptyReward.id = Math.random()
            let firstHalf = [emptyReward, ...rewards.value]
            emptyReward.id = Math.random()
            let secondHalf = [emptyReward]
            rewards.value = [...firstHalf, ...secondHalf]
        }
    } else { // if 1 reward
        rewards.value = [emptyReward, emptyReward, rewards.value[0]]
    }

    return
}

const getNextReward = () => {
    if (rewards.value?.length && !buttonLoading.value) {
        buttonLoading.value = true
        setCurrentReward('next');
        if ((availableRewards.value as Rewards[]).length >= 4) {
            const lastElement = rewards.value?.shift();
            setTimeout(() => {
                if (lastElement)
                    rewards.value?.push(lastElement);
            }, 300)
        } else if ((availableRewards.value as Rewards[]).length === 3) {
            let temp = rewards.value[1]
            rewards.value[1] = rewards.value[2]
            rewards.value[2] = rewards.value[3]
            rewards.value[3] = emptyReward
            setTimeout(() => {
                rewards.value[3] = temp
                // buttonLoading.value = false
            }, 300)
        } else if ((availableRewards.value as Rewards[]).length === 2) {
            let temp = rewards.value[2]
            rewards.value[2] = rewards.value[1]
            rewards.value[1] = temp
            // buttonLoading.value = false
        }
        buttonLoading.value = false
    }
}

const setCurrentReward = (type: 'next' | 'previous') => {
    const currentIndex = rewards.value?.findIndex(el => el.id === selectedReward.value.id);
    if (type === 'next') {
        if ((availableRewards.value as Rewards[]).length <= 2) {
            setSelectedReward(rewards.value[1])
        }
        else setSelectedReward(rewards.value[currentIndex + 1]);
    } else {
        setSelectedReward(rewards.value[currentIndex - 1]);
    }
}
const getPreviousReward = () => {
    if (rewards.value?.length && !buttonLoading.value) {
        buttonLoading.value = true
        setCurrentReward('previous');
        if ((availableRewards.value as Rewards[]).length >= 4) {
            const lastElement = rewards.value?.pop();

            rewards.value?.unshift(emptyReward);

            setTimeout(() => {
                rewards.value?.shift()
                if (lastElement)
                    rewards.value?.unshift(lastElement);
                buttonLoading.value = false
            }, 300)
        } else if ((availableRewards.value as Rewards[]).length === 3) {
            let temp = rewards.value[3]
            rewards.value[3] = rewards.value[2]
            rewards.value[2] = rewards.value[1]
            rewards.value[1] = emptyReward
            setTimeout(() => {
                rewards.value[1] = temp
                // buttonLoading.value = false

            }, 300)
        } else if ((availableRewards.value as Rewards[]).length === 2) {
            let temp = rewards.value[1]
            rewards.value[1] = rewards.value[2]
            rewards.value[2] = temp
            // buttonLoading.value = false
        }
        buttonLoading.value = false
    }
}

const addToCart = async () => {
    if (selectedReward.value.is_available && (userCurrentPoints.value >= selectedReward.value?.points_required)) {
        const { addItemToCart } = useRewards()
        try {
            await addItemToCart(selectedReward.value.id)
            await getUserProfile();
            // toggleCart(true);
            let copy = {...prizeMsg.value}
            prizeMsg.value = {
                id: selectedReward.value.id,
                show: true,
                msg: t('reward_added_to_cart'),
                type: 'success'
            }
            setTimeout(() => prizeMsg.value = copy, 3000)
        } catch (e) {
            if(e instanceof Error) {
                let copy = {...prizeMsg.value}
                    prizeMsg.value = {
                        id: selectedReward.value.id,
                        show: true,
                        msg: e.message,
                        type: 'error'
                    }
                setTimeout(() => prizeMsg.value = copy, 3000)
            }
        }
    }
}

</script>

<style scoped>
.primary-drop-shadow {
    filter: drop-shadow(0px 3px 4px rgba(var(--color-text-accent), 0.34)) drop-shadow(0px 3px 3px rgba(var(--color-text-accent), 0.32)) drop-shadow(0px 1px 8px rgba(var(--color-text-accent), 0.42));
}

.secondary-drop-shadow {
    filter: drop-shadow(0 1px 2px rgba(var(--color-text-accent)));
}

.reward-container {
    display: flex;
    margin: 0 auto;
    position: relative;
    align-items: center;
}

.reward-item {
    height: 148px;
    width: 148px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    z-index: 0;
    left: 50%;
    top: 40%;
}

.reward-item-1 {
    left: 15%;
    transform: translateX(-50%);
}

.reward-item-2,
.reward-item-4 {
    width: 148px;
    height: auto;
    z-index: 1;
}

.reward-item-2 {
    left: 28%;
    transform: translateX(-50%);
}

.reward-item-3 {
    width: 248px;
    height: auto;
    opacity: 1;
    top: 96px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.reward-item-4 {
    left: 72%;
    transform: translateX(-50%);
}

.reward-item-5 {
    left: 85%;
    transform: translateX(-50%);
}

@media screen and (max-width: 640px) {
    .reward-item {
        top: 17%;
    }

    .reward-item-3 {
        width: 148px;
    }
}

@media screen and (max-height: 734px) {
    .reward-item-3 {
        width: 132px;
    }
}
</style>