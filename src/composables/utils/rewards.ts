import useAppSetup from '../useAppSetup'

type locale = {
    locale: string;
    name: string;
    desc: string;
    image_url?: string;
}

const { selectedLanguage } = useAppSetup();

export function getRewardsLocalizedName(value: locale[] | [] | undefined | null) {
    if (Array.isArray(value) && value.length > 0) {
        const reward = value.find(el => el.locale.toLowerCase() === selectedLanguage.value)
        if (reward)
            return reward.name
    }
    return undefined
}

export function getRewardsLocalizedDesc(value: locale[] | [] | undefined | null) {
    if (Array.isArray(value) && value.length > 0) {
        const reward = value.find(el => el.locale.toLowerCase() === selectedLanguage.value)
        if (reward)
            return reward.desc
    }
    return undefined
}