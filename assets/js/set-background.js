import getTimeOfTheDay from "./get-time-of-the-day";
import getRandomNum from "./get-random-num";

export default function setBackground() {
    let timeOfTheDay = getTimeOfTheDay();

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Nekoguard/stage1-tasks/assets/images/${timeOfTheDay}/${getRandomNum()}.jpg`;

    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    });
}
