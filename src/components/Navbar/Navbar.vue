<template>
  <div>
    <nav
      class="text-nav-primary-inactive uppercase text-sm bg-nav-primary flex flex-row justify-between xl:justify-start items-center px-7 xl:px-10 h-[var(--app-navbar-height)]">
      <div v-if="!isMenuBarOpen" class="xl:grow-0 xl:hidden cursor-pointer" role="button"
        aria-label="open menu side bar" @click="openMenuBar(true)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <div v-else class="xl:grow-0 xl:hidden cursor-pointer" role="button" aria-label="open side bar"
        @click="openMenuBar(false)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-10 inline" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="xl:grow-0">
        <img class="h-14 cursor-pointer select-none" :src="appBranding.logo_url" alt="app logo" @click="goToHomepage" />
      </div>
      <div v-if="isLoggedIn" class="text-right xl:grow hidden xl:block uppercase text-sm font-bold">
        <router-link to="/homepage" class="mr-4 text-xl" @click="logEventGAnalytics('header_home')"
          :class="{ 'text-nav-primary-active': $route.name === 'Homepage' && !isCartOpen }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline -mt-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
         {{$t("home")}} 
        </router-link>
        <router-link to="/profile" class="mr-4 text-xl" @click="logEventGAnalytics('header_myprofile')"
          :class="{ 'text-nav-primary-active': $route.name === 'Profile' && !isCartOpen }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline -mt-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          {{$t("my_profile")}} 
        </router-link>

        <router-link to="/collection" class="mr-4 text-xl" @click="logEventGAnalytics('header_mycollection')"
          :class="{ 'text-nav-primary-active': $route.name === 'Collection' && !isCartOpen }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM14.23 16L10 13.45L5.77 16L6.89 11.19L3.16 7.96L8.08 7.54L10 3L11.92 7.53L16.84 7.95L13.11 11.18L14.23 16Z"
              clip-rule="evenodd" />
          </svg>
          {{$t("my_collection")}} 
        </router-link>

        <span class="mr-4 text-xl cursor-pointer h-6" @click="switchLanguage">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
              clip-rule="evenodd" />
          </svg>
          {{selectedLanguage === 'fr' ? 'en' : 'fr'}}
        </span>

        <span class="relative mr-4 text-xl cursor-pointer" :class="{ 'text-nav-primary-active': isCartOpen }"
          @click="openCart(true)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
         {{$t("my_cart")}} 
          <span class="absolute left-3 w-4 h-4 text-xs text-txt-primary text-center rounded-full bg-red-600">
            {{$t("number", {number: totalNoOfCartItems })}}
          </span>
        </span>
      </div>
      <div v-else class="text-right xl:grow hidden xl:block uppercase text-sm font-bold">
        <span class="mr-4 cursor-pointer" @click="gotoStaticPage('header_home')">
          <svg xmlns="http://www.w3.org/2000/svg" class="mb-1 h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {{$t("home")}}
        </span>
        
        <span class="mr-4 cursor-pointer"  @click="gotoStaticPage('header_grand_prizes')">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-1 -mr-2 h-5 w-5 inline" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10.6667 1.33333H9.33333V0H2.66667V1.33333H1.33333C0.6 1.33333 0 1.93333 0 2.66667V3.33333C0 5.03333 1.28 6.42 2.92667 6.62667C3.34667 7.62667 4.24667 8.38 5.33333 8.6V10.6667H2.66667V12H9.33333V10.6667H6.66667V8.6C7.75333 8.38 8.65333 7.62667 9.07333 6.62667C10.72 6.42 12 5.03333 12 3.33333V2.66667C12 1.93333 11.4 1.33333 10.6667 1.33333ZM1.33333 3.33333V2.66667H2.66667V5.21333C1.89333 4.93333 1.33333 4.2 1.33333 3.33333ZM10.6667 3.33333C10.6667 4.2 10.1067 4.93333 9.33333 5.21333V2.66667H10.6667V3.33333Z"
              clip-rule="evenodd" />
          </svg>
          {{$t("grand_prizes")}}
        </span>

        <span class="mr-4 cursor-pointer" @click="gotoStaticPage('header_redeem_prizes')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-3 inline mr-1 mt-0" viewBox="0 0 512 512" fill="currentColor">
              <path d="M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z"/>
            </svg>
         {{$t("game_content")}} 
        </span>

        <span class="mr-4 cursor-pointer" @click="gotoStaticPage('header_how_to_play')">
          <svg class="-mr-1 mt-1 h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M15.3333 4H0.666626V12H15.3333V4ZM7.33329 8.66667H5.33329V10.6667H3.99996V8.66667H1.99996V7.33333H3.99996V5.33333H5.33329V7.33333H7.33329V8.66667ZM10.3333 10C9.77996 10 9.33329 9.55333 9.33329 9C9.33329 8.44667 9.77996 8 10.3333 8C10.8866 8 11.3333 8.44667 11.3333 9C11.3333 9.55333 10.8866 10 10.3333 10ZM13 8C12.4466 8 12 7.55333 12 7C12 6.44667 12.4466 6 13 6C13.5533 6 14 6.44667 14 7C14 7.55333 13.5533 8 13 8Z"
              fill-rule="evenodd" clip-rule="evenodd" />
          </svg>
         {{$t("how_to_play")}} 
        </span>

        <span class="mr-4 cursor-pointer"  @click="gotoStaticPage('header_faqs')">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-1 -mr-2 h-5 w-5 inline" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M7.00004 0.333252C3.32004 0.333252 0.333374 3.31992 0.333374 6.99992C0.333374 10.6799 3.32004 13.6666 7.00004 13.6666C10.68 13.6666 13.6667 10.6799 13.6667 6.99992C13.6667 3.31992 10.68 0.333252 7.00004 0.333252ZM7.66671 11.6666H6.33337V10.3333H7.66671V11.6666ZM9.04671 6.49992L8.44671 7.11325C7.96671 7.59992 7.66671 7.99992 7.66671 8.99992H6.33337V8.66659C6.33337 7.93325 6.63337 7.26659 7.11337 6.77992L7.94004 5.93992C8.18671 5.69992 8.33337 5.36659 8.33337 4.99992C8.33337 4.26659 7.73337 3.66659 7.00004 3.66659C6.26671 3.66659 5.66671 4.26659 5.66671 4.99992H4.33337C4.33337 3.52659 5.52671 2.33325 7.00004 2.33325C8.47337 2.33325 9.66671 3.52659 9.66671 4.99992C9.66671 5.58659 9.42671 6.11992 9.04671 6.49992Z"
              clip-rule="evenodd" />
          </svg>
          {{$t("faq")}}
        </span>

        <span class="mr-4 cursor-pointer h-6" @click="switchLanguage">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
              clip-rule="evenodd" />
          </svg>
          {{selectedLanguage === 'fr' ? 'en' : 'fr'}}
        </span>
      </div>

      <span v-if="isLoggedIn" class="relative cursor-pointer xl:hidden" @click="openCart(true)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-10 inline" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        <span class="absolute right-0 w-4 h-4 text-xs text-txt-primary text-center rounded-full bg-red-600">
          {{$t("number", {number: totalNoOfCartItems })}}
        </span>
      </span>
      <span v-else class="cursor-pointer xl:hidden" @click="switchLanguage">
        <span class="text-nav-primary-inactive text-xl font-[800]">{{selectedLanguage === 'fr' ? 'en' : 'fr'}}</span>
      </span>
    </nav>
    <MenuBar :show="isMenuBarOpen" @dismiss-menubar="openMenuBar(false)" />
    <Cart ref="cartElementRef" :show="isCartOpen"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import useAppSetup from "../../composables/useAppSetup";
