import { ref, watch, readonly } from 'vue';
import i18n from '../i18n';

const isLoading = ref(false);
const loadingMsg = ref('Loading...')
const isDarkMode = ref(false);
const isCartOpen = ref(false);
const isMenuBarOpen = ref(false);


export default function useAppState() {
    function toggleLoading(value: boolean) {
        isLoading.value = value;
        if (!value) {
            setLoadingMsg('Loading...');
        }
    }

    function initDarkMode() {
        const darkModeSet = window.localStorage.getItem('darkmode');

        if (darkModeSet && darkModeSet.toLocaleLowerCase().trim() === 'true') {
            isDarkMode.value = true;
            return;
        }

        // if dark mode hasn't already been set/toggled, then enable it
        if (!darkModeSet) {
            isDarkMode.value = true;
        }
    }

    function setLoadingMsg(value: string) {
        loadingMsg.value = value;
    }

    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value;
    }

    function toggleMenuBar(value: boolean) {
        isMenuBarOpen.value = value
    }

    function toggleCart(value: boolean) {
        isCartOpen.value = value
    }

    watch(isDarkMode, () => {
        const html = document.querySelector('html');

        if (html) {
            if (isDarkMode.value) {
                window.localStorage.setItem('darkmode', 'true');
                html.classList.add('dark')
            } else {
                window.localStorage.setItem('darkmode', 'false');
                html.classList.remove('dark')
            }
        }
    })

    watch(isCartOpen, () => {
        if (isCartOpen.value) {
            window.scrollTo(0, 0)
            document.body.classList.toggle("overflow-hidden", true)
        } else {
            document.body.classList.toggle("overflow-hidden", false)
        }
    })

    watch(isMenuBarOpen, () => {
        if (isMenuBarOpen.value) {
            window.scrollTo(0, 0)
            document.body.classList.toggle("overflow-hidden", true)
        } else {
            document.body.classList.toggle("overflow-hidden", false)
        }
    })

    return {
        isLoading: readonly(isLoading),
        toggleLoading,
        loadingMsg: readonly(loadingMsg),
        setLoadingMsg,
        toggleDarkMode,
        isDarkMode: readonly(isDarkMode),
        initDarkMode,
        isCartOpen: readonly(isCartOpen),
        toggleCart,
        isMenuBarOpen: readonly(isMenuBarOpen),
        toggleMenuBar
    }
}