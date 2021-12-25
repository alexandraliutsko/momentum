export default function getRandomNum(min = 1, max = 20) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(2, '0');
}
