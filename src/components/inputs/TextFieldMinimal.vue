<template>
    <div class="relative">
        <input
            v-model="textValue"
            type="text"
            :id="fieldId"
            :placeholder="fieldPlaceHolder"
            class="peer px-4 bg-transparent py-2 w-full text-txt-primary dark:text-gray-400 transition duration-300 rounded focus:border-primary focus:outline-none border-b-2 border-accent dark:border-gray-800 dark:focus:border-gray-400"
            :class="[fieldPlaceHolder === '' ? 'placeholder-transparent' : 'placeholder-txt-placeholder dark:placeholder-gray-800']"
            :required="isRequired"
        />
        <label
            :for="fieldId"
            class="peer-placeholder-shown:p-0 uppercase absolute left-2 -top-4 text-txt-primary dark:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 transition-all text-sm"
            :class="[fieldPlaceHolder === '' ? 'peer-placeholder-shown:text-tx-placeholder dark:peer-placeholder-shown:text-gray-800 ' : 'peer-placeholder-shown:text-transparent']"
        >{{ fieldLabel }}</label>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const fieldId = `text_${Math.random()}`;

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
    fieldPlaceHolder: {
        type: String,
        required: false,
        default: '',
    },
    isRequired: {
        type: Boolean,
        required: false,
        default: true,
    }
});

const textValue = ref(props.defaultValue);

const emits = defineEmits({
    changed(value: string) { }
})

watch(textValue, () => {
    emits('changed', textValue.value)
})

onMounted(() => {
})
</script>