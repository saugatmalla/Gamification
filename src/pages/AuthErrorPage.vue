<template>
    <div class="bg-white dark:bg-black h-full min-h-screen">
        <div class="flex h-screen">
            <div class="m-auto text-center">
                <h1 class="text-primary dark:text-gray-400 font-bold text-4xl">Login Required</h1>
                <h1
                    class="text-primary dark:text-gray-400 font-bold text-lg italic"
                >Looks like your not logged in.</h1>
                <p
                    class="text-primary dark:text-gray-400 font-thin text-md"
                >Click the button to login</p>
                <button
                    @click="goToLogin"
                    class="w-44 h-12 rounded-md text-primary-text dark:text-gray-400 bg-primary hover:bg-primary-dark-50 dark:bg-gray-900 dark:hover:bg-gray-700"
                >Login Now</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const goToLogin = () => {
    window.location.replace(`${import.meta.env.VITE_LOGIN_URL}?redirect_to=${window.location.origin}`);
}

</script>