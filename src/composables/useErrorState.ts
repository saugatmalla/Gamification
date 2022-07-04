import { readonly, ref, reactive } from 'vue';

const errorTitle = ref('Error');
const errorMsg = ref('Looks like something went wrong. Please try again later.');
const showError = ref(false);
export default function useErrorState() {
    const setErrorTitle = (value: string) => {
        errorTitle.value = value;
    }

    const setErrorMsg = (value?: string) => {
        errorMsg.value = value && value !== '' ? value : 'There was an error processing your request. Please try again later.';
    }

    const showErrorModal = () => {
        showError.value = true;
    }

    const dismissErrorModal = () => {
        showError.value = false;
        errorMsg.value = '';
    }

    const handleHttpError = (title: string, msg?: string, statusCode?: number) => {
        setErrorTitle(title)
        setErrorMsg(msg ? msg : 'We ran into an issue getting the apps. Please try again later');

        showErrorModal();
    }

    return {
        errorTitle: readonly(errorTitle),
        errorMsg: readonly(errorMsg),
        showError: readonly(showError),
        setErrorTitle,
        setErrorMsg,
        showErrorModal,
        dismissErrorModal,
        handleHttpError,
    }
}
