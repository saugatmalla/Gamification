export interface User {
    id: string;
    username?: string;
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
    type: string;
    loyalty_number: string;
    points: number;
    lifetime_points: number;
    uuid: string;
    dob: string;
    profile_pic: string;
    referral_key: string;
    contact_details?: ContactDetail[];
    addresses?: UserLocation[];
    app_terms?: {
        id: number;
        name: string;
        desc: string;
        term: string;
        is_accepted: boolean;
        locales: {
            locale: string;
            name: string;
            desc: string;
            term: string;
        }[];
    }[];
}

export interface UserLocation {
    id: number;
    label: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

export interface BusinessBranding {
    logo_url: string
    background_color: string
    primary_color: string
    secondary_color: string
    accent_color: string
    btn_primary_color: string
    btn_secondary_color: string
    btn_accent_color: string
    btn_text_color: string
    btn_hover_color: string
    btn_hover_text_color: string
    btn_disabled_color: string
    btn_disabled_text_color: string
    btn_negative_color: string
    btn_negative_text_color: string
    btn_negative_hover_color: string
    btn_negative_hover_text_color: string
    text_primary_color: string
    text_secondary_color: string
    text_accent_color: string
    text_error_color: string
    input_bg_color: string
    input_text_color: string
    input_text_secondary_color: string
    input_text_accent_color: string
    nav_primary_color: string
    nav_primary_active_color: string
    nav_primary_inactive_color: string
    nav_secondary_color: string
    nav_secondary_active_color: string
    nav_secondary_inactive_color: string
    nav_accent_color: string
    font_source: string
    font_family: string
    background_image_url: string
    marketing_video_url?: string
    marketing_image_url?: string
}

export interface LoyaltyAppSetup extends BusinessBranding {
    ga_tracking_id: string;
    app_token: string;
    start_date: string;
    end_date: string | null;
    currency_name: string;
    currency_name_plural: string;
}

export interface AppPageSettings {
    home?: { [key: string]: string };
    profile?: { [key: string]: string };
    login?: { [key: string]: string };
    register?: { [key: string]: string };
    forgot_password?: { [key: string]: string };
    transactions?: { [key: string]: string };
    checkout?: { [key: string]: string };
}

export interface UserSession {
    phoneNumber: string;
    verificationToken: string;
    step: 0 | 1;
}

export interface RegistrationSettings {
    email: boolean;
    phone: boolean;
    registration_fields: {
        [key: string]: {
            label: string;
            registration_method: string;
            field_key: string;
            field_type: string;
            placeholder: string;
            help_text: string;
            error_text: string;
            is_required: boolean;
            sort_order: number;
            meta: string;
        }[]
    },
    app_terms?: {
        id: number;
        term: string;
        is_required: boolean;
        is_clickable: boolean;
        default_value: boolean;
        locales: {
            locale: string;
            term: string;
        }[] | []
    }[];
}

export interface Rewards {
    id: number;
    name: string;
    desc: string;
    sku: string;
    image_url: string;
    total_qty: number;
    total_claimed: number;
    points_required: number;
    reward_type: string;
    retail_value: number;
    shipping_required: false,
    shipping_cost: number;
    sort_order: number;
    is_available: boolean,
    locales?:
    {
        locale: string;
        name: string;
        desc: string
        image_url?: string;
    }[]
}

export interface ContactDetail {
    id: number;
    contact_type: string;
    contact_value: string;
    is_verified: boolean;
    is_primary: boolean;
}

interface TabTransactionDetail {
    tx_type: 'earn';
    details: {
        tab?: string;
        action?: string;
        points_adjustment?: number;
    };
    points: number;
    notes: string;
}

interface RewardTransactionDetail {
    tx_type: 'redeem';
    details: {
        qty: number;
        reward_desc: string;
        reward_name: string;
        reward_image_url: string;
    };
    points: number;
    notes: string;
}

interface VoidTransactionDetail {
    tx_type: 'void';
    details?: {};
    points: number;
    notes: string;
}
export interface Transactions {
    total_results: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    results: {
        location_data?: string,
        tx_key: string;
        points_earned: number;
        points_redeemed: number;
        created_at: Date;
        transaction_details:
        (TabTransactionDetail | RewardTransactionDetail | VoidTransactionDetail)[]
    }[]
}

export interface UserAddress {
    id?: number;
    label?: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

export interface CartItem {
    id: number;
    qty: number;
    notes: string | null;
    reward: Rewards
}

export interface Locale {
    id: number;
    name: string
}

export interface LoginOption {
    phone: boolean;
    email: boolean;
}

export interface UserProfileDetail {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
}