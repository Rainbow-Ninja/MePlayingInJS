const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
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

const drawSomething() => {
    for (let i = 0; i < canvas.height; i ++) {
        ctx.moveTo(i, 0)
        ctx.lineTo(canvas.width, i)
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.lineTo(i, 0)
    }
}

const render = () => {
    requestAnimationFrame(() => {
        canvas.width = normalizeForDpi(canvas.clientWidth);
        canvas.height = normalizeForDpi(canvas.clientHeight);
       x = randPos(canvas.width);
       y = randPos(canvas.height);
        const circle = {radius: 5, hue: 5, color: rgb(50, 25, 107), opacity: 0.5, x, y};
      
        render();
    });
};
render();