/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_API_URL: string;
    readonly VITE_DYNAMIC_BRANDING: string;
    readonly VITE_STATIC_PAGE_URL: string;
    readonly VITE_STATIC_PAGE_URL_FR: string;
    readonly VITE_GA_APIKEY: string;
    readonly VITE_GA_AUTHDOMAIN: string;
    readonly VITE_GA_PROJECTID: string;
    readonly VITE_GA_STORAGEBUCKET: string;
    readonly VITE_GA_MESSAGINGSENDERID: string;
    readonly VITE_GA_APPID: string;
    readonly VITE_GA_MEASUREMENTID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
