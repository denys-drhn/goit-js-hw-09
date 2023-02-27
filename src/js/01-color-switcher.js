function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyElement = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;
let startChangeColor;

const onStartBtnClick = () => {
	startChangeColor = setInterval(() => {
		bodyElement.style.backgroundColor = getRandomHexColor();
	}, 1000);
	
	startBtn.disabled = true;
	stopBtn.disabled = false;
};

const onStopBtnClick = () => {
	clearInterval(startChangeColor);
	startBtn.disabled = false;
	stopBtn.disabled = true;
};

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);