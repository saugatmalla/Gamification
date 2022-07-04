export function parseTimeString(value: string): string {
    let timeString = '';
    let ampm = 'AM';

    const timeValues = getTimeValues(value);

    if (timeValues[0] < 10) {
        timeString += `${timeValues[0]}`
    } else {
        if (timeValues[0] >= 12) {
            ampm = 'PM';
        }

        if (timeValues[0] > 12) {
            timeString += `${timeValues[0] - 12}`
        } else {
            timeString += `${timeValues[0]}`
        }
    }

    if (timeValues[1] < 10) {
        timeString += `:0${timeValues[1]}`
    } else {
        timeString += `:${timeValues[1]}`
    }

    // if (timeValues[2] < 10) {
    //     timeString += `:0${timeValues[2]}`
    // } else {
    //     timeString += `:${timeValues[2]}`
    // }

    return `${timeString} ${ampm}`;
}

function getTimeValues(dateStr: string): [number, number, number] {
    let timeValues = dateStr.split(':');

    let hour = parseInt(timeValues[0])

    let minutes = parseInt(timeValues[1])

    let seconds = parseInt(timeValues[2])

    return [Math.floor(hour), Math.floor(minutes), Math.floor(seconds)];
}