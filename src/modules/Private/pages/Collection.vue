<template>
    <section class="w-5/6 mx-auto py-6 h-full">
        <div class="mt-6 mb-4 text-txt-primary italic font-[800] uppercase text-2xl">{{$t("my_collection")}}</div>
        <div class="text-txt-primary uppercase font-bold italic">
            {{ $t("you_have_points", {
                    points: userCurrentPoints, currency_name: userCurrentPoints == 1 ?
                        appSetup.currency_name : appSetup.currency_name_plural
                })
            }}
        </div>
        <ul class="mt-9" v-if="transactions.total_pages > 0 && isPageLoaded">
            <li v-for="(transaction, index) in transactions.results" class="text-txt-primary relative mb-10 sm:mb-4"
                :ref="el => collectionRefs[index] = (el as HTMLLIElement)">
                <div class="relative" v-for="detail in transaction.transaction_details">
                    <div v-if="detail.tx_type === 'earn'" class="flex space-x-4 h-full">
                        <div class="w-10 flex justify-center">
                            <img
                                v-if="appPageSettings?.transactions?.code_entry_icon"
                                class="max-w-6 max-h-8 w-auto h-auto"
                                :src="appPageSettings?.transactions?.code_entry_icon"
                                alt="image"
                            />
                            <div></div>
                        </div>
                        <span class="w-full sm:flex">
                            <div class="w-32 text-txt-accent mr-10 shrink-0">
                                {{ $t("points_required", {
                                        points: detail.points, currency_name: detail.points == 1 ? appSetup.currency_name : appSetup.currency_name_plural
                                    })
                                }}
                            </div>
                            <div class="grow uppercase pr-2">{{$t('pin')}} #{{ detail.details.tab }}</div>
                            <div class="justify-end">
                                {{ $t("added_on")}}:
                                {{ dateToString(new Date(transaction.created_at)) }}
                            </div>
                        </span>
                    </div>
                    <div v-else-if="detail.tx_type === 'redeem'" class="flex space-x-4 h-full">
                        <div class="w-10 flex justify-center">
                            <img class="max-w-6 max-h-8 w-auto h-auto" :src="detail.details?.reward_image_url"
                                alt="image" />
                        </div>
                        <span class="w-full sm:flex">
                            <div class="w-32 text-txt-accent mr-10 shrink-0">
                                {{ $t("points_required", {
                                        points: Math.abs(detail.points), currency_name: Math.abs(detail.points) == 1 ? appSetup.currency_name : appSetup.currency_name_plural
                                    })
                                }}
                            </div>
                            <div class="grow uppercase pr-2">{{ detail.details.reward_desc }}</div>
                            <div class="justify-end">
                               {{$t("redeemed_on")}}:
                                <span class>{{ dateToString(new Date(transaction.created_at)) }}</span>
                            </div>
                        </span>
                    </div>

                    <div v-else></div>
                </div>
            </li>
        </ul>
        <ul v-else-if="transactions.total_pages == 0 && isPageLoaded" class="pt-4">
            <li class="text-txt-primary">You do not have any collection</li>
        </ul>
        <ul v-else class="pt-4">
            <li class="text-txt-primary italic">Loading...</li>
        </ul>
        <p v-if="isLoadingMore" class="text-txt-primary italic">Loading more...</p>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import useAppSetup from '../../../composables/useAppSetup';
import { useRewards } from '../../../composables/useRewards';
import { dateToString } from '../../../composables/utils';

const { appSetup, appPageSettings } = useAppSetup()
const { getTransactions, transactions, userCurrentPoints } = useRewards()

const collectionRefs = ref<HTMLLIElement[]>([])
const lastLiElement = computed(() => {
    return collectionRefs.value[collectionRefs.value.length - 1]
})
const isPageLoaded = ref(false)
const isLoadingMore = ref(false)

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(async entry => {
        if (entry.isIntersecting && transactions.value.current_page < transactions.value.total_pages) {
            isLoadingMore.value = true
            try {
                await getTransactions(transactions.value.current_page + 1)
            } catch (e) {
                console.log(e)
            }
            isLoadingMore.value = false
        }
    })
}, options);

watch(lastLiElement, (newValue) => {
    if (newValue) {
        observer.observe(newValue)
    }
})

const init = async () => {
    try {
        await getTransactions()
    } catch (e) {
        console.log(e)
    }
    isPageLoaded.value = true
};

onMounted(() => {
    collectionRefs.value = []
    init();
})

</script>