<template>
    <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            class="fixed z-50 inset-0 overflow-x-hidden overflow-y-hidden mt-16 md:mt-0"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            v-show="isOpen"
        >
            <div
                class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <div
                    class="fixed inset-0 bg-black bg-opacity-90 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >&#8203;</span>
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                    >
                        <div class="relative">
                            <div
                                @click="dismissModal"
                                class="absolute top-2 right-2 text-red-700 hover:text-red-900 dark:text-gray-600 dark:hover:text-gray-400 hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-white text-primary rounded-lg overflow-y-auto dark:text-gray-400 dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full"
                        >
                            <div class="mt-3 text-left w-full">
                                <h3
                                    class="text-lg text-center font-bold text-primary dark:text-gray-400"
                                    id="modal-title"
                                >{{ modalTitle }}</h3>
                                <div
                                    class="pt-2 overflow-auto max-h-[400px] md:max-h-[700px] md:overflow-auto"
                                >
                                    <div class="border-t-2 dark:border-gray-400 border-primary">
                                        <slot name="modal-body" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>
<script lang="ts" setup>
import { onMounted, toRefs } from "vue";

const props = defineProps({
    modalTitle: {
        type: String,
        required: false,
        default: 'Title'
    },
    isOpen: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const emits = defineEmits(['dismissed'])

// if the user presses the escape key, dismiss modal
document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key === 'Escape' && ev.isTrusted) {
        dismissModal();
    }
})

const dismissModal = () => {
    emits('dismissed');
}

const { isOpen } = toRefs(props)


onMounted(() => {

})
</script>