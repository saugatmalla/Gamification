import { readonly, ref, computed } from 'vue'
import { Rewards, Transactions, CartItem } from '../middlewares/auth/models'
import { useAuth } from './useAuth'
import { HttpClient } from '../utils';
import useAppSetup from './useAppSetup';
import i18n from '../i18n';
import GAnalytics from "../utils/GAnalytics"

const { authToken, authUser } = useAuth();
const { appToken } = useAppSetup();
const { t } = i18n.global;

const httpClient = new HttpClient(import.meta.env.VITE_AUTH_API_URL).httpClient;

const initSelectedReward: Rewards = {
    id: 0,
    name: '',
    desc: '',
    sku: '',
    image_url: '',
    total_qty: 0,
    total_claimed: 0,
    points_required: 0,
    reward_type: '',
    retail_value: 0,
    shipping_required: false,
    shipping_cost: 0,
    sort_order: 0,
    is_available: true,
}

const initTransactions: Transactions = {
    total_results: 0,
    total_pages: 0,
    current_page: 0,
    per_page: 0,
    results: [{
        tx_key: '',
        points_earned: 0,
        points_redeemed: 0,
        created_at: new Date(),
        transaction_details:
            [{
                tx_type: 'earn',
                details: {
                    tab: '',
                    action: '',
                },
                points: 0,
                notes: '',
            }]
    }]
}

const availableRewards = ref<Rewards[]>()
const selectedReward = ref<Rewards>(initSelectedReward)
const transactions = ref<Transactions>(initTransactions)
const cartItems = ref<CartItem[]>()

type shippingAddress = {
    shipping_address: {
        address_line_1: string;
        address_line_2: string | null;
        city: string;
        postal_code: string;
        province: string;
        country: string;
    }

}

export function useRewards() {

    const setRewards = async () => {
        const result = await httpClient.get<{ payload: Rewards[] }>(`/v1/clients/loyalty/rewards`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(result.msg);
        }
        availableRewards.value = result.payload
    }

    const addItemToCart = async (rewardId: number) => {
        const result = await httpClient.post<{}>(`/v1/clients/loyalty/cart/items`, {
            reward_id: rewardId
        }, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.error) {
            throw new Error(result.msg);
        }

        GAnalytics.logCustomEvent('add_to_cart', {
            reward_id: rewardId.toString(),
        })
        await getMyCart()
        // throw new Error('shike');
    }

    const setSelectedReward = (reward: Rewards) => {
        selectedReward.value = reward
    }

    const claimReward = async (keyword: string) => {
        const result = await httpClient.post<{}>(`/v1/clients/keywords/claim`, {
            keyword
        }, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });
        if (result.statusCode === 400) {
            throw new Error(t("entered_pin_invalid"));
        } else if (result.error) {
            throw new Error(t("generic_server_error"));
        }
    }

    const getTransactions = async (page: number = 1, limit: number = 100) => {
        const result = await httpClient.get<Transactions>(`/v1/clients/loyalty/transactions?page=${page}&limit=${limit}`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(result.msg);
        }

        if (result.current_page === 1) {
            Object.assign(transactions.value, result)
        } else {
            let oldTransaction = transactions.value.results
            Object.assign(transactions.value, result)
            transactions.value.results = [...oldTransaction, ...result.results]
        }

    }

    const setCartItems = (data: CartItem[]) => {
        cartItems.value = data
    }


    const getMyCart = async () => {
        const result = await httpClient.get<{ payload: CartItem[] | [] }>(`/v1/clients/loyalty/cart`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(result.msg);
        }

        if (result.payload.length > 0) {
            setCartItems(result.payload)
        } else if (result.payload.length === 0) {
            setCartItems([])
        }
    }

    const removeCartItem = async (cartItemId: number) => {
        const result = await httpClient.delete<{}>(`/v1/clients/loyalty/cart/items/${cartItemId
            }`, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(result.msg);
        }

        if (!cartItems.value) return
        const index = cartItems.value.findIndex(el => el.id === cartItemId)

        if (index > -1) {
            let newCartItems = [...cartItems.value]
            newCartItems.splice(index, 1)
            setCartItems(newCartItems)
        }
        GAnalytics.logCustomEvent('remove_item', {
            reward_id: cartItemId.toString(),
        })
    }

    const updateCartItemQty = async (cartItemId: number, qty: number) => {
        const result = await httpClient.patch<{}>(`/v1/clients/loyalty/cart/items/${cartItemId}`, {
            qty
        }, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(result.msg);
        }
        if (!cartItems.value) return
        const index = cartItems.value.findIndex(el => el.id === cartItemId)
        let newCartItems: CartItem[] = [...cartItems.value]
        newCartItems[index].qty = qty
        setCartItems(newCartItems)
        GAnalytics.logCustomEvent('remove_from_cart', {
            reward_id: cartItemId.toString(),
        })
    }

    const totalNoOfCartItems = computed<number>(() => {
        if (!cartItems.value) return 0

        let sum = 0
        cartItems.value.forEach(item => {
            sum += item.qty
        })
        return sum
    })

    const totalCartsPoints = computed<number>(() => {
        if (!cartItems.value) return 0
        let sum = 0
        cartItems.value.forEach(item => {
            sum += item.qty * item.reward?.points_required
        })
        return sum
    })

    const userCurrentPoints = computed<number>(() => {
        if (!cartItems.value) return authUser.points
        let totalCartsPoints = 0
        cartItems.value.forEach(item => {
            totalCartsPoints += item.qty * item.reward?.points_required
        })
        return authUser.points - totalCartsPoints
    })

    const checkout = async (data: {} | shippingAddress) => {
        const result = await httpClient.post<{}>(`/v1/clients/loyalty/cart/checkout`, data, {
            headers: {
                'app-token': appToken.value,
                'auth-token': authToken.value,
            }
        });

        if (result.error) {
            throw new Error(t('checkout_failed'));
        }
        await getMyCart()
    }

    return {
        setRewards,
        setSelectedReward,
        selectedReward,
        availableRewards,
        addItemToCart,
        claimReward,
        transactions,
        getTransactions,
        getMyCart,
        setCartItems,
        cartItems,
        totalNoOfCartItems,
        totalCartsPoints,
        userCurrentPoints,
        removeCartItem,
        updateCartItemQty,
        checkout
    }
}