import useAppState from "../../composables/useAppState";
import { useRewards } from "../../composables/useRewards";
import Cart from "../Cart/Cart.vue";
import MenuBar from "../MenuBar/MenuBar.vue";
import GAnalytics from "../../utils/GAnalytics";

const router = useRouter();
const { isLoggedIn } = useAuth();
const {isCartOpen, isMenuBarOpen, toggleCart, toggleMenuBar } = useAppState();
const { appBranding, selectedLanguage, getLocaleTransalations } = useAppSetup();
const { getMyCart, totalNoOfCartItems } = useRewards();

// const isCartOpen = ref(false);
// const isMenuBarOpen = ref(false);

const cartElementRef = ref<InstanceType<typeof Cart>>()

const openCart = async (bool: boolean) => {
  toggleCart(bool)
  if(bool) logEventGAnalytics('header_mycart')
}

const openMenuBar = (bool: boolean) => {
  toggleMenuBar(bool)
  toggleCart(false)
}

const logEventGAnalytics = (eventName: string) => {
  GAnalytics.logCustomEvent(eventName, {});
}

const goToHomepage = () => {
  toggleCart(false)
  router.push({ name: "Homepage" })
  logEventGAnalytics('header_home')
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
  logEventGAnalytics('header_language')
}

watch(isLoggedIn, () => {
  if (isLoggedIn.value) {
    getMyCart()
  }
})


</script>

<style>
</style>