<template>
    <teleport to="body">
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
                v-show="showError"
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
                            class="inline-block align-bottom bg-transparent rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full dark:border-2 dark:border-gray-900 min-w-full"
                        >
                            <div class="relative">
                                <div
                                    @click="dismissErrorModal"
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
                                class="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg"
                            >
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-300 sm:mx-0 sm:h-10 sm:w-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 text-red-900"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left rounded-lg"
                                    >
                                        <h1
                                            class="text-xl leading-6 font-bold text-txt-primary dark:text-gray-400"
                                        >{{ errorTitle }}</h1>
                                        <div class="mt-2">
                                            <p
                                                class="text-md font-medium text-txt-primary dark:text-gray-400"
                                            >{{ errorMsg }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="bg-white dark:bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg"
                            >
                                <button
                                    type="button"
                                    class="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium bg-btn-primary dark:bg-gray-700 text-btn-text dark:text-gray-400 hover:bg-btn-hover dark:hover:bg-gray-900 hover:text-btn-hover-text dark:hover:text-gray-400 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    @click="dismissErrorModal"
                                >Confirm</button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";

import useErrorState from "../../composables/useErrorState";

const { errorTitle, errorMsg, showError, dismissErrorModal } = useErrorState();

onMounted(() => {

})
</script>