export default function getTimeOfTheDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours <= 5) {
        return 'night';
    } else if (hours > 5 && hours <= 11) {
        return 'morning';
    } else if (hours > 11 && hours <= 17) {
        return 'afternoon';
    } else if (hours > 17 && hours <= 23) {
        return 'evening';
    }
}
