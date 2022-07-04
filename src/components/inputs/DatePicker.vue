<template>
    <div ref="datepickerElement" class="relative" :class="{ [width]: true }">
        <div class="relative bg-input-background h-[48px]">
            <input type="hidden" name="date" ref="date" />
            <input
                type="text"
                :id="fieldId"
                v-model="datepickerValue"
                @focus="showDatepicker = true"
                v-on:keydown.escape="showDatepicker = false"
                class="peer absolute block placeholder-transparent bg-transparent text-txt-primary h-full w-full outline-none pt-5 pl-4 italic font-bold uppercase"
                placeholder="Select date"
                readonly
            />
            <label
                class="absolute block text-txt-primary uppercase h-full text-sm italic font-bold left-4 top-1.5 transition-all duration-300 cursor-text peer-placeholder-shown:top-[12px] peer-placeholder-shown:text-xl"
                :for="label"
                @click="showDatepicker = true"
            >
                {{
                   fieldLabel 
                }}
            </label>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div
                class="absolute bg-white dark:bg-black mt-14 rounded-lg shadow p-4 left-0 z-40 transition-all duration-150"
                :class="[windowHeight() - datePickerPosition() > 258 ? 'top-0' : 'bottom-20']"
                style="width: 17rem"
                v-show="showDatepicker"
            >
                <div class="flex justify-between items-center mb-2">
                    <div class="inline-flex">
                        <div class="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    class="inline-flex px-2 py-1 justify-center w-full rounded-md border border-gray-300 dark:border-gray-400 shadow-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    @click="showMonthsList = !showMonthsList"
                                >
                                    <span
                                        v-text="$t(MONTH_NAMES[month])"
                                        class="text-sm font-bold text-gray-800 dark:text-gray-400"
                                    ></span>
                                    <svg
                                        class="-mr-1 ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div
                                class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 max-h-72 overflow-y-scroll focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="month-menu-button"
                                tabindex="-1"
                                v-show="showMonthsList"
                                ref="monthsListElement"
                            >
                                <div class="py-1" role="none">
                                    <a
                                        v-for="(m, index) in MONTH_NAMES"
                                        :key="m"
                                        @click="selectMonth(index)"
                                        href="#"
                                        :class="[m === MONTH_NAMES[month] ? 'bg-gray-100 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400',
                                        (!props.allowFutureDates &&
                                            year >= today.getFullYear() &&
                                            index > today.getMonth()) ? 'cursor-not-allowed' : ''
                                        ]"
                                        class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-400"
                                        role="div"
                                        tabindex="-1"
                                        :id="`month-menu-item-${index}`"
                                    >{{ $t(m) }}</a>
                                </div>
                            </div>
                        </div>

                        <div class="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    class="inline-flex px-2 py-1 justify-center w-full rounded-md border border-gray-300 dark:border-gray-400 shadow-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none"
                                    id="year-menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    @click="showYearsList = !showYearsList"
                                >
                                    <span
                                        v-text="year"
                                        class="text-sm font-bold text-gray-800 dark:text-gray-400"
                                    ></span>
                                    <svg
                                        class="-mr-1 ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div
                                class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none max-h-72 overflow-y-scroll"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabindex="-1"
                                v-show="showYearsList"
                                ref="yearsListElement"
                            >
                                <div class="py-1" role="none">
                                    <a
                                        v-for="(y, index) in yearsList"
                                        :key="y"
                                        @click="selectYear(y)"
                                        href="#"
                                        :class="[y === year ? 'bg-gray-100 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400']"
                                        class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-400"
                                        role="div"
                                        tabindex="-1"
                                        :id="`year-menu-item-${index}`"
                                    >{{ y }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            class="focus:outline-none focus:shadow-outline transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 rounded-full"
                            @click="if (month == 0) {
                                year--;
                                month = 12;
                            }
                            month--;
                            getNoOfDays();"
                        >
                            <svg
                                class="h-3 w-3 text-gray-400 inline-flex"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            class="focus:outline-none focus:shadow-outline transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 rounded-full"
                            :disabled="!allowNext"
                            @click="if (month == 11) {
                                month = 0;
                                year++;
                            } else {
                                month++;
                            }
                            getNoOfDays();"
                        >
                            <svg
                                class="h-3 w-3 text-gray-400 inline-flex"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="flex flex-wrap mb-3 -mx-1">
                    <template v-for="(day, index) in DAYS" :key="index">
                        <div style="width: 14.26%" class="px-0.5">
                            <div
                                v-text="$t(day)"
                                class="text-gray-800 dark:text-gray-400 font-medium text-center text-xs"
                            ></div>
                        </div>
                    </template>
                </div>

                <div class="flex flex-wrap -mx-1">
                    <template v-for="(blankday, index) in blankdays" :key="index">
                        <div
                            style="width: 14.28%"
                            class="text-center border p-1 border-transparent text-sm"
                        ></div>
                    </template>
                    <template v-for="(date, dateIndex) in no_of_days" :key="dateIndex">
                        <div style="width: 14.28%" class="px-1 mb-1">
                            <div
                                @click="getDateValue(date)"
                                v-text="date"
                                class="cursor-pointer text-center text-sm leading-loose rounded-full transition ease-in-out duration-100"
                                :class="{
                                    'bg-indigo-200 dark:bg-gray-900': isToday(date) === true,
                                    'text-gray-600 dark:text-gray-400 hover:bg-indigo-200 dark:hover:bg-gray-900':
                                        isToday(date) == false &&
                                        isSelectedDate(date) === false,
                                    'bg-indigo-500 dark:bg-gray-900 text-white dark:text-gray-400 hover:bg-opacity-75':
                                        isSelectedDate(date) === true,
                                }"
                            ></div>
                        </div>
                    </template>
                </div>
            </div>
        </transition>
        <ErrorMsg :show-error="showError" :error-msg="errorMsg"></ErrorMsg>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, PropType, reactive, computed, watch } from "vue";
