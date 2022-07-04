<template>
    <div class="xl:grid xl:grid-cols-1 xl:w-5/6 min-h-[var(--app-fill-height)] mx-auto px-6 items-center">
        <!-- <div class="xl:h-full xl:pb-[102px] xl:pt-[80px]"> -->
        <div class>
            <div class="xl:grid gap-2 items-center" :class="[
                (appBranding?.marketing_image_url || appBranding?.marketing_video_url) ? 'xl:grid-cols-3' : 'xl:grid-cols-1',
            ]">
                <div v-if="appBranding?.marketing_video_url || appBranding?.marketing_image_url"
                    class="hidden sm:block sm:mt-4 xl:col-span-2 xl:col-start-2 xl:w-[95%] xl:justify-self-end">
                    <!-- video -->
                    <video v-if="appBranding.marketing_video_url" autoplay controls muted loop height="100%"
                        width="100%">
                        <source :src="appBranding.marketing_video_url" type="video/mp4" />video is not supported
                    </video>
                    <!-- image -->
                    <img v-else-if="appBranding?.marketing_image_url" class :src="appBranding?.marketing_image_url"
                        alt="login video" />
                </div>
                <!-- input container -->
                <div
                    class="mt-4 p-4 sm:w-[300px] xl:w-[360px] 2xl:w-[431px] sm:mx-auto xl:col-span-1 xl:row-start-1 bg-primary-bg/50">
                    <div class>
                        <p
                            class="w-[242px] md:w-full mx-auto text-center text-txt-primary uppercase font-bold italic text-2xl">
                            {{ $t("password_recover") }} </p>

                        <form class="mt-6" novalidate @submit.prevent="recoverPassword">
                            <TextField fieldLabel="Phone or Email" type="text" :errorMsg="errorMsg" autocomplete="on"
                                class="mb-2" ref="inputRef" @changed="handleInput"></TextField>
                            <button
                                class="w-full mt-4 flex justify-center items-center bg-btn-primary rounded-[4px] h-[54px] text-btn-text text-lg uppercase font-black hover:bg-btn-hover transition-colors duration-200 disabled:bg-btn-disabled disabled:text-btn-disabled-text disabled:cursor-not-allowed"
                                :disabled="isBtnLoginLoading" type="submit">{{ $t("confirm") }}</button>
                            <div class="mt-4 text-center">
                                <p class="italic" :class="[showSuccessMsg ? 'text-txt-accent' : 'text-txt-primary']">{{
                                        msg
                                }}</p>
                            </div>
                            <div class="mt-4 text-center">
                                <span class="text-txt-primary">{{ $t("back_to") }}</span>
                                <span class="ml-2 font-bold text-txt-accent uppercase cursor-pointer" role="link"
                                    @click="$router.push('/login')"> {{ $t("login") }} </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bottom-16 mt-4 md:mt-0">
            <div class="md:flex md:flex-wrap md:space-x-8 children:pb-8 children:pd:mb-0">
                <!-- TODO: Use vue-18n component interpolation
                    - https://vue-i18n.intlify.dev/guide/advanced/component.html
                -->
                <div class="grow">
                    <p class="text-txt-primary uppercase font-black italic text-4xl">{{$t('text')}}</p>
                    <hr class="border-[#F79A2A] my-2" />
                    <i18n-t keypath="music_to" tag="p" class="uppercase font-bold text-2xl">
                        <template v-slot:music_to_1>
                            <span class="text-txt-accent">{{$t('music_to_1')}}</span>
                        </template>
                        <template v-slot:music_to_2>
                            <span class="px-2 text-txt-primary">{{$t('music_to_2')}}</span>
                        </template>
                        <template v-slot:music_to_3>
                            <span class="text-txt-accent">{{$t('music_to_3')}}</span>
                        </template>
                    </i18n-t>
                </div>

                <div class="grow">
                    <p class="text-txt-primary uppercase font-black italic text-4xl">{{$t('enter')}}</p>
                    <hr class="border-[#F79A2A] my-2" />
                   <i18n-t keypath="currency_codes" tag="p" class="uppercase font-bold text-2xl">
                        <template v-slot:currency_codes_1>
                            <span class="text-txt-accent">{{$t('currency_codes_1')}}</span>
                        </template>
                        <template v-slot:currency_codes_2>
                            <span class="px-2 text-txt-primary">{{$t('currency_codes_2')}}</span>
                        </template>
                        <template v-slot:currency_codes_3>
                            <span class="text-txt-accent">{{$t('currency_codes_3')}}</span>
                        </template>
                    </i18n-t> 
                    <!-- <p class="uppercase font-bold text-2xl">
                        <span class="text-txt-primary">The</span>
                        <span class="px-2 text-txt-accent">{{ appSetup.currency_name }}</span>
                        <span class="text-txt-primary">Codes</span>
                    </p> -->
                </div>

                <div class="grow">
                    <p class="text-txt-primary uppercase font-black italic text-4xl">{{$t('redeem')}}</p>
                    <hr class="border-[#F79A2A] my-2" />
                    <i18n-t keypath="text_for_merchandise" tag="p" class="uppercase font-bold text-2xl">
                        <template v-slot:text_for_merchandise_1>
                            <span class="text-txt-accent">{{$t('text_for_merchandise_1')}}</span>
                        </template>
                        <template v-slot:text_for_merchandise_2>
                            <span class="px-2 text-txt-primary">{{$t('text_for_merchandise_2')}}</span>
                        </template>
                    </i18n-t> 
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useAppSetup from '../../../composables/useAppSetup';
import { useAuth } from '../../../composables/useAuth';
import TextField from '../../../components/inputs/TextField.vue';
import { useI18n } from 'vue-i18n'


const { appSetup, appBranding } = useAppSetup()
const { requestPasswordReset } = useAuth()

const { t } = useI18n();

const errorMsg = ref('')
const isBtnLoginLoading = ref(false)
const msg = ref(t('forgot_password_msg'))
const showSuccessMsg = ref(false)
const contactInfo = ref('')
const inputRef = ref<InstanceType<typeof TextField>>()

const handleInput = (v: string) => {
    errorMsg.value = ''
    contactInfo.value = v
}

const recoverPassword = async () => {
    if (!contactInfo.value) {
        errorMsg.value = 'Required'
        inputRef.value?.setError()
        return
    }

    try {
        await requestPasswordReset(contactInfo.value)
        msg.value = 'An email is sent to recover your password if provided email is valid for login'
        showSuccessMsg.value = true
        // inputRef.value?.clearField()
    } catch (e) {
        if (e instanceof Error) {
            errorMsg.value = e.message
            inputRef.value?.setError()
        }
    }
}

</script>