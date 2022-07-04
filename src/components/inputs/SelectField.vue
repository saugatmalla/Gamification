<template>
    <div class="w-full">
        <div class="relative h-12">
            <select
                :name="fieldId"
                :id="fieldId"
                class="peer absolute w-full h-full pt-5 pl-3 bg-input-background text-input-txt-primary italic font-bold uppercase outline-none appearance-none cursor-pointer"
                v-model="selectValue"
                :readonly="readOnly"
                ref="selectElement"
                @focus="test"
            >
                <option disabled>{{$t(optionLabel)}}</option>
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >{{ $t(option.text) }}</option>
            </select>
            <label
                :for="fieldId"
                class="absolute px-4 text-input-txt-primary uppercase h-full text-sm top-1.5 italic font-bold transition-all duration-300 pointer-events-none"
                :class="{ 'top-[12px] text-xl': selectValue === '' }"
                @click="selectElement.focus()"
            >{{ fieldLabel }}</label>
        </div>
        <ErrorMsg :show-error="showError" :error-msg="errorMsg"></ErrorMsg>
    </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from 'vue';
import ErrorMsg from '../Error/ErrorMsg.vue';

const props = defineProps({
    fieldLabel: {
        type: String,
        required: true,
    },
    optionLabel: {
        type: String,
        required: true,
        default: 'Select Option'
    },
    defaultValue: {
        type: String,
        required: false,
        default: ''
    },
    isRequired: {
        type: Boolean,
        required: false,
        default: true,
    },
    errorMsg: {
        type: String,
        required: false,
        default: '',
    },
    fieldId: {
        type: String,
        required: false,
        default: `text_${Math.random()}`
    },
    readOnly: {
        type: Boolean,
        required: false,
        default: false,
    },
    options: {
        type: Array as PropType<Array<{ value: string, text: string }>>,
        required: false
    }
})

const emits = defineEmits(['changed'])

const selectValue = ref(props.defaultValue)
const showError = ref(false)

const selectElement = ref()

function test() {
    selectElement.value.click()
}

defineExpose({
    validate
})

function validate() {
    if (props.isRequired && !selectValue.value) {
        showError.value = true;
        return false;
    }
    showError.value = false;
    return true;
}

watch(selectValue, () => {
    showError.value = false
    emits('changed', selectValue.value, props.fieldId)
})


</script>