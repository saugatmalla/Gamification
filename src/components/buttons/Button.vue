<template>
    <button
        @click="btnClicked"
        class="w-full mt-6 flex justify-center items-center bg-btn-primary rounded-[4px] h-[54px] text-btn-text text-lg font-bold uppercase hover:bg-btn-hover hover:text-btn-hover-text transition-colors duration-200 disabled:bg-btn-disabled disabled:text-btn-disabled-text disabled:cursor-not-allowed"
        :disabled="btnDisabled"
    >{{ label }}</button>
</template>
<script lang="ts" setup>
const emits = defineEmits(['pressed'])

const btnClicked = () => {
    emits('pressed');
}

defineProps({
    label: {
        type: String,
        required: true,
    },
    btnDisabled: {
        type: Boolean,
        default: false,
    }
})
</script>