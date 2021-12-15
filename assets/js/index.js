import playlist from "./playlist";
import '../styles/style.scss';
import '../styles/owfont-regular.css';

const ALTime = document.querySelector('.time');
const ALDate = document.querySelector('.date');
const ALGreeting = document.querySelector('.greeting');
const ALNameInput = document.querySelector('.name');
const ALSlideNext = document.querySelector('.slide-next');
const ALSlidePrev = document.querySelector('.slide-prev');
const ALWeather = document.querySelector('.weather');
const ALCity = ALWeather.querySelector('.city');
const ALWeatherIcon = ALWeather.querySelector('.weather-icon');
const ALTemperature = ALWeather.querySelector('.temperature');
const ALWeatherDescription = ALWeather.querySelector('.weather-description');
const ALWind = ALWeather.querySelector('.wind');
const ALHumidity = ALWeather.querySelector('.humidity');
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const settingsIcon = document.querySelector('.settings');
const changeQuoteBtn = document.querySelector('.change-quote');
const settings = document.querySelector('.settings__modal');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const audio = new Audio();
let isAudioPlay = false;
let audioNumber = 0;
let randomNumber;

function showTime() {
    const date = new Date();
    ALTime.textContent = date.toLocaleTimeString('ru-RU', { hour12: false });

    showDate();
    showGreeting();

    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    ALDate.textContent = date.toLocaleDateString('ru-Ru', options);
}

function getTimeOfTheDay() {
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

function showGreeting() {
    const timeOfDay = getTimeOfTheDay();
    ALGreeting.textContent = `Good ${timeOfDay},`;
}

function setLocalStorage() {
    localStorage.setItem('ALName', ALNameInput.value);
    localStorage.setItem('ALCity', ALCity.value);
}

function getLocalStorage() {
    if(localStorage.getItem('ALName')) {
        ALNameInput.value = localStorage.getItem('ALName');
    }

    if(localStorage.getItem('ALCity')) {
        ALCity.value = localStorage.getItem('ALCity');
        getWeather();
    }
}

function getRandomNum(min = 1, max = 20) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumber = num.toString().padStart(2, '0');
}
getRandomNum();

function setBackground() {
    let timeOfTheDay = getTimeOfTheDay();

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Nekoguard/stage1-tasks/assets/images/${timeOfTheDay}/${randomNumber}.jpg`;

    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    });
}

setBackground();

function getSlideNext() {
    let num = Number(randomNumber);
    num++;

    if (num > 20) {
        num = 1;
    }

    randomNumber = num.toString().padStart(2, '0');

    setBackground();
}

function getSlidePrev() {
    let num = Number(randomNumber);
    num--;

    if (num < 1) {
        num = 20;
    }

    randomNumber = num.toString().padStart(2, '0');

    setBackground();
}

function showSettings() {
    if (settings.classList.contains('closed')) {
        settings.classList.remove('closed');
    } else {
        settings.classList.add('closed');
    }
}

function playAudio() {
    if (!isAudioPlay) {
        isAudioPlay = true;

        playBtn.classList.add('pause');

        audio.src = playlist[audioNumber].src;
        audio.currentTime = 0;
        audio.play();
    } else if (isAudioPlay) {
        isAudioPlay = false;

        playBtn.classList.remove('pause');

        audio.pause();
    }
}

function playNextAudio() {
    if (audioNumber === playlist.length - 1) {
        audioNumber = 0;
    } else {
        audioNumber++;
    }

    isAudioPlay = true;

    playBtn.classList.add('pause');

    audio.src = playlist[audioNumber].src;
    audio.currentTime = 0;
    audio.play();
}

function playPrevAudio() {
    if (audioNumber === 0) {
        audioNumber = playlist.length - 1;
    } else {
        audioNumber--;
    }

    isAudioPlay = true;
    playBtn.classList.add('pause');

    audio.src = playlist[audioNumber].src;
    audio.currentTime = 0;
    audio.play();
}

async function getWeather() {
    if (!ALCity.value) {
        ALCity.value = "Minsk"
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ALCity.value}&lang=en&appid=2643b822a0a8b1d5d616f10bdc1942de&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    ALWeatherIcon.className = 'weather-icon owf';
    ALWeatherIcon.classList.add(`owf-${data.weather[0].id}`);
    ALTemperature.textContent = `${Math.round(data.main.temp)}°C`;
    ALWeatherDescription.textContent = data.weather[0].description;
    ALHumidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    ALWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
}

function getRandomQuoteNum(min = 0, max = 500) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function getQuotes() {
    const quotes = 'https://rolling-scopes-school.github.io/nekoguard-JSFE2021Q3/momentum/json/en-quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();

    let num = getRandomQuoteNum();

    quote.textContent = `" ${data[num].text} "`;
    quoteAuthor.textContent = `${data[num].author}`;
}
getQuotes();

playlist.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${item.title}`;
    playListContainer.append(li);
})

getWeather();

ALCity.addEventListener('change', getWeather);

window.addEventListener('beforeunload', setLocalStorage);

window.addEventListener('load', getLocalStorage);

ALSlideNext.addEventListener('click', getSlideNext);

ALSlidePrev.addEventListener('click', getSlidePrev);

settingsIcon.addEventListener('click', showSettings);

changeQuoteBtn.addEventListener('click', getQuotes);

playBtn.addEventListener('click', playAudio);

playNextBtn.addEventListener('click', playNextAudio);

playPrevBtn.addEventListener('click', playPrevAudio);

showTime();
