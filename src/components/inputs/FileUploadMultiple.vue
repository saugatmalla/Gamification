<template>
    <div class="grid grid-cols-1 md:grid-cols-2 place-items-stretch gap-3">
        <div class="col-span-1">
            <label
                class="text-center block text-sm font-medium text-txt-primary dark:text-gray-400"
            >{{ fieldLabel }}</label>
            <div
                :ondrop="dropHandler"
                :ondragover="dragOverHandler"
                :ondragleave="dragLeaveHandler"
                class="mt-1 min-h-[200px] max-h-[200px] flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-800 border-dashed rounded-md"
                :class="[activeDropArea ? 'bg-gray-300 dark:bg-gray-900' : 'bg-transparent']"
            >
                <div class="space-y-1 text-center">
                    <svg
                        class="mx-auto h-12 w-12 text-txt-primary dark:text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <div class="flex text-sm text-txt-primary dark:text-gray-400">
                        <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md font-medium text-txt-primary hover:text-txt-accent dark:text-gray-400 dark:hover:text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                :accept="acceptFileType && acceptFileType !== '' ? acceptFileType : '*'"
                                @change="handleFileUpload"
                                multiple="true"
                                type="file"
                                class="sr-only"
                            />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-txt-primary dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
        <div class="col-span-1 min-w-full min-h-[200px] max-h-[200px]">
            <label
                class="block text-sm font-medium text-txt-primary dark:text-gray-400 text-center"
            >Preview</label>
            <div v-if="imagePreviewUrls.length > 0" class="grid grid-cols-3 gap-2">
                <div v-for="(imagePreviewUrl, index) in imagePreviewUrls" class="relative">
                    <img
                        v-if="imagePreviewUrl"
                        :src="imagePreviewUrl"
                        class="w-full h-full object-contain"
                    />
                    <div
                        v-if="imagePreviewUrl"
                        @click="removeFile(index)"
                        class="absolute top-2 right-2 text-red-700 hover:text-red-900 dark:text-gray-600 dark:hover:text-gray-400 hover:scale-110"
                    >
                        <TrashIcon class="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { TrashIcon } from '@heroicons/vue/outline';

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
    acceptFileType: {
        type: String,
        required: false,
    }
})


let hidden: HTMLElement;
const files = ref<File[]>([]);
const imagePreviewUrls = ref<string[]>([]);

if (props.defaultImageUrl && props.defaultImageUrl !== '') {
    imagePreviewUrls.value.push(props.defaultImageUrl);
}

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
}

watch(files.value, () => {
    imagePreviewUrls.value.splice(0, imagePreviewUrls.value.length);
    for (let x = 0; x < files.value.length; x++) {
        createPreview(files.value[x]);
    }
})

const createPreview = (file: File) => {
    imagePreviewUrls.value.push(URL.createObjectURL(file));
}

const dropHandler = (e: DragEvent) => {

    if (!e) {
        return;
    }
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

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

    emits('changed', files.value)
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

function removeFile(index: number) {
    imagePreviewUrls.value.splice(index, 1)
    files.value.splice(index, 1);
}
</script>