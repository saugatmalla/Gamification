<template>
    <section class="w-5/6 pb-8 m-auto mt-8">
        <div class="w-full text-txt-primary uppercase font-bold italic">
            <span class="hover:cursor-pointer" @click="router.go(-1)">
                <svg width="16" height="16" class="inline" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="white" />
                </svg>

                <span class="p-2"> {{ $t("cancel_and_continue_shppping") }} </span>

            </span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Section -->
            <div v-if="cartItems?.length" class="h-full mt-6">
                <!-- Checkout Items -->
                <div>
                    <ul v-if="cartItems">
                        <template v-for="(item, index) in cartItems" :key="index">
                            <li v-for="i in item.qty" :key="`${item.id}-${i}`"
                                class="mb-2 bg-primary flex w-full h-[88px] py-2 px-4">
                                <div class="w-[72px] h-[72px] shrink-0">
                                    <img :src="item.reward?.image_url" :alt="item.reward?.desc"
                                        class="mx-auto w-auto h-auto max-w-full max-h-full" />
                                </div>

                                <div
                                    class="ml-4 mr-2 grow flex flex-col text-txt-primary justify-center font-bold text-sm">
                                    <p>{{getRewardsLocalizedName(item.reward.locales) || item.reward.name }}</p>
                                    <p class="text-txt-accent uppercase italic font-[12px]">
                                        {{ $t("points_required", {
                                                points: item.reward?.points_required,
                                                currency_name: item.reward?.points_required == 1 ? appSetup.currency_name :
                                                    appSetup.currency_name_plural
                                            })
                                        }}
                                    </p>
                                </div>

                                <svg width="24" height="24" class="shrink-0 cursor-pointer" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg" @click="deleteItem(item)">
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
                </div>

                <!-- Horizontal line -->
                <div class="my-7 w-full border-t-2 border-white"></div>

                <!-- Checkout Details -->
                <div>
                    <p class="text-txt-primary">
                        {{$t("total")}}: {{$t("points_required", {
                            points: totalCartsPoints,
                            currency_name: totalCartsPoints == 1 ? appSetup.currency_name :
                                    appSetup.currency_name_plural
                            })
                        }}
                        <br />{{$t("shipping_included")}}
                    </p>
                </div>
            </div>
            <div v-else class="mt-6">
                <p class="text-txt-primary">
                    <i> {{$t("cart_is_empty")}} </i>
                </p>
            </div>

            <!-- Right Section -->
            <div class="grow lg:col-span-2" v-if="cartItems?.length">
                <div class="mt-6 mb-4 text-txt-primary italic font-[800] uppercase text-2xl">
                    {{$t("shipping_and_contact")}}
                </div>

                <form @submit.prevent="submit" novalidate>
                    <p class="mb-4 text-txt-primary"> {{$t("contact_details")}} </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2">
                        <div class="sm:col-span-2 sm:flex sm:space-x-4">
                            <TextField :fieldLabel="$t('first_name')" fieldId="first_name" :defaultValue="authUser.first_name"
                                :ref="(el: InputFields) => { inputComponents[0] = el }" errorMsg="Required"
                                @changed="handleContacts" :isRequired="true">
                            </TextField>
                            <TextField :fieldLabel="$t('last_name')" fieldId="last_name" :defaultValue="authUser.last_name"
                                :ref="(el: InputFields) => { inputComponents[1] = el }" errorMsg="Required"
                                @changed="handleContacts" :isRequired="true">
                            </TextField>
                        </div>
                        <TextField v-if="userEmail" fieldId="email" :fieldLabel="$t('email')" :defaultValue="userEmail"
                            :readOnly="true" class="sm:col-span-2"
                            :ref="(el: InputFields) => { inputComponents[2] = el }" errorMsg="Required"
                            @changed="handleContacts" :isRequired="true">
                        </TextField>
                        <TextField v-if="userPhone" :fieldLabel="$t('phone')" fieldId="phone" :defaultValue="userPhone"
                            class="sm:col-span-2" :ref="(el: InputFields) => { inputComponents[3] = el }"
                            errorMsg="Required" :readOnly="true" @changed="handleContacts" :isRequired="true">
                        </TextField>
                        <!-- <div class="sm:col-span-2 sm:flex sm:space-x-4">
                            <TextField v-else :fieldLabel="$t('email')" fieldId="email" class="sm:col-span-2"
                                :ref="(el: InputFields) => { inputComponents[2] = el }" errorMsg="Required" 
                                @changed="handleContacts" :isRequired="true"></TextField>
                            <TextField v-else :fieldLabel="$t('phone')" fieldId="phone" class="sm:col-span-2"
                                :ref="(el: InputFields) => { inputComponents[3] = el }" errorMsg="Required" :readOnly="true"
                                @changed="handleContacts" :isRequired="true"></TextField>
                        </div>  -->
                    </div>

                    <div v-if="shippingRequired">
                        <p class="my-4 text-txt-primary">
                            {{$t("address_details")}}
                            <br />{{$t("not_post_to_po_box")}}
                        </p>

                        <div class="grid grid-cols-1 sm:grid-cols-2">
                            <div class="sm:col-span-2 sm:flex sm:space-x-4">
                                <TextField v-if="userDefaultAddress?.address_line_1" :fieldLabel="'address_line_1'"
                                    :fieldId="'address_line_1'" :ref="(el: InputFields) => { inputComponents[4] = el }"
                                    errorMsg="Required" @changed="handleAddress" :isRequired="true"
                                    :defaultValue="userDefaultAddress?.address_line_1"></TextField>
                                <TextField v-else :fieldLabel="'address_line_1'" fieldId="address_line_1"
                                    :ref="(el: InputFields) => { inputComponents[4] = el }" errorMsg="Required"
                                    @changed="handleAddress" :isRequired="true"></TextField>
                                <TextField v-if="userDefaultAddress?.address_line_2" :fieldLabel="'address_line_2'"
                                    :isRequired="false" :ref="(el: InputFields) => { inputComponents[5] = el }"
                                    fieldId="address_line_2" :defaultValue="userDefaultAddress?.address_line_2">
                                </TextField>
                                <TextField v-else :fieldLabel="'address_line_2'" :isRequired="false"
                                    :ref="(el: InputFields) => { inputComponents[5] = el }"></TextField>
                            </div>
                            <TextField v-if="userDefaultAddress?.city" :fieldLabel="'city'" fieldId="city"
                                class="sm:col-span-2" :ref="(el: InputFields) => { inputComponents[6] = el }"
                                errorMsg="Required" @changed="handleAddress" :isRequired="true"
                                :defaultValue="userDefaultAddress?.city">
                            </TextField>
                            <TextField v-else :fieldLabel="'city'" fieldId="city" class="sm:col-span-2"
                                :ref="(el: InputFields) => { inputComponents[6] = el }" errorMsg="Required"
                                @changed="handleAddress" :isRequired="true"></TextField>
                            <div class="sm:col-span-2 sm:flex sm:space-x-4">
                                <TextField v-if="userDefaultAddress?.province" :fieldLabel="'province'" fieldId="province"
                                    :ref="(el: InputFields) => { inputComponents[7] = el }" errorMsg="Required"
                                    @changed="handleAddress" :isRequired="true"
                                    :defaultValue="userDefaultAddress?.province">
                                </TextField>
                                <TextField v-else :fieldLabel="'province'" fieldId="province"
                                    :ref="(el: InputFields) => { inputComponents[7] = el }" errorMsg="Required"
                                    @changed="handleAddress" :isRequired="true"
                                    :defaultValue="userDefaultAddress?.province">
                                </TextField>
                                <TextField v-if="userDefaultAddress?.postal_code" :fieldLabel="'postal_code'"
                                    fieldId="postal_code" :ref="(el: InputFields) => { inputComponents[8] = el }"
                                    errorMsg="Required" @changed="handleAddress" :isRequired="true"
                                    :defaultValue="userDefaultAddress?.postal_code">
                                </TextField>
                                <TextField v-else :fieldLabel="'postal_code'" fieldId="postal_code"
                                    :ref="(el: InputFields) => { inputComponents[8] = el }" errorMsg="Required"
                                    @changed="handleAddress" :isRequired="true"
                                    :defaultValue="userDefaultAddress?.postal_code">
                                </TextField>
                            </div>
                        </div>
                    </div>

                    <ErrorMsg :errorMsg="formErrorMsg" :showError="showFormError" class="mt-4"></ErrorMsg>

                    <Button role="button" type="submit" :label="$t('confirm')" :btnDisabled="isBtnLoading"></Button>
                </form>
            </div>
        </div>
    </section>
    <CheckoutMessage :isOpen="isDialogOpen" @dismissed="openDialog(false)"></CheckoutMessage>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUpdate, computed, ref } from "vue";
