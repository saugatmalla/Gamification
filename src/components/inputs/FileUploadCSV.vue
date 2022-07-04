<template>
    <div>
        <div class="text-center text-sm font-bold text-primary dark:text-gray-400">
            <h1>{{ fieldLabel }}</h1>
        </div>
        <div class="max-w-sm mx-auto">
            <div
                class="flex justify-center px-6 pt-3 pb-6 border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-md h-20"
                :ondrop="dropHandler"
                :ondragover="dragOverHandler"
                :ondragleave="dragLeaveHandler"
                :class="[[activeDropArea ? 'bg-gray-300 dark:bg-gray-700' : 'bg-transparent']]"
            >
                <div class="w-full h-20 -mt-3" v-if="files.length > 0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-full w-full dark:text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <div class="space-y-1 text-center" v-if="files.length < 1 && !defaultImageUrl">
                    <div class="flex text-sm text-gray-600">
                        <label
                            for="file-upload"
                            class="relative cursor-pointer font-medium text-primary dark:text-gray-400 dark:hover:text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-gray-900"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                accept=".csv"
                                type="file"
                                class="sr-only"
                                multiple="false"
                                @change="handleFileUpload"
                            />
                        </label>
                        <p
                            class="pl-1"
                            :class="[activeDropArea ? 'text-primary dark:text-gray-400' : 'text-gray-600 dark:text-gray-400']"
                        >or drag and drop</p>
                    </div>
                </div>
            </div>

            <div class="text-center" v-if="files.length > 0 || defaultImageUrl">
                <button
                    @click="removeFile(0)"
                    class="w-full bg-primary rounded-md mt-1 dark:bg-gray-900 text-primary-text dark:text-gray-400"
                >Remove File</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
    fieldLabel: {
        type: String,
        required: true,
    },
    defaultImageUrl: {
        type: String,
        required: false,
    },
    fieldKey: {
        type: String,
        required: true,
    },
})


let hidden: HTMLElement;
const files = ref<File[]>([]);

const emits = defineEmits(['changed']);

onMounted(() => {
    let hiddenEl = document.getElementById("file-upload");

    if (hiddenEl) {
        hidden = hiddenEl;
    }
})

const handleFileUpload = async (event: any) => {
    let filesArray: FileList = event.target.files;


    for (let x = 0; x < filesArray.length; x++) {
        files.value.push(filesArray[x]);
    }

    emitChanged();
}

const dropHandler = (e: DragEvent) => {

    if (!e) {
        return;
    }
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    files.value.splice(0, files.value.length);
    if (e.dataTransfer && e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
                let file = e.dataTransfer.items[i].getAsFile();
                if (file) {
                    files.value.push(file);
                    // createPreview(file);
                }
            }
        }
    } else {
        if (e.dataTransfer && e.dataTransfer.files) {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                let file = e.dataTransfer.files[i];
                files.value.push(file);
                // createPreview(file);
            }
        }
    }

    emitChanged();
    toggleActiveDragArea(false);
}
const activeDropArea = ref(false);

const toggleActiveDragArea = (value: boolean) => {
    activeDropArea.value = value;
}

function dragLeaveHandler(e: any) {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    toggleActiveDragArea(false);
}

function dragOverHandler(e: any) {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    toggleActiveDragArea(true);
}

const emitChanged = () => {
    emits('changed', files.value);
}

function removeFile(index: number) {
    files.value.splice(index, 1);
    emitChanged();
}
</script>