import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

	const OnSubmitClick = (event) => {
	event.preventDefault();
	const delay = Number(event.target.elements.delay.value);
	const step = Number(event.target.elements.step.value);
	const amount = Number(event.target.elements.amount.value);

  for (let i = 1; i <= amount; i+= 1) {
    createPromise(i, delay + step * (i - 1))
		 .then(({ position, delay }) => {
			Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      
      })
		 .catch(({ position, delay }) => {
			Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
     
      });
  }
	};

	form.addEventListener('submit', OnSubmitClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