import { useRouter } from 'vue-router'
import TextField from "../../../components/inputs/TextField.vue";
import DatePicker from '../../../components/inputs/DatePicker.vue'
import SelectField from '../../../components/inputs/SelectField.vue';
import { useAuth } from "../../../composables/useAuth";
import { useRewards } from "../../../composables/useRewards";
import useAppSetup from "../../../composables/useAppSetup";
import { CartItem, UserProfileDetail } from '../../../middlewares/auth/models'
import Button from "../../../components/buttons/Button.vue";
import CheckoutMessage from "../../../components/Checkout/CheckoutMessage.vue";
import ErrorMsg from "../../../components/Error/ErrorMsg.vue";
import { getRewardsLocalizedName } from "../../../composables/utils";
import { useI18n } from "vue-i18n";
import GAnalytics from "../../../utils/GAnalytics";

const router = useRouter()

const { authUser, userEmail, userPhone, userDefaultAddress, userAddresses, getUserProfile, addUserAddress, updateUserProfile, updateUserAddress } = useAuth();
const { getMyCart, cartItems, removeCartItem, updateCartItemQty, totalCartsPoints, checkout } = useRewards();
const { appSetup } = useAppSetup();
const {t} = useI18n()

// const userEmail = computed(() => {
//     return authUser.contact_details?.find(el => el.contact_type === "email")?.contact_value || "";
// });

