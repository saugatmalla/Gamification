<template>
    <p
        class="text-txt-error transition-all duration-500 linear"
        :class="[props.showError ? 'visible' : 'invisible',
        shakeAnimation ? 'animate-shake-error' : '']"
    >{{ props.errorMsg }}</p>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    errorMsg: {
        type: String,
        required: true,
        default: '',
    },
    showError: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const shakeAnimation = ref(false)

watchEffect(() => {
    if (props.showError) {
        shakeAnimation.value = true
        setTimeout(() => {
            shakeAnimation.value = false
        }, 500)
    }
})

</script>