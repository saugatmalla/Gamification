<template>
    <div class="relative">
        <!-- <label
            for="textarea"
            class="block text-sm font-bold text-primary dark:text-gray-400"
        >{{ fieldLabel }}</label>
        <div class="mt-1">
            <textarea
                :placeholder="fieldPlaceHolder"
                v-model="textValue"
                type="textarea"
                id="textarea"
                name="textarea"
                class="w-full px-3 py-2 bg-white dark:bg-black text-black dark:text-gray-400 transition duration-300 rounded focus:border-accent dark:focus:border-gray-400 focus:outline-none border-b-2"
                rows="2"
                required
            />
        </div>-->
        <textarea
            :placeholder="fieldPlaceHolder"
            v-model="textValue"
            type="textarea"
            :id="fieldId"
            name="textarea"
            class="peer w-full px-3 py-2 bg-white dark:bg-black text-black dark:text-gray-400 transition duration-300 rounded focus:border-accent dark:focus:border-gray-400 focus:outline-none border-b-2"
            rows="2"
            required
        />
        <label
            :for="fieldId"
            class="peer-placeholder-shown:p-0 uppercase absolute left-2 -top-6 text-primary dark:text-gray-400 peer-placeholder-shown:text-transparent peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 transition-all"
        >{{ fieldLabel }}</label>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const fieldId = `text_area_${Math.random()}`;

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
    fieldKey: {
        type: String,
        required: true,
    },
    fieldPlaceHolder: {
        type: String,
        required: false,
        default: '',
    },
});

const emits = defineEmits(['changed']);

const textValue = ref(props.defaultValue);

watch(textValue, () => {
    emits('changed', { [props.fieldKey]: textValue.value })
})

onMounted(() => {
})

</script>