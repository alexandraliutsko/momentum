import playlist from "./playlist";
import '../styles/style.scss';
import '../styles/owfont-regular.css';

import showTime from "./show-time";
import setBackground from "./set-background";
import getRandomNum from "./get-random-num";

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


getRandomNum();

setBackground();

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

        renderedAudios.forEach(item => {
            item.classList.remove('item-active');
        });
        renderedAudios[audioNumber].classList.add('item-active');
    } else if (isAudioPlay) {
        isAudioPlay = false;

        playBtn.classList.remove('pause');

        audio.pause();
        renderedAudios[audioNumber].classList.remove('item-active');
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

    renderedAudios.forEach(item => {
        item.classList.remove('item-active');
    });
    renderedAudios[audioNumber].classList.add('item-active');
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

    renderedAudios.forEach(item => {
        item.classList.remove('item-active');
    });
    renderedAudios[audioNumber].classList.add('item-active');
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

async function getQuotes() {
    const randomQuote = await fetch('https://api.quotable.io/random');
    const data = await randomQuote.json();

    quote.textContent = `" ${data.content} "`;
    quoteAuthor.textContent = `${data.author}`;
}
getQuotes();

playlist.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${item.title}`;
    playListContainer.append(li);
});

const renderedAudios = document.querySelectorAll('.play-item');

getWeather();

ALCity.addEventListener('change', getWeather);

window.addEventListener('beforeunload', setLocalStorage);

window.addEventListener('load', getLocalStorage);

ALSlideNext.addEventListener('click', setBackground);

ALSlidePrev.addEventListener('click', setBackground);

settingsIcon.addEventListener('click', showSettings);

changeQuoteBtn.addEventListener('click', getQuotes);

playBtn.addEventListener('click', playAudio);

playNextBtn.addEventListener('click', playNextAudio);

playPrevBtn.addEventListener('click', playPrevAudio);

showTime();
