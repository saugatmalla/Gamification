<template>
    <div class="mx-auto">
        <div>
            <div class="container mx-auto">
                <div class="mb-5 w-64">
                    <label
                        for="datepicker"
                        class="font-bold mb-1 text-txt-primary dark:text-gray-400 block text-center"
                    >
                        {{
                            label
                        }}
                    </label>
                    <div class="relative border-2 border-primary dark:border-gray-400 rounded-md">
                        <input type="hidden" name="date" ref="date" />
                        <input
                            type="text"
                            v-model="datepickerValue"
                            @focus="showDatepicker = true"
                            v-on:keydown.escape="showDatepicker = false"
                            class="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none bg-white dark:bg-black text-txt-primary dark:text-gray-400 font-medium dark:focus:ring-gray-400"
                            placeholder="Select date"
                            readonly
                        />

                        <button
                            @click="showDatepicker = !showDatepicker"
                            class="absolute top-0 right-0 px-3 py-2 text-btn-text dark:text-gray-400"
                        >
                            <CalendarIcon class="h-6 w-6" />
                        </button>

                        <BaseModal
                            :isOpen="showDatepicker"
                            @dismissed="closeDatePicker"
                            key="date-picker"
                        >
                            <template v-slot:modal-body>
                                <div
                                    class="bg-white dark:bg-black border-2 border-primary dark:border-gray-900 rounded-lg shadow p-5 w-full h-full min-h-[350px]"
                                    v-show="showDatepicker"
                                >
                                    <div class="flex justify-between items-center p-2">
                                        <div class="inline-flex">
                                            <div class="relative inline-block text-left">
                                                <div>
                                                    <button
                                                        type="button"
                                                        class="inline-flex px-2 py-1 justify-center w-full rounded-md border border-gray-300 dark:border-gray-400 shadow-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none min-w-[120px]"
                                                        id="menu-button"
                                                        aria-expanded="true"
                                                        aria-haspopup="true"
                                                        @click="showMonthsList = !showMonthsList"
                                                    >
                                                        <span
                                                            v-text="MONTH_NAMES[month]"
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
                                                    class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="menu-button"
                                                    tabindex="-1"
                                                    v-if="showMonthsList"
                                                >
                                                    <div
                                                        class="py-1 max-h-56 overflow-y-scroll"
                                                        role="none"
                                                    >
                                                        <a
                                                            v-for="(m, index) in MONTH_NAMES"
                                                            :key="m"
                                                            @click="selectMonth(index)"
                                                            href="#"
                                                            :class="[m === MONTH_NAMES[month] ? 'bg-gray-100 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400']"
                                                            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-400"
                                                            role="menuitem"
                                                            tabindex="-1"
                                                            id="menu-item-0"
                                                        >{{ m }}</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="relative inline-block text-left">
                                                <div>
                                                    <button
                                                        type="button"
                                                        class="inline-flex px-2 py-1 justify-center w-full rounded-md border border-gray-300 dark:border-gray-400 shadow-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none"
                                                        id="menu-button"
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
                                                    v-if="showYearsList"
                                                >
                                                    <div class="py-1 max-h-56" role="none">
                                                        <a
                                                            v-for="(y, index) in yearsList"
                                                            :key="y"
                                                            @click="selectYear(y)"
                                                            href="#"
                                                            :class="[y === year ? 'bg-gray-100 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400']"
                                                            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-400"
                                                            role="menuitem"
                                                            tabindex="-1"
                                                            id="menu-item-100"
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
                                                    v-text="day"
                                                    class="text-gray-800 dark:text-gray-400 font-medium text-center text-xs"
                                                ></div>
                                            </div>
                                        </template>
                                    </div>

                                    <div class="flex flex-wrap -mx-1">
                                        <template
                                            v-for="(blankday, index) in blankdays"
                                            :key="index"
                                        >
                                            <div
                                                style="width: 14.28%"
                                                class="text-center border p-1 border-transparent text-sm"
                                            ></div>
                                        </template>
                                        <template
                                            v-for="(date, dateIndex) in no_of_days"
                                            :key="dateIndex"
                                        >
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
                            </template>
                        </BaseModal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, PropType, reactive, computed, watch } from "vue";
import BaseModal from '../modals/BaseModal.vue';
import { CalendarIcon } from '@heroicons/vue/outline'

type MONTH_NAMES_FULL = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

type MONTH_NAMES_SHORT = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

// define constants
const MONTH_NAMES: MONTH_NAMES_FULL[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const MONTH_SHORT_NAMES: MONTH_NAMES_SHORT[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const props = defineProps({
    fieldLabel: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: String,
        required: false,
    },
    allowFutureDates: {
        type: Boolean,
        required: false,
        default: false,
    }
});

const label = props.fieldLabel;

const emits = defineEmits(['changed']);

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

const closeDatePicker = () => {
    showYearsList.value = false;
    showMonthsList.value = false;
    showDatepicker.value = false;
}

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
    datepickerValue.value = formatDateForDisplay(
        today.value
    );
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

    if (datepickerValue.value ===
        formatDateForDisplay(d)) {
        if (!showDatepicker.value) {
            emits('changed', d)
        }
    }

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
    showDatepicker.value = false;
}

const getNoOfDays = () => {
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
    month.value = monthIndex;

    // adjust for js month value
    if (month.value == 0) {
        month.value = 1;
    }

    if (month.value == 11) {
        month.value = 12;
    }

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

onMounted(() => {
    allowNext.value = props.allowFutureDates;
    init();
})
</script>