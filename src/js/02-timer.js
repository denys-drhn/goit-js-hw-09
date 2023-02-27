import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}; // принимает число, приводит к строке и  добавляет в начало 0 , если число меньше двух знаков

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');

const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');



startBtn.disabled = true;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
	//   console.log(selectedDates[0].getTime());
	  let selectedDate = selectedDates[0].getTime();
	  let currentDate = Date.now();
	//   console.log(currentDate);
	  if (selectedDate < currentDate) {
		  Notify.failure('Please choose a date in the future', {
    timeout: 2000,
  },);
	//   window.alert("Please choose a date in the future")
		  return
	  };
	  startBtn.disabled = false;
	},
};

flatpickr("input#datetime-picker", options);

const onStartBtnClick = () => {
	timer.start();
	startBtn.disabled = true;
};

startBtn.addEventListener('click', onStartBtnClick); // click on START BUTTON

const timer = {
	intervalId: null,
	isActive: false,
	start() {
		if (this.isActive) {
			return;
		}
		
		const inputDate = new Date(input.value).getTime();
		this.isActive = true;
		
		// console.log(inputDate);
		// console.log(currentDate);
		this.intervalId = setInterval(() => {
			const currentDate = Date.now();
			const timeLeft = inputDate - currentDate;
			// console.log(timeLeft);
			if (timeLeft < 0) {
				clearInterval(this.intervalId);
				this.isActive = false;
				return;
			};
			
			const time = convertMs(timeLeft);
			updateTimerFace(time);
			// console.log(`${days}:${hours}:${minutes}:${seconds}`);

		}, 1000);
	}
};

function updateTimerFace({ days, hours, minutes, seconds }) {
	timerDays.textContent = `${days}`;
	timerHours.textContent = `${hours}`;
	timerMinutes.textContent = `${minutes}`;
	timerSeconds.textContent = `${seconds}`;
}