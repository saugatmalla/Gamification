<template>
    <TransitionRoot :show="isOpen">
        <Dialog class="fixed overflow-y-auto top-[4.5rem]" :open="isOpen">
            <!-- Backdrop -->
            <TransitionChild enter="transition-opacity ease-in duration-100" enter-from="opacity-0 "
                enter-to="opacity-100" leave="transition-opacity ease-in duration-200" leave-from="opactiy-100"
                leave-to="opacity-0">
                <DialogOverlay
                    class="h-[var(--app-fill-height)] w-screen bg-primary-bg bg-opacity-60 filter backdrop-blur-sm">
                </DialogOverlay>
            </TransitionChild>

            <TransitionChild class="absolute top-0 h-full w-full flex justify-center items-center "
                enter="transition-opacity ease-in duration-100" enter-from="opacity-0 " enter-to="opacity-100"
                leave="transition-opacity ease-in duration-200" leave-from="opactiy-100" leave-to="opacity-0">
                <main class="w-[340px] lg:w-[496px] 2xl:w-[624px] p-8 bg-primary text-txt-primary ">
                    <div class="w-full flex flex-col space-y-4 items-center">
                        <div v-if="appPageSettings?.transactions?.confirmation_header_image"
                            class="max-w-[195px]" >
                            <img class="w-full max-w-[195px]" :src="appPageSettings?.transactions?.confirmation_header_image" alt="logo">
                        </div>
                        <p class="uppercase text-xl font-bold">{{$t("merchandise_redeemed")}}</p>
                        <p class="text-center">
                          {{$t("checkout_success_msg")}} 
                        </p>
                        <Button :label="$t('confirm')" @click.prevent="closeCheckout"></Button>
                    </div>
                </main>
            </TransitionChild>

        </Dialog>
    </TransitionRoot>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from '@headlessui/vue'
import Button from '../../components/buttons/Button.vue'
import  useAppSetup  from '../../composables/useAppSetup'
import GAnalytics from '../../utils/GAnalytics'

const router = useRouter()
const { appPageSettings } = useAppSetup()

defineProps({
    isOpen: {
        type: Boolean,
        default: false,
        required: true
    },
})

const closeCheckout = () => {
    GAnalytics.logCustomEvent('prize_confirmation', {})
    router.push({ name: 'Homepage' })
}
</script>