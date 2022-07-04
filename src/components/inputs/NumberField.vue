<template>
    <div class="p-5">
        <label
            for="textField"
            class="block text-sm font-bold text-blue-900 dark:text-gray-400"
        >{{ label }}</label>
        <div class="mt-1">
            <input
                v-model="textValue"
                type="number"
                id="textField"
                name="textField"
                class="px-4 py-2 w-full bg-gray-200 dark:bg-black text-gray-500 dark:text-gray-400 transition duration-300 rounded focus:border-gray-400 dark:focus:border-gray-400 focus:outline-none border-b-2"
                required
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, PropType, watch } from "vue";

const props = defineProps({
    fieldLabel: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: String,
        required: false,
        default: ''
    },
    onChangeCallback: {
        type: Function as PropType<(value: string) => void>,
        required: true,
    }
});

const label = props.fieldLabel;
const textValue = ref(props.defaultValue);

watch(textValue, () => {
    props.onChangeCallback(textValue.value.toString());
})

onMounted(() => {
})
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
}
</style>