import ErrorMsg from '../Error/ErrorMsg.vue';

type MONTH_NAMES_FULL = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';

type MONTH_NAMES_SHORT = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';

type DAYS_SHORT = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
// define constants
const MONTH_NAMES: MONTH_NAMES_FULL[] = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
];  

const MONTH_SHORT_NAMES: MONTH_NAMES_SHORT[] = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
];

const DAYS: DAYS_SHORT[] = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
];

const props = defineProps({
    fieldLabel: {
        type: String,
        required: true,
    },
    width: {
        type: String as PropType<'w-full' | 'w-1/2' | 'w-1/3'>,
        default: 'w-full'
    },
    defaultValue: {
        type: String,
        required: false,
    },
    allowFutureDates: {
        type: Boolean,
        required: false,
        default: false,
    },
    fieldId: {
        type: String,
        required: false,
        default: `text_${Math.random()}`
    },
    errorMsg: {
        type: String,
        required: false,
        default: '',
    }
});

defineExpose({
    validate
})

// element refs
const datepickerElement = ref<HTMLDivElement>()
const monthsListElement = ref<HTMLDivElement>()
const yearsListElement = ref<HTMLDivElement>()

const label = props.fieldLabel;

const emits = defineEmits(['changed']);

const windowHeight = () => {
    return window.innerHeight
}

const datePickerPosition = () => {
    return datepickerElement.value?.getBoundingClientRect().bottom || 0
}

// initialize variables
const showDatepicker = ref(false);
const datepickerValue = ref('');
const selectedDate = ref('');
const dateFormat = ref('YYYY-MM-DD');
const month = ref(0);
const year = ref(0);
let no_of_days = reactive<number[]>([]);
let blankdays = reactive<number[]>([]);
const today = ref<Date>(new Date());

const init = () => {
    if (props.defaultValue && props.defaultValue !== '') {
        const defaultYear = parseInt(props.defaultValue.split('-')[0]);
        let month = parseInt(props.defaultValue.split('-')[1]) - 1;
        if (month < 0) {
            month = 12;
        }

        const day = parseInt(props.defaultValue.split('-')[2]);
        today.value = new Date(defaultYear, month, day);
    } else {
        today.value = new Date();
    }

    month.value = today.value.getMonth();
    year.value = today.value.getFullYear();
    // datepickerValue.value = formatDateForDisplay(
    //     today.value
    // );
    getNoOfDays();
}

const formatDateForDisplay = (date: Date) => {
    let formattedDay = DAYS[date.getDay()];
    let formattedDate = ("0" + date.getDate()).slice(
        -2
    ); // appends 0 (zero) in single digit date


    let formattedMonth = MONTH_NAMES[date.getMonth()];

    let formattedMonthShortName =
        MONTH_SHORT_NAMES[date.getMonth()];

    let formattedMonthInNumber = (
        "0" +
        (date.getMonth() + 1)
    ).slice(-2);

    let formattedYear = date.getFullYear();

    if (dateFormat.value === "DD-MM-YYYY") {
        return `${formattedDate}-${formattedMonthInNumber}-${formattedYear}`; // 02-04-2021
    }

    if (dateFormat.value === "YYYY-MM-DD") {
        return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`; // 2021-04-02
    }

    if (dateFormat.value === "D d M, Y") {
        return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`; // Tue 02 Mar 2021
    }

    return `${formattedDay} ${formattedMonth} ${formattedDate} ${formattedYear}`;
};

