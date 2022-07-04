<template>
    <div class="w-10/12 mx-auto mb-10">
        <div class="flex flex-col space-y-1 shadow-sm">
            <input
                v-model="textValue"
                id="searchTerm"
                type="text"
                autofocus
                :placeholder="fieldPlaceHolder"
                class="px-4 py-2 w-full bg-gray-100 dark:bg-gray-900 text-primary dark:text-gray-400 transition duration-300 rounded focus:border-primary dark:focus:border-gray-400 focus:outline-none border-b-2 border-gray-200 dark:border-gray-700 placeholder:text-primary-light-50 dark:placeholder:text-gray-800"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
    fieldPlaceHolder: {
        type: String,
        required: false,
        default: 'search...',
    },
});

const textValue = ref('');

const emits = defineEmits(['changed'])

watch(textValue, () => {
    emits('changed', textValue.value)
})

onMounted(() => {
})
</script>