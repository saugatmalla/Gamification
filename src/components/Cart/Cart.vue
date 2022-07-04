<template>
    <TransitionRoot :show="show">
        <div class="fixed h-[var(--app-fill-height)] overflow-y-hidden top-4.5 z-10" :v-show="show"
            role="dialog" :aria-modal="show">
            <!-- Backdrop -->
            <TransitionChild enter="transition-opacity ease-in duration-100" enter-from="opacity-0 "
                enter-to="opacity-100" leave="transition-opacity ease-in duration-200" leave-from="opactiy-100"
                leave-to="opacity-0">
                <div class="h-[var(--app-fill-height)] w-screen bg-primary-bg bg-opacity-60 filter backdrop-blur-sm"
                    @click.prevent="toggleCart(false)"></div>
            </TransitionChild>

            <!-- Cart -->
            <TransitionChild
                class="flex flex-col justify-between absolute bottom-0 sm:right-0 sm:top-0 w-full sm:w-[436px] min-h-[372px] sm:h-screen max-h-[var(--app-fill-height)] bg-secondary p-8 text-txt-secondary overflow-y-auto"
                enter="transition transform ease-in-out duration-400"
                enter-from="translate-y-full sm:translate-y-0 sm:translate-x-full"
                enter-to="translate-y-0 sm:translate-x-0" leave="transition transform ease-in duration-200"
                leave-from="translate-y-0  sm:translate-x-0"
                leave-to="translate-y-full sm:translate-y-0 sm:translate-x-full">
                <p class="font-bold italic uppercase" role="button" @click="toggleCart(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                   {{$t('close_and_continue_shopping')}} 
                </p>
                <!-- <Button label="test"></Button> -->

                <ul v-if="cartItems?.length" class="grow mt-4 overflow-y-auto">
                    <template v-for="(item, index) in cartItems" :key="index">
                        <li v-for="i in item.qty" :key="`${item.id}-${i}`"
                            class="mb-2 bg-primary flex w-full h-[88px] py-2 px-4 select-none">
                            <div class="w-[72px] h-[72px] shrink-0">
                                <img :src="item.reward?.image_url" :alt="item.reward?.desc"
                                    class="mx-auto w-auto h-auto max-w-full max-h-full" />
                            </div>

                            <div class="ml-4 mr-2 grow flex flex-col text-txt-primary justify-center font-bold text-sm">
                                <p>{{getRewardsLocalizedName(item.reward?.locales) || item.reward?.name }}</p>
                                <p class="text-txt-accent uppercase italic font-[12px]">
                                    {{$t('points_required', {
                                        points: item.reward?.points_required,
                                        currency_name: item.reward?.points_required == 1 ? appSetup.currency_name :
                                            appSetup.currency_name_plural
                                    })}} 
                                </p>
                            </div>

                            <svg width="24" height="24" class="shrink-0 cursor-pointer" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" @click="deleteItem(item)">
                                <path
                                    d="M12.0371 23.0122C18.1122 23.0122 23.0371 18.0873 23.0371 12.0122C23.0371 5.93708 18.1122 1.01221 12.0371 1.01221C5.96198 1.01221 1.03711 5.93708 1.03711 12.0122C1.03711 18.0873 5.96198 23.0122 12.0371 23.0122Z"
                                    fill="#CF1F25" />
                                <path
                                    d="M16.9775 7.74561H14.0249V7.49561C14.024 6.66754 13.3529 5.99649 12.5249 5.99561H11.5249C10.6968 5.99649 10.0258 6.66754 10.0249 7.49561V7.74561H7.07709C6.66287 7.74561 6.32709 8.0814 6.32709 8.49561C6.32709 8.90982 6.66287 9.24561 7.07709 9.24561H7.10829L7.93999 16.645C8.01469 17.4128 8.66123 17.9978 9.43269 17.9956H14.6227C15.3921 17.9985 16.038 17.4165 16.1149 16.6509L16.9466 9.24561H16.9777C17.3919 9.24561 17.7277 8.90982 17.7277 8.49561C17.7277 8.0814 17.3919 7.74561 16.9777 7.74561H16.9775ZM11.0249 7.49561C11.0249 7.21947 11.2487 6.99561 11.5249 6.99561H12.5249C12.801 6.99561 13.0249 7.21947 13.0249 7.49561V7.74561H11.0249V7.49561ZM15.1201 16.5456C15.095 16.8014 14.8796 16.9963 14.6225 16.9956H9.43249C9.17339 16.9956 8.95724 16.7976 8.93449 16.5395L8.11449 9.24561H15.94L15.1201 16.5456Z"
                                    fill="white" />
                                <path
                                    d="M12.0249 16.0151C12.301 16.0151 12.5249 15.7913 12.5249 15.5151V10.4951C12.5249 10.219 12.301 9.99512 12.0249 9.99512C11.7488 9.99512 11.5249 10.219 11.5249 10.4951V15.5151C11.5249 15.7913 11.7488 16.0151 12.0249 16.0151Z"
                                    fill="white" />
                                <path
                                    d="M10.2866 16.0034C10.3043 16.0032 10.3219 16.0021 10.3394 16C10.6139 15.971 10.8129 15.7252 10.7842 15.4507L10.26 10.4551C10.2476 10.3225 10.1822 10.2006 10.0787 10.1168C9.97519 10.033 9.84227 9.99452 9.71001 10.01C9.43556 10.039 9.23647 10.2848 9.26521 10.5593L9.79001 15.5557C9.81675 15.81 10.031 16.0031 10.2866 16.0034Z"
                                    fill="white" />
                                <path
                                    d="M13.7109 16C13.7284 16.0019 13.746 16.0029 13.7636 16.0029C14.0193 16.0026 14.2335 15.8094 14.2602 15.5551L14.7846 10.559C14.8051 10.2893 14.6073 10.0522 14.3383 10.024C14.0693 9.99568 13.8266 10.1864 13.7905 10.4545L13.2661 15.4506C13.2373 15.7251 13.4364 15.971 13.7109 16Z"
                                    fill="white" />
                            </svg>
                        </li>
                    </template>
                </ul>
                <ul v-else class="grow flex justify-center items-center">
                    <li>
                        <p class="text-txt-primary uppercase select-none">{{$t('cart_is_empty')}}</p>
                    </li>
                </ul>

                <div class="shrink-0">
                    <!-- Horizontal line -->
                    <div class="my-7 w-full border-t-2 border-white"></div>
                    <p>
                       {{$t('points_required_for_redeem', {
                           points: totalCartsPoints , 
                            currency_name:totalCartsPoints == 1 ? appSetup.currency_name :
                                appSetup.currency_name_plural 
                       })}} 
                        <span class="block ">
                           {{$t('shipping_included')}} 
                        </span>
                    </p>
                    <Button v-if="cartItems?.length" role="button" type="submit" :label="$t('checkout')"
                        :btnDisabled="!cartItems?.length" @click="goToCheckout"></Button>
                </div>
            </TransitionChild>
        </div>
        <!-- cart -->
    </TransitionRoot>