const isSelectedDate = (day: number): boolean => {
    const d = new Date(year.value, month.value, day);
    // if (datepickerValue.value ===
    //     formatDateForDisplay(d)) {
    //     if (!showDatepicker.value) {
    //         emits('changed', d, props.fieldId)
    //     }
    // }

    return datepickerValue.value ===
        formatDateForDisplay(d) ?
        true :
        false;
}

const isToday = (day: number): boolean => {
    const today = new Date();
    const d = new Date(year.value, month.value, day);
    return today.toDateString() === d.toDateString() ?
        true :
        false;
}

const allowNext = ref(true);
const getDateValue = (day: number) => {
    let selectedDate = new Date(
        year.value,
        month.value,
        day,
    );
    datepickerValue.value = formatDateForDisplay(
        selectedDate
    );
    isSelectedDate(day);
    emits('changed', datepickerValue.value, props.fieldId);
    showDatepicker.value = false;
    showMonthsList.value = false;
    showYearsList.value = false;
}

const getNoOfDays = () => {
    setAllowNext()
    let daysInMonth = new Date(
        year.value,
        month.value + 1,
        0
    ).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(
        year.value,
        month.value
    ).getDay();

    // empty days
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
    }

    // list of all days for the month
    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
        if (new Date(year.value, month.value, i) > new Date() && !allowNext.value) {
            continue
        }

        daysArray.push(i);
    }

    // clear blank days and reassign
    blankdays.splice(0, blankdays.length)
    if (blankdaysArray.length > 0) {

        Object.assign(blankdays, blankdaysArray)
    }

    // clear no of days and reassign
    no_of_days.splice(0, daysArray.length)
    Object.assign(no_of_days, daysArray)
}

const showMonthsList = ref(false);
const showYearsList = ref(false);

function selectMonth(monthIndex: number) {

    if (!props.allowFutureDates &&
        year.value >= today.value.getFullYear() &&
        monthIndex > today.value.getMonth()) {
        return
    }

    month.value = monthIndex;

    // adjust for js month value
    // if (month.value == 0) {
    //     month.value = 1;
    // }

    // if (month.value == 11) {
    //     month.value = 12;
    // }

    getNoOfDays();
    showMonthsList.value = false;
}

const yearsList = computed(() => {
    let yearsArray: number[] = [];
    if (!props.allowFutureDates) {
        for (let x = 1900; x <= new Date().getFullYear(); x++) {
            yearsArray.push(x);
        }
    } else {
        for (let x = 1900; x <= 2050; x++) {
            yearsArray.push(x);
        }
    }

    return yearsArray;
})

// hide the years list if month list is being shown
watch(showMonthsList, () => {
    if (showMonthsList.value) {
        showYearsList.value = false;
    }
})

// hide the months list if year list is being shown
watch(showYearsList, () => {
    if (showYearsList.value) {
        showMonthsList.value = false;
    }
})

function selectYear(selectedYear: number) {
    year.value = selectedYear;
    month.value = month.value

    getNoOfDays();
    showYearsList.value = false;
}

function focusoutDatepicker(e: MouseEvent) {
    if (datepickerElement.value && !datepickerElement.value.contains(<Node>e.target) && e.target !== monthsListElement.value && e.target !== yearsListElement.value) {
        showDatepicker.value = false;
        showMonthsList.value = false;
        showYearsList.value = false;
    }
}

const showError = ref(false);

function validate() {
    if (!datepickerValue.value) {
        showError.value = true;
        return false
    }
    showError.value = false;
    return true
}

function setAllowNext() {
    if (!props.allowFutureDates &&
        year.value == today.value.getFullYear() &&
        month.value >= today.value.getMonth()) {
        return allowNext.value = false
    }
    return allowNext.value = true
}

onMounted(() => {
    setAllowNext()
    document.addEventListener('click', focusoutDatepicker)
    init();
})
onUnmounted(() => {
    document.removeEventListener('click', focusoutDatepicker)
})

watch(datepickerValue, () => {
    showError.value = false
    emits('changed', datepickerValue.value, props.fieldId)
})
</script>