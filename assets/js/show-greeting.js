import getTimeOfTheDay from "./get-time-of-the-day";

const ALGreeting = document.querySelector('.greeting');

export default function showGreeting() {
    const timeOfDay = getTimeOfTheDay();
    ALGreeting.textContent = `Good ${timeOfDay},`;
}
