<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    endDate: {
        type: String,
        required: true
    }
})

const { t } = useI18n();

type RemainingTime = { days: number; hours: number; minutes: number; seconds: number }

const programEnded = ref(false)
const remainingTime = ref<RemainingTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
})

const endDate = new Date(props.endDate)

const calculateRemainingDays = () => {
    if (!endDate) {
        // programEnded.value = true
        return
    }
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    if (diff < 0) {
        programEnded.value = true
        return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    remainingTime.value.days = days
    remainingTime.value.hours = hours
    remainingTime.value.minutes = minutes
    remainingTime.value.seconds = seconds

}

function init() {
    calculateRemainingDays()
    setInterval(() => {
        calculateRemainingDays()
    }, 1000 * 60)
}

onMounted(() => {
    init()
})
</script>

<template>
    <i18n-t v-if="!programEnded && props.endDate" keypath="campaign_timer_text" tag="p" class="text-sm">
        <template v-slot:days_count >
            <span v-if="remainingTime.days" class="ml-1 text-txt-accent font-bold italic text-[16px]">
                {{ remainingTime.days || 0 }}
            </span>
        </template>
        <template v-slot:days_text>
            <span v-if="remainingTime.days">
                {{$t('days_text', remainingTime.days )}}
            </span>
        </template>

        <template #hours_count>
            <span
                v-if="remainingTime.hours || remainingTime.days"
                class="ml-1 text-txt-accent font-bold italic text-[16px]"
            >
                {{ remainingTime.hours || 0 }}
            </span>
        </template>
        <template #hours_text>
            <span v-if="remainingTime.hours || remainingTime.days">
                {{$t('hours_text', remainingTime.hours  || 0)}}
            </span>
        </template>

        <template #minutes_count>
                <span
                v-if="remainingTime.minutes || remainingTime.hours || remainingTime.days"
                class="ml-1 text-txt-accent font-bold italic text-[16px]"
            >
            {{ remainingTime.minutes || 0 }}
            </span>
        </template>
        <template #minutes_text >
            <span v-if="remainingTime.minutes || remainingTime.hours || remainingTime.days">
                {{$t('minutes_text', remainingTime.minutes || 0)}}
            </span>
        </template>

        <template #seconds_count>
            <span
            v-if="!remainingTime.days && !remainingTime.hours && !remainingTime.minutes"
                class="ml-1 text-txt-accent font-bold italic text-[16px]">
                {{ remainingTime.seconds ? remainingTime.seconds : (remainingTime.minutes && remainingTime.seconds == 0) ? 0 : null }}
            </span>
        </template >
        <template #seconds_text>
            <span v-if="!remainingTime.days && !remainingTime.hours && !remainingTime.minutes">
                {{$t('seconds_text', remainingTime.seconds || 0)}}
            </span>
        </template>
    </i18n-t>
    <p v-else-if="programEnded">{{$t('campaign_ended')}}</p>
</template>