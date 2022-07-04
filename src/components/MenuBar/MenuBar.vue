<template>
    <TransitionRoot :show="show" enter="transition transform ease-in duration-200" enter-from="opacity-0 "
        enter-to="opacity-100" leave="transition transform ease-in duration-100" leave-from="opactiy-100"
        leave-to="opacity-0" class>
        <Dialog class="fixed top-[4.5rem]" :open="show" v-on:close="$emit('dismiss-menubar')">
            <!-- Backdrop -->
            <DialogOverlay
                class="h-[var(--app-fill-height)] w-screen bg-primary-bg bg-opacity-60 filter backdrop-blur-sm"
                @click.prevent="$emit('dismiss-menubar')"></DialogOverlay>
            <!-- cart -->
            <div class="absolute left-0 top-0 h-[var(--app-fill-height)]">
                <TransitionChild
                    class="flex flex-col justify-between w-[336px] h-full bg-primary-bg text-nav-primary-inactive p-8"
                    enter="transition transform ease-out duration-100" enter-from=" -translate-x-12"
                    enter-to="translate-x-0" leave="transition transform ease-in duration-100"
                    leave-from="translate-x-0" leave-to="-translate-x-12">
                    <div class="flex flex-col">
                        <ul v-if="isLoggedIn" class="uppercase text-2xl font-bold children:my-4">
                            <li :class="{ 'text-nav-primary-active': $route.name === 'Homepage' }">
                                <router-link to="/homepage" class="mr-4" @click="toggleMenuBar(false); logEventGAnalytics('header_home')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    {{ $t("home") }}
                                </router-link>
                            </li>
                            <li :class="{ 'text-nav-primary-active': $route.name === 'Profile' }">
                                <router-link to="/profile" class="mr-4" @click="toggleMenuBar(false); logEventGAnalytics('header_myprofile')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ $t("my_profile") }}
                                </router-link>
                            </li>
                            <li :class="{ 'text-nav-primary-active': $route.name === 'Collection' }">
                                <router-link to="/collection" class="mr-4" @click="toggleMenuBar(false); logEventGAnalytics('header_myprofile')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ $t("my_collection") }}
                                </router-link>
                            </li>
                            <li>
                                <span class="mr-4 cursor-pointer h-6" @click="() => {switchLanguage()}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{selectedLanguage === 'fr' ? 'en' : 'fr'}}
                                </span>
                            </li>
                        </ul>

                        <ul v-else class="uppercase text-2xl font-bold children:my-4">
                            <li>
                                <span class="mr-4 cursor-pointer" @click="gotoStaticPage('header_home')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mb-1 h-6 w-6 inline" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    {{$t("home")}}
                                </span>
                            </li>
                            <li>
                                <span class="mr-4 cursor-pointer"  @click="gotoStaticPage('header_grand_prizes')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-1 -mr-2 h-7 w-7 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                        d="M10.6667 1.33333H9.33333V0H2.66667V1.33333H1.33333C0.6 1.33333 0 1.93333 0 2.66667V3.33333C0 5.03333 1.28 6.42 2.92667 6.62667C3.34667 7.62667 4.24667 8.38 5.33333 8.6V10.6667H2.66667V12H9.33333V10.6667H6.66667V8.6C7.75333 8.38 8.65333 7.62667 9.07333 6.62667C10.72 6.42 12 5.03333 12 3.33333V2.66667C12 1.93333 11.4 1.33333 10.6667 1.33333ZM1.33333 3.33333V2.66667H2.66667V5.21333C1.89333 4.93333 1.33333 4.2 1.33333 3.33333ZM10.6667 3.33333C10.6667 4.2 10.1067 4.93333 9.33333 5.21333V2.66667H10.6667V3.33333Z"
                                        clip-rule="evenodd" />
                                    </svg>
                                    {{$t("grand_prizes")}}
                                </span>
                            </li>
                            <li>
                                <span class="mr-4 cursor-pointer" @click="gotoStaticPage('header_redeem_prizes')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-5 inline mr-1 mt-0" viewBox="0 0 512 512" fill="currentColor">
                                    <path d="M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z"/>
                                    </svg>
                                {{$t("game_content")}} 
                                </span>
                            </li>
                            <li>
                                <span class="mr-4 cursor-pointer" @click="gotoStaticPage('header_how_to_play')">
                                    <svg class="-mr-1 mt-1 h-7 w-7 inline" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                        d="M15.3333 4H0.666626V12H15.3333V4ZM7.33329 8.66667H5.33329V10.6667H3.99996V8.66667H1.99996V7.33333H3.99996V5.33333H5.33329V7.33333H7.33329V8.66667ZM10.3333 10C9.77996 10 9.33329 9.55333 9.33329 9C9.33329 8.44667 9.77996 8 10.3333 8C10.8866 8 11.3333 8.44667 11.3333 9C11.3333 9.55333 10.8866 10 10.3333 10ZM13 8C12.4466 8 12 7.55333 12 7C12 6.44667 12.4466 6 13 6C13.5533 6 14 6.44667 14 7C14 7.55333 13.5533 8 13 8Z"
                                        fill-rule="evenodd" clip-rule="evenodd" />
                                    </svg>
                                    {{$t("how_to_play")}} 
                                </span>
                            </li>

                            <li>
                                <span class="mr-4 cursor-pointer"  @click="gotoStaticPage('header_faqs')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-1 -mr-2 h-7 w-7 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                        d="M7.00004 0.333252C3.32004 0.333252 0.333374 3.31992 0.333374 6.99992C0.333374 10.6799 3.32004 13.6666 7.00004 13.6666C10.68 13.6666 13.6667 10.6799 13.6667 6.99992C13.6667 3.31992 10.68 0.333252 7.00004 0.333252ZM7.66671 11.6666H6.33337V10.3333H7.66671V11.6666ZM9.04671 6.49992L8.44671 7.11325C7.96671 7.59992 7.66671 7.99992 7.66671 8.99992H6.33337V8.66659C6.33337 7.93325 6.63337 7.26659 7.11337 6.77992L7.94004 5.93992C8.18671 5.69992 8.33337 5.36659 8.33337 4.99992C8.33337 4.26659 7.73337 3.66659 7.00004 3.66659C6.26671 3.66659 5.66671 4.26659 5.66671 4.99992H4.33337C4.33337 3.52659 5.52671 2.33325 7.00004 2.33325C8.47337 2.33325 9.66671 3.52659 9.66671 4.99992C9.66671 5.58659 9.42671 6.11992 9.04671 6.49992Z"
                                        clip-rule="evenodd" />
                                    </svg>
                                    {{$t("faq")}}
                                </span>
                            </li>
                            <li>
                                <span class="mr-4 cursor-pointer h-6" @click="() => {switchLanguage()}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{selectedLanguage === 'fr' ? 'en' : 'fr'}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
        <!-- cart -->
    </TransitionRoot>
