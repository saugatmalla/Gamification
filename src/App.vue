<template>
    <div class=" bg-primary-bg" :style="{ 'background-image': `url(${appBranding.background_image_url})` }">
        <Navbar />
        <div class="min-h-[var(--app-fill-height)]">
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useAppState from './composables/useAppState';
import useAppTheme from './themes';
import useAppSetup from './composables/useAppSetup'
import { useRewards } from './composables/useRewards';
import Navbar from './components/Navbar/Navbar.vue';
import { useAuth } from './composables/useAuth';

const { setTheme } = useAppTheme();
const { toggleLoading, initDarkMode } = useAppState();
toggleLoading(true);
const { getInitSetup, getAppPageSetup, setAppBranding, appBranding, getLocaleTransalations, getAvailableLocales, selectedLanguage } = useAppSetup();
const { getMyCart } = useRewards()
const { isLoggedIn } = useAuth()

const init = async () => {
    // set to dark theme if it's already been set
    initDarkMode();

    // set the default theme
    await getInitSetup()
    // await setAppSetup()
    await getAppPageSetup()
    await setAppBranding()
    await getAvailableLocales()
    await getLocaleTransalations(selectedLanguage.value)
    const { appBranding } = useAppSetup();
    setTheme({
        backgroundColor: appBranding.background_color,
        primary: appBranding.primary_color,
        secondary: appBranding.secondary_color,
        accent: appBranding.accent_color,
        btnPrimary: appBranding.btn_primary_color,
        btnSecondary: appBranding.btn_secondary_color,
        btnAccent: appBranding.btn_accent_color,
        btnDisabled: appBranding.btn_disabled_color,
        btnDisabledText: appBranding.btn_disabled_text_color,
        btnText: appBranding.btn_text_color,
        btnHover: appBranding.btn_hover_color,
        btnHoverText: appBranding.btn_hover_text_color,
        btnNegative: appBranding.btn_negative_color,
        btnNegativeText: appBranding.btn_negative_text_color,
        btnNegativeHover: appBranding.btn_negative_hover_color,
        btnNegativeHoverText: appBranding.btn_negative_hover_text_color,
        textPrimary: appBranding.text_primary_color,
        textSecondary: appBranding.text_secondary_color,
        textAccent: appBranding.text_accent_color,
        textError: appBranding.text_error_color,
        inputBackground: appBranding.input_bg_color,
        inputTextPrimary: appBranding.input_text_color,
        inputTextSecondary: appBranding.input_text_secondary_color,
        inputTextAccent: appBranding.input_text_accent_color,
        navPrimary: appBranding.nav_primary_color,
        navPrimaryActive: appBranding.nav_primary_active_color,
        navPrimaryInactive: appBranding.nav_primary_inactive_color,
        navSecondary: appBranding.nav_secondary_color,
        navSecondaryActive: appBranding.nav_secondary_active_color,
        navSecondaryInactive: appBranding.nav_secondary_inactive_color,
        navAccent: appBranding.nav_accent_color,
    });

    // get cart
    if (isLoggedIn.value) {
        await getMyCart()
    }

    // finish loading

    toggleLoading(false);
}

onMounted(() => {
    // set to loading
    toggleLoading(true);
    // init app
    init();
})

/**
 * start
 * 100vh bug on mobile viewport fix
 */
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

onMounted(() => {
    window.addEventListener('resize', appHeight)
    appHeight()
})

/**
 *  end
 */

</script>

<style>
:root {
    --app-height: 100%;
    --app-navbar-height: 4.5rem;
    --app-fill-height: calc(var(--app-height) - var(--app-navbar-height));
}
</style>