import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        this.init();
    }

    init() {
        const ms = this.convertMs(0);
        this.onTick(ms);
    }

    start() {
        if (this.isActive) return;

        const startTime = userSelectedDate.getTime();

        this.intervalId = setInterval(() => {
            this.isActive = true;
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;

            if (deltaTime <= 0) {
                this.stop();
                return;
            }

            const ms = this.convertMs(deltaTime);
            this.onTick(ms);
        }, 1000);

        startBtn.disabled = true;
        input.disabled = true;
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        startBtn.disabled = false;
        input.disabled = false;
    }

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }
};

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");
startBtn.disabled = true;
let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        validateSelectedDate();
    },
};

flatpickr(input, options);

function validateSelectedDate() {
    if (userSelectedDate.getTime() < Date.now()) {
        startBtn.disabled = true;
        iziToast.show({
            message: 'Please choose a date in the future',
            messageSize: '20',
            theme: 'dark',
            color: 'red',
            position: `topRight`,
        });
    } else {
        startBtn.disabled = false;
    }
};

const timer = new Timer({
    onTick: updateClockface,
});

startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockface({days, hours, minutes, seconds}) {
    dataDays.textContent = String(days);
    dataHours.textContent = String(hours).padStart(2, `0`);
    dataMinutes.textContent = String(minutes).padStart(2, `0`);
    dataSeconds.textContent = String(seconds).padStart(2, `0`);
};
