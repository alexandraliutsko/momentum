const ALDate = document.querySelector('.date');

export default function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    ALDate.textContent = date.toLocaleDateString('ru-Ru', options);
}
