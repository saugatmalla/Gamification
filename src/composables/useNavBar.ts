import { readonly, ref, reactive } from 'vue';
const pageTitle = ref('App');
const showBackBtn = ref(false);

const backToPage = ref('');

export default function useNavBar() {
    const setPageTitle = (value: string) => {
        if (value !== '') {
            pageTitle.value = value;
        }
    }

    const setShowBackBtn = (value: boolean) => {
        showBackBtn.value = value;
    }

    const setBackToPage = (value: string) => {
        if (value !== '') {
            backToPage.value = value;
        }
    }

    return {
        setPageTitle,
        setShowBackBtn,
        pageTitle: readonly(pageTitle),
        showBackBtn: readonly(showBackBtn),
        backToPage: readonly(backToPage),
        setBackToPage,
    }
}
