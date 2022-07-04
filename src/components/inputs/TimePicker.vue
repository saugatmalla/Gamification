<template>
    <div class="mx-auto w-full">
        <label class="font-bold text-blue-900 dark:text-gray-400 block text-center">{{ label }}</label>
        <div class="grid grid-cols-3 sm:grid-cols-3 gap-1">
            <select
                class="p-1 border-2 rounded-md border-primary bg-white text-primary hover:border-primary-dark-50 dark:border-gray-400 dark:bg-black dark:text-gray-400 focus:outline-none text-center appearance-none"
                v-model="selectedHour"
            >
                <option v-for="i in 12" :value="i">{{ i < 10 ? '0' + i : i }}</option>
            </select>

            <select
                class="p-1 border-2 rounded-md border-primary bg-white text-primary hover:border-primary-dark-50 dark:border-gray-400 dark:bg-black dark:text-gray-400 focus:outline-none text-center appearance-none"
                v-model="selectedMin"
            >
                <option v-for="(n, i) in 60" :value="i">{{ i < 10 ? '0' + i : i }}</option>
            </select>
            <select
                class="p-1 border-2 rounded-md border-primary bg-white text-primary hover:border-primary-dark-50 dark:border-gray-400 dark:bg-black dark:text-gray-400 focus:outline-none text-center appearance-none"
                v-model="ampm"
            >
                <option class="uppercase" value="am">AM</option>
                <option class="uppercase" value="pm">PM</option>
            </select>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, PropType, reactive, computed, watch } from "vue";

defineProps({
    label: {
        type: String,
        default: 'Time',
        required: false,
    }
})
const emits = defineEmits(['changed']);

const ampm = ref<'am' | 'pm'>('am');
const selectedHour = ref(12);
const selectedMin = ref(0);

watch(ampm, () => {
    emitTime()
})

watch(selectedHour, () => {
    emitTime()
})

watch(selectedMin, () => {
    emitTime()
})

const getTime = () => {
    let hour = selectedHour.value;

    if (ampm.value === 'pm') {
        if (hour <= 11) {
            hour = 12 + hour;
        } else {
            hour = 12;
        }
    } else {
        if (hour === 12) {
            hour = 0;
        }
    }

    return `${hour < 10 ? '0' + hour : hour}:${selectedMin.value < 10 ? '0' + selectedMin.value : selectedMin.value}:00`;
}
const emitTime = () => {
    console.log('emitting: ', getTime())
    emits('changed', getTime())
}

onMounted(() => {

})
</script>