import showDate from "./show-date";
import showGreeting from "./show-greeting";

const ALTime = document.querySelector('.time');

export default function showTime() {
    const date = new Date();
    ALTime.textContent = date.toLocaleTimeString('ru-RU', { hour12: false });

    showDate();
    showGreeting();

    setTimeout(showTime, 1000);
}
