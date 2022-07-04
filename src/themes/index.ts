import { readonly, reactive, watch } from 'vue';
export interface ThemeDataAttrs {
    backgroundColor: string;
    primary: string;
    secondary: string;
    accent: string;
    btnPrimary: string;
    btnSecondary: string;
    btnAccent: string;
    btnDisabled: string;
    btnDisabledText: string;
    btnText: string;
    btnHover: string;
    btnHoverText: string;
    btnNegative: string;
    btnNegativeText: string;
    btnNegativeHover: string;
    btnNegativeHoverText: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    textError: string;
    inputBackground: string;
    inputTextPrimary: string;
    inputTextSecondary: string;
    inputTextAccent: string;
    navPrimary: string;
    navPrimaryActive: string;
    navPrimaryInactive: string;
    navSecondary: string;
    navSecondaryActive: string;
    navSecondaryInactive: string;
    navAccent: string;
}

function hexToRgb(hex: string, alpha?: number): string {
    if (alpha) {
        if (alpha < 0 || alpha > 1) {
            alpha = 1;
        }
    }

    let rgbValues = parseRgbValuesFromHex(hex);

    if (alpha) {
        return 'rgba(' + [rgbValues[0], rgbValues[1], rgbValues[2], alpha].join(',') + ')';
    } else {
        return 'rgb(' + [rgbValues[0], rgbValues[1], rgbValues[2]].join(',') + ')';
    }
}

function parseRgbValuesFromHex(hex: string): [number, number, number] {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        let hexSplit: string[] = hex.substring(1).split('');

        if (hexSplit.length == 3) {
            hexSplit = [hexSplit[0], hexSplit[0], hexSplit[1], hexSplit[1], hexSplit[2], hexSplit[2]];
        }

        let value = '0x' + hexSplit.join('');
        return [(parseInt(value) >> 16) & 255, (parseInt(value) >> 8) & 255, parseInt(value) & 255];
    }

    return [255, 255, 255];
}

// a negative percentage will make it darker
function getRgbShade(rbgValue: string, percentage: number): string {
    let i = parseInt;

    let r = Math.round;

    let [a, b, c, d] = rbgValue.split(",");

    let isNegative = percentage < 0;

    let t = isNegative ? 0 : percentage * 255 ** 2

    let changePercentage = isNegative ? 1 + percentage : 1 - percentage;

    return "rgb" + (d ? "a(" : "(") + r((changePercentage * i(a[3] == "a" ? a.slice(5) : a.slice(4)) ** 2 + t) ** 0.5) + "," + r((changePercentage * i(b) ** 2 + t) ** 0.5) + "," + r((changePercentage * i(c) ** 2 + t) ** 0.5) + (d ? "," + d : ")");
}

function getAttributeColorShades(color: 'primary' | 'secondary' | 'accent' | 'text-primary', mode: 'light' | 'dark', defaultTheme: ThemeDataAttrs, value?: string): { [key: string]: string | null } {
    return {
        [`--color-${color}-${mode}-10`]: value ? getRgbShade(hexToRgb(value), mode === 'dark' ? -0.1 : 0.1) : getRgbShade(defaultTheme.primary, 'dark' ? -0.1 : 0.1),
        [`--color-${color}-${mode}-20`]: value ? getRgbShade(hexToRgb(value), mode === 'dark' ? - 0.2 : 0.2) : getRgbShade(defaultTheme.primary, mode === 'dark' ? - 0.2 : 0.2),
        [`--color-${color}-${mode}-30`]: value ? getRgbShade(hexToRgb(value), mode === 'dark' ? - 0.3 : 0.3) : getRgbShade(defaultTheme.primary, mode === 'dark' ? - 0.3 : 0.3),
        [`--color-${color}-${mode}-40`]: value ? getRgbShade(hexToRgb(value), mode === 'dark' ? - 0.4 : 0.4) : getRgbShade(defaultTheme.primary, mode === 'dark' ? - 0.4 : 0.4),
        [`--color-${color}-${mode}-50`]: value ? getRgbShade(hexToRgb(value), mode === 'dark' ? - 0.5 : 0.5) : getRgbShade(defaultTheme.primary, mode === 'dark' ? - 0.5 : 0.5),
    }
}

