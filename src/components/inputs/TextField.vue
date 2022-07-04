<template>
    <div class="w-full">
        <div 
        class="relative bg-input-background"
        :class="[fieldHeight ? `h-[${fieldHeight}]`: 'h-12']"
          >
            <span class="absolute w-12 h-auto left-2 top-1/2 -translate-y-1/2">
                <slot name="prependIcon"></slot>
            </span>
            <input
                ref="inputElement"
                class="peer absolute block placeholder-transparent bg-transparent text-input-txt-primary h-full w-full outline-none pt-5 italic font-bold uppercase"
                :class="[$slots.prependIcon ? 'pl-16' : 'pl-4']"
                v-model="textValue"
                :type="type"
                :id="fieldId"
                :inputmode="
                    (type === 'tel' || type === 'phone') ? 'tel' :
                        (type === 'number' || type === 'integer') ? 'numeric' :
                            'text'
                "
                placeholder=" "
                :autocomplete="autoComplete"
                :required="isRequired"
                :readonly="readOnly"
            />
            <label
                :for="fieldId"
                class="absolute block text-input-txt-primary uppercase h-full text-sm italic font-bold left-4 top-1.5 transition-all duration-300 cursor-text peer-placeholder-shown:top-[12px] peer-placeholder-shown:text-xl"
                :class="[
                    $slots.prependIcon ? 'left-16' : 'left-4',
                    !readOnly ? 'peer-focus:top-1.5 peer-focus:text-sm' : null
                ]"
            >{{ fieldLabel }}</label>
        </div>
        <ErrorMsg :errorMsg="errorMsg" :showError="showError"></ErrorMsg>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, defineComponent } from "vue";
import ErrorMsg from "../Error/ErrorMsg.vue";

// defineComponent({
//   inheritAttrs: false,
// });

const props = defineProps({
    fieldLabel: {
        type: String,
        required: true,
    },
    fieldHeight: {
        type: String,
        default: "48px",
    },
    type: {
        type: String,
        default: "text",
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
    autoComplete: {
        type: String,
        required: false,
        default: 'on',
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
    }
});

const inputElement = ref<HTMLInputElement>()
const textValue = ref(props.defaultValue);
const showError = ref(false);

const emits = defineEmits(['changed'])


function validate() {
    if (props.isRequired && !textValue.value) {
        showError.value = true;
        return false;
    }
    showError.value = false;
    return true;
}

function setError() {
    showError.value = true
}

function clearField() {
    textValue.value = ''
    showError.value = false
    inputElement.value?.blur()
}

defineExpose({
    validate,
    setError,
    clearField
})


watch(textValue, () => {
    showError.value = false
    emits('changed', textValue.value, props.fieldId)
})

onMounted(() => {
})
</script>
