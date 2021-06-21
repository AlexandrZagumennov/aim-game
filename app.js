const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      colors = ['white', 'blue', 'red', 'yellow', 'brown'];
let time = 0,
    score = 0;

const startGame = () => {
    setInterval(decrease, 1000);
    createRandomCircle();
    setTime(time);
};
const decrease = () => {
    if (time === 0) {
       finishGame(); 
    } else {
        let current = --time;
        if (current <10) {
           current = `0${current}`
        }
        setTime(current);
    }
};
const setTime = value => {
    timeEl.innerHTML = `00:${value}`;
};
const finishGame = () => {
    board.innerHTML = `<h1>Счёт: <span class = "primary"> ${score} </span></h1>`;
    timeEl.parentNode.classList.add('hide');
};
const createRandomCircle = () => {
    const circle = document.createElement('div'),
          size = getRandonNumber(10, 60),
          {width, height} = board.getBoundingClientRect(),
          x = getRandonNumber(0, width - size),
          y = getRandonNumber(0, height - size);

    circleColor = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `${circleColor}`;
    board.append(circle);
};
const getRandonNumber = (min, max) => {
    return Math.round(Math.random()*(max - min) + min)
};
const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)]
};

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if  (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
});

