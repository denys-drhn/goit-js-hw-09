function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyElement = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const onStartBtnClick = () => {
	let startChangeColor = setInterval(() => {
		bodyElement.style.backgroundColor = getRandomHexColor();
	}, 1000);
	startBtn.disabled = true;
};

const onStopBtnClick = () => {
	clearInterval(startChangeColor);
	startBtn.disabled = false;
};

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);