// const userPhone = computed(() => {
//     return authUser.contact_details?.find(el => el.contact_type === "phone")?.contact_value || "";
// });

const shippingRequired = computed(() => {
    return cartItems.value?.find(el => el.reward.shipping_required) ? true : false;
});

// const defaultUserAddress = computed(() => {
//     return userAddresses.find(el => el.is_default);
// });

const isBtnLoading = ref(false)
const isDialogOpen = ref(false)
const formErrorMsg = ref("")
const showFormError = ref(false)
const isUserContactEdited = ref(false)
const isUserAddressEdited = ref(false)
const userContact = ref<UserProfileDetail>({
    first_name: authUser.first_name,
    last_name: authUser.last_name || '',
    // email: "",
    // phone: "",
})

const userAddress = ref<{ [key: string]: string }>({
    address_line_1: '',
    address_line_2: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
})

type InputFields = InstanceType<typeof TextField> | InstanceType<typeof DatePicker> | InstanceType<typeof SelectField>

const inputComponents = ref<(InputFields)[]>([]);

const openDialog = (bool: boolean) => {
    isDialogOpen.value = bool;
}

const handleContacts = (val: string, id: 'first_name' | 'last_name' | 'email' | 'phone') => {
    userContact.value[id] = val;
    isUserContactEdited.value = true;
}

const handleAddress = (val: string, id: string) => {
    userAddress.value[id] = val;
    isUserAddressEdited.value = true;
}

const deleteItem = async (item: CartItem) => {
    if (!cartItems.value) return;

    if (item.qty > 1) {
        await updateCartItemQty(item.id, item.qty - 1)
        return
    }
    await removeCartItem(item.id)
};

const updateContact = async () => {
    let data : UserProfileDetail = {
        first_name: userContact.value.first_name,
        last_name: <string>userContact.value.last_name,
    }
    if(userContact.value.email) data.email = userContact.value.email
    if(userContact.value.phone) data.phone = userContact.value.phone
    try {
        await updateUserProfile(data)
    } catch (e) {
        throw new Error(t('profile_update_failed'))
    }
}

const updateAddress = async () => {
    const data = {
        ...userDefaultAddress.value,
        address_line_1: userAddress.value.address_line_1 || userDefaultAddress.value?.address_line_1 || '',
        address_line_2: userAddress.value.address_line_2 || userDefaultAddress.value?.address_line_2,
        city: userAddress.value.city || userDefaultAddress.value?.city || '',
        province: userAddress.value.province || userDefaultAddress.value?.province || '',
        postal_code: userAddress.value.postal_code || userDefaultAddress.value?.postal_code || '',
        country: userAddress.value.country || userDefaultAddress.value?.country || '',
        is_default: true,
        label: 'shipping',
    }

    try {
        await addUserAddress(data)
    } catch (e) {
        throw new Error(t('address_update_failed'))
    }
}

const submit = async () => {
    let valueArray: boolean[] = []
    inputComponents.value.forEach(component => {
        let value = component.validate()
        valueArray.push(value)
    })
    if (!valueArray.every(el => el)) {
        return
    }
    isBtnLoading.value = true
    try {
        if (isUserContactEdited.value) {
            await updateContact()
        }
        if (isUserAddressEdited.value) {
            await updateAddress()
        }
        await checkout({})
        window.scrollTo(0, 0)
        isDialogOpen.value = true

        GAnalytics.logCustomEvent('checkout_complete', {
            total_items_points: totalCartsPoints.value,
        })
    } catch (e) {
        showFormError.value = true
        // TODO: localized error message
        if (e instanceof Error) formErrorMsg.value = e.message
        else formErrorMsg.value = t('generic_server_error') 
    }
    isBtnLoading.value = false
}

onBeforeUpdate(() => {
    inputComponents.value = []
})

onBeforeMount(async () => {
    try {
        await getMyCart();
        // TODO: s̶h̶o̶w̶ a̶d̶d̶r̶e̶s̶s̶ o̶n̶l̶y̶ i̶f̶ c̶a̶r̶t̶ h̶a̶s̶ i̶t̶e̶m̶ w̶i̶t̶h̶ s̶h̶i̶p̶p̶i̶n̶g̶ s̶e̶t̶ t̶o̶ t̶r̶u̶e̶
        // reverse it
        // await getUserProfile({ contactDetails: true, addresses: true });
        await getUserProfile({ contactDetails: true, addresses: shippingRequired.value });
    } catch (e) {
        console.log(e)
    }
})

</script>