import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.elements.delay;
let delay = "";

input.addEventListener("input", (evt) => {
    delay = Number(evt.currentTarget.value);
});

const makePromise = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const state = form.elements.state.value;
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            }
        }, delay)
    })
};

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    makePromise(delay)
        .then((delay) => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`,
                messageSize: '20',
                theme: 'dark',
                color: 'green',
                position: `topRight`,
            });
        })
        .catch((delay) => {
            iziToast.show({
                message: `❌ Rejected promise in ${delay}ms`,
                messageSize: '20',
                theme: 'dark',
                color: 'red',
                position: `topRight`,
            });
        })
});
