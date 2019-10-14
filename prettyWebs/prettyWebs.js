const canvas = document.getElementById('mycanvas')
const context = canvas.getContext('2d')
var count = 0;
const clear = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
}

const drawSpirograph = (lines = 100, offset) => {
    const step = canvas.height / lines
    const {width: w, height: h} = canvas
    // var num = Math.random()*255;

    for (let i = -step; i < h; i += step) {
        context.moveTo(i + step + offset, 0)
        context.lineTo(w, i + step + offset)
        context.lineTo(w - i - step - offset, h)
        context.lineTo(0, h - i - step - offset)
        context.lineTo(i + step + offset, 0)
        // context.strokeStyle = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
    }
}

const drawWhole = (lines = 100, offset) => {
    const step = canvas.height / lines

    clear()
    context.beginPath()
    drawSpirograph(lines, offset)
    context.strokeStyle = 'purple';
    context.stroke()
    context.closePath()
    if(count<lines*5){
        requestAnimationFrame(_=>drawWhole(lines, (offset - 1)) % step);
        count++;
    } else {
        requestAnimationFrame(_=>drawWhole(lines, (offset + 1)) % step);
        count++;
    }
    // do{
    //     requestAnimationFrame(_=>drawWhole(lines, (offset + 1)) % step);
    //     count++;
    // }while(count < lines);
    // do{
    //     requestAnimationFrame(_=>drawWhole(lines, (offset - 1)) % step);
    //     count--;
    // }while(count > 0);
}

drawWhole(100, 0)