</template>


<script lang="ts" setup>

import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
import useAppSetup from "../../composables/useAppSetup";
import useAppState from "../../composables/useAppState";
import { useAuth } from "../../composables/useAuth";
import GAnalytics from "../../utils/GAnalytics";

const {getLocaleTransalations, selectedLanguage} = useAppSetup();
const {toggleMenuBar} = useAppState();
const { isLoggedIn } = useAuth();

defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

// const emits = defineEmits(['dismiss-menubar'])

// const dismissMenuBar = () => {
//     emits('dismiss-menubar')
// }
const logEventGAnalytics = (eventName: string) => {
    GAnalytics.logCustomEvent(eventName, {});
}

const gotoStaticPage = (sectionName:string) => {
    logEventGAnalytics(sectionName)
    let baseUrl: string;
    if(selectedLanguage.value === 'fr') {
      baseUrl = import.meta.env.VITE_STATIC_PAGE_URL_FR
      switch (sectionName) {
        case 'header_home':
          location.href = baseUrl + '/';
          break;
        case 'header_grand_prizes':
          location.href = baseUrl + '/#grand';
          break;
        case 'header_how_to_play':
          location.href = baseUrl + '/#rama';
          break;
        case 'header_redeem_prizes':
          location.href = baseUrl + '/#jouer';
          break; 
        case 'header_faqs':
          location.href = baseUrl + '/#faq';
          break;
      }
      return
    } 
    baseUrl = import.meta.env.VITE_STATIC_PAGE_URL
      switch (sectionName) {
        case 'header_home':
          location.href = baseUrl + '/';
          break;
        case 'header_grand_prizes':
          location.href = baseUrl + '/#grand';
          break;
        case 'header_how_to_play':
          location.href = baseUrl + '/#how';
          break;
        case 'header_redeem_prizes':
          location.href = baseUrl + '/#merch';
          break; 
        case 'header_faqs':
          location.href = baseUrl + '/#faq';
          break;
      }
}

const switchLanguage = () => {
    getLocaleTransalations(selectedLanguage.value === 'fr' ? 'en' : 'fr')
    toggleMenuBar(false)
    logEventGAnalytics('header_language')
}
</script>