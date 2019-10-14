const canvas = document.getElementById('mycanvas')
const context = canvas.getContext('2d')

const clear = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
}

const drawSpirograph = (lines = 100, offset) => {
    const step = canvas.height / lines
    const {width: w, height: h} = canvas

    for (let i = -step; i < h; i += step) {
        context.moveTo(i + step + offset, 0)
        context.lineTo(w, i + step + offset)

        context.lineTo(0, h - i - step - offset)
        context.lineTo(i + step + offset, 0)
        context.strokeStyle = 'purple'; //creates random flashing colours
        // context.strokeStyle = `rgb(${normaliseForRGB(i)}, ${normaliseForRGB(h)}, ${normaliseForRGB(h)}`; //creates random flashing colours
        // context.strokeStyle = `rgb()`
    }
    for (let i = -step; i < h; i += step) {
    context.lineTo(w - i - step - offset, h)
    }
}
// takes a number, and returns a number between 0 and 255
function normaliseForRGB(x) {
    return x * 100 % 255;
}

const drawWhole = (lines = 100, offset) => {
    const step = canvas.height / lines

    clear()
    context.beginPath()
    drawSpirograph(lines, offset)
    // context.strokeStyle = 'purple';
    context.stroke()
    context.closePath()
    requestAnimationFrame(_=>drawWhole(lines, (offset + 1)) % step)
}

drawWhole(50, 0)