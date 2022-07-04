export function dateToString(date: Date = new Date(), includeTime = false): string {
    let year = `${date.getFullYear()}`;
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    if (!includeTime) {
        return `${[year, month, day].join('-')}`;
    }

    return `${[year, month, day].join('-')} ${date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()}:${date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()}:${date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds()}`
}