</template>


<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import useAppSetup from "../../composables/useAppSetup";
import useAppState from '../../composables/useAppState';
import { useRewards } from "../../composables/useRewards";
import { useRouter } from 'vue-router'
import Button from "../../components/buttons/Button.vue";
import { CartItem } from "../../middlewares/auth/models";
import { getRewardsLocalizedName } from '../../composables/utils';
import GAnalytics from '../../utils/GAnalytics';

const { appSetup } = useAppSetup()
const { toggleCart } = useAppState()
const { getMyCart, cartItems, removeCartItem, updateCartItemQty, totalCartsPoints } = useRewards()

const router = useRouter()

defineProps({
    show: {
        type: Boolean,
        required: true,
    }
})

defineExpose({
    getMyCartItems
})

// const emits = defineEmits(['dismiss-cart'])

const shippingRequired = computed(() => {
    return cartItems.value?.find(el => el.reward?.shipping_required) ? true : false;
});

async function getMyCartItems() {
    await getMyCart()
}

const deleteItem = async (item: CartItem) => {
    if (!cartItems.value) return;

    if (item.qty > 1) {
        await updateCartItemQty(item.id, item.qty - 1)
        return
    }
    await removeCartItem(item.id)
};

const goToCheckout = () => {
    GAnalytics.logCustomEvent('checkout_start', {})
    router.push({ name: "Checkout" })
    // emits('dismiss-cart')
    toggleCart(false)
}

</script>

