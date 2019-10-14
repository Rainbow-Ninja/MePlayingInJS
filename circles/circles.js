const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const SATURATION = '57%';
const LIGHTNESS = '52%';

const randPos = val => {
    return Math.floor(Math.random()* val);
};

const generateCircle = (
    x = randPos(canvas.width),
    y = randPos(canvas.height),
) => {
    return {
        radius: 5,
        hue: 0,
        opacity: 70 + Math.random() * 30,
        x,
        y,
    };
};

const circles = [generateCircle()];

const circleCoverRadius = circle => {
    const side = Math.max(circle.x, circle.y);

    return 1000 - side * Math.sqrt(2);
};

let nextFillTime = Date.now();

const updateNextFillTime = () => {
    nextFillTime = Date.now() + 500 + 2500 * Math.random();
};

const normalizeForDpi = val => val;

const addFromEvent = event => {
    const x = normalizeForDpi(event.clientX);
    const y = normalizeForDpi(event.clientY);
    circles.push(generateCircle(x, y));
};

let mouseDown = false;

const toggleMouse = () => {
    mouseDown = !mouseDown;
};

window.onclick = addFromEvent;

window.onpointermove = event => {
    if(mouseDown) {
        addFromEvent(event);
    }
}

window.onpointerdown = toggleMouse;
window.onpointerup = toggleMouse;

const render = () => {
    requestAnimationFrame(() => {
        if(Date.now() > nextFillTime) {
        circles.push(generateCircle());
        updateNextFillTime();
        }
        canvas.width = normalizeForDpi(canvas.clientWidth);
        canvas.height = normalizeForDpi(canvas.clientHeight);
        circles.forEach((circle, i) => {
            ctx.beginPath();
            circle.radius = circle.radius + 2;
            circle.hue = (circle.hue + 1) %360;
            ctx.fillStyle = `hsla(${circle.hue}, ${SATURATION}, ${LIGHTNESS}, ${circle.opacity}%)`;
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI *2);
            ctx.fill();
            ctx.closePath();
        });

        if(circles[0].radius > 4000) {
            circles.shift();
            circles.push(generateCircle());
        }

        while(circles.length > 500) {
            circles.shift();
        }

        render();
    });
};
render();