function getRgbVal(variable: string) {
    const color = hexToRgb(variable);
    const [r, g, b] = color.substring(4, color.length - 1).split(',');
    return `${r}, ${g}, ${b}`;
}


export default function useAppTheme() {
    const mapTheme = (variables: Partial<ThemeDataAttrs>): { [key: string]: string | null } => {
        return {
            '--color-bg-primary': variables.backgroundColor ?
                getRgbVal(variables.backgroundColor) :
                getRgbVal(defaultTheme.backgroundColor),
            '--color-primary': variables.primary ?
                getRgbVal(variables.primary) :
                getRgbVal(defaultTheme.primary),
            '--color-secondary': variables.secondary ?
                getRgbVal(variables.secondary) :
                getRgbVal(defaultTheme.secondary),
            '--color-accent': variables.accent ?
                getRgbVal(variables.accent) :
                getRgbVal(defaultTheme.accent),
            '--color-btn-primary': variables.btnPrimary ?
                getRgbVal(variables.btnPrimary) :
                getRgbVal(defaultTheme.btnPrimary),
            '--color-btn-secondary': variables.btnSecondary ?
                getRgbVal(variables.btnSecondary) :
                getRgbVal(defaultTheme.secondary),
            '--color-btn-accent': variables.btnAccent ?
                getRgbVal(variables.btnAccent) :
                getRgbVal(defaultTheme.btnAccent),
            '--color-btn-disabled': variables.btnDisabled ?
                getRgbVal(variables.btnDisabled) :
                getRgbVal(defaultTheme.btnDisabled),
            '--color-btn-disabled-text': variables.btnDisabledText ?
                getRgbVal(variables.btnDisabledText) :
                getRgbVal(defaultTheme.btnDisabledText),
            '--color-btn-text': variables.btnText ?
                getRgbVal(variables.btnText) :
                getRgbVal(defaultTheme.btnText),
            '--color-btn-hover': variables.btnHover ?
                getRgbVal(variables.btnHover) :
                getRgbVal(defaultTheme.btnHover),
            '--color-btn-hover-text': variables.btnHoverText ?
                getRgbVal(variables.btnHoverText) :
                getRgbVal(defaultTheme.btnHoverText),
            '--color-btn-negative': variables.btnNegative ?
                getRgbVal(variables.btnNegative) :
                getRgbVal(defaultTheme.btnNegative),
            '--color-btn-negative-text': variables.btnNegativeText ?
                getRgbVal(variables.btnNegativeText) :
                getRgbVal(defaultTheme.btnNegativeText),
            '--color-btn-negative-hover': variables.btnNegativeHover ?
                getRgbVal(variables.btnNegativeHover) :
                getRgbVal(defaultTheme.btnNegativeHover),
            '--color-btn-negative-hover-text': variables.btnNegativeHoverText ?
                getRgbVal(variables.btnNegativeHoverText) :
                getRgbVal(defaultTheme.btnNegativeHoverText),
            '--color-text-primary': variables.textPrimary ?
                getRgbVal(variables.textPrimary) :
                getRgbVal(defaultTheme.textPrimary),
            '--color-text-secondary': variables.textSecondary ?
                getRgbVal(variables.textSecondary) :
                getRgbVal(defaultTheme.textSecondary),
            '--color-text-accent': variables.textAccent ?
                getRgbVal(variables.textAccent) :
                getRgbVal(defaultTheme.textAccent),
            '--color-text-error': variables.textError ?
                getRgbVal(variables.textError) :
                getRgbVal(defaultTheme.textError),
            '--color-input-background': variables.inputBackground ?
                getRgbVal(variables.inputBackground) :
                getRgbVal(defaultTheme.inputBackground),
            '--color-input-text-primary': variables.inputTextPrimary ?
                getRgbVal(variables.inputTextPrimary) :
                getRgbVal(defaultTheme.inputTextPrimary),
            '--color-input-text-secondary': variables.inputTextSecondary ?
                getRgbVal(variables.inputTextSecondary) :
                getRgbVal(defaultTheme.inputTextSecondary),
            '--color-text-input-accent': variables.inputTextAccent ?
                getRgbVal(variables.inputTextAccent) :
                getRgbVal(defaultTheme.inputTextAccent),
            '--color-nav-primary': variables.navPrimary ?
                getRgbVal(variables.navPrimary) :
                getRgbVal(defaultTheme.navPrimary),
            '--color-nav-primary-active': variables.navPrimaryActive ?
                getRgbVal(variables.navPrimaryActive) :
                getRgbVal(defaultTheme.navPrimaryActive),
            '--color-nav-primary-inactive': variables.navPrimaryInactive ?
                getRgbVal(variables.navPrimaryInactive) :
                getRgbVal(defaultTheme.navPrimaryActive),
            '--color-nav-secondary': variables.navSecondary ?
                getRgbVal(variables.navSecondary) :
                getRgbVal(defaultTheme.navSecondary),
            '--color-nav-secondary-active': variables.navSecondaryActive ?
                getRgbVal(variables.navSecondaryActive) :
                getRgbVal(defaultTheme.navSecondaryActive),
            '--color-nav-secondary-inactive': variables.navSecondaryInactive ?
                getRgbVal(variables.navSecondaryInactive) :
                getRgbVal(defaultTheme.navSecondaryActive),
            '--color-nav-accent': variables.navAccent ?
                getRgbVal(variables.navAccent) :
                getRgbVal(defaultTheme.navAccent),
        };
    };

    const defaultTheme: ThemeDataAttrs = {
        backgroundColor: '#000000',
        primary: '#607D8B',
        secondary: '#CFD8DC',
        accent: '#FF5252',
        btnPrimary: '#B3D131',
        btnSecondary: '#000000',
        btnAccent: '#FFA726',
        btnDisabled: '#F5F5F5',
        btnDisabledText: '#FFFFFF',
        btnText: '#000000DE',
        btnHover: '#009688',
        btnHoverText: '#FFFFFF',
        textPrimary: '#FFFFFF',
        textSecondary: '#BBDA00',
        textAccent: '#000000',
        textError: '#FF0000',
        inputTextPrimary: '#FFFFFF',
        inputTextSecondary: '#FFFFFF',
        inputTextAccent: '#000000',
        navPrimary: '#000000',
        navPrimaryActive: '#93D500',
        navPrimaryInactive: '#FFFFFF',
        navSecondary: '#607D8B',
        navSecondaryActive: '#009688',
        navSecondaryInactive: '#607D8B',
        navAccent: '#EF5350',
        btnNegative: "#009688",
        btnNegativeText: "#009688",
        btnNegativeHover: "#009688",
        btnNegativeHoverText: "#009688",
        inputBackground: "#009688",
    }

    const themeData = reactive<ThemeDataAttrs>(defaultTheme)

    const setTheme = (data: Partial<ThemeDataAttrs>) => {
        Object.assign(themeData, JSON.parse(JSON.stringify(data)));
        applyTheme();
    }

    const applyTheme = (): void => {
        const themeObject: { [key: string]: string | null } = mapTheme(themeData);
        if (!themeObject) return;

        const root = document.documentElement;

        Object.keys(themeObject).forEach((property) => {
            if (property === 'name') {
                return;
            }

            root.style.setProperty(property, themeObject[property]);
        });
    };

    return {
        themeData: readonly(themeData),
        setTheme,
    }
}
