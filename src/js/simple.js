var _ = require('lodash'),

    WIDTH = window.innerWidth, HEIGHT = window.innerHeight,
    maxFreq = 6000, maxVol = 1,
    initialFreq = 3000, initialVol = 0.5,
    coordinates = {
        x: 0,
        y: 0
    },

    audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    oscillator = audioCtx.createOscillator(),
    gain = audioCtx.createGain(),

    canvas = document.querySelector('.canvas'),
    canvasCtx = canvas.getContext('2d'),

    mute = document.querySelector('.mute'),

    drawSinWave,
    getDocumentScroll,
    canvasDraw,
    random,
    updatePage;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Set up
oscillator.connect(gain);
gain.connect(audioCtx.destination);

oscillator.type = 'square';
oscillator.frequency.value = initialFreq; // Hertz
oscillator.start();

gain.gain.value = initialVol;

getDocumentScroll = function (direction) {
    var scrollDir = 'scroll' + direction;
    return (document.documentElement[scrollDir] ? document.documentElement[scrollDir] : document.body[scrollDir])
};

random = function (numA, numB) {
    return numA + (Math.floor(Math.random() * (numB - numA)) + 1);
};

drawSinWave = function (canvasContext, frequency, height, offsetX, offsetY) {
    var steps = 200,
        sinLength = WIDTH / frequency,
        sinHeight = HEIGHT / (1 / height * 2),

        step;

    canvasContext.lineTo(offsetX, offsetY);

    _.forEach(_.range(steps), function (i) {
        step = i / steps * (2 * Math.PI);
        canvasContext.lineTo(offsetX + i * sinLength, offsetY + Math.sin(step) * sinHeight);
    });

    // Return the ending place
    return (steps * sinLength) + offsetX;
};

drawSquareWave = function (canvasContext, frequency, height, offsetX, offsetY) {
    var squareLength = 200 * WIDTH / frequency, // Use a scalar
        squareHeight = HEIGHT / (1 / height * 2),

        step;

    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.lineTo(offsetX, offsetY + squareHeight / 2);
    canvasContext.lineTo(offsetX + squareLength / 2, offsetY + squareHeight / 2);
    canvasContext.lineTo(offsetX + squareLength / 2, offsetY - squareHeight / 2);
    canvasContext.lineTo(offsetX + squareLength, offsetY - squareHeight / 2);
    canvasContext.lineTo(offsetX + squareLength, offsetY);

    // Return the ending place
    return squareLength + offsetX;
};

_drawWaves = function (waveDrawer) {
    var offsetX = 0, offsetY = HEIGHT / 2,
        newOffset;

    canvasCtx.clearRect (0, 0, canvas.width, canvas.height );
    canvasCtx.moveTo(offsetX, offsetY);
    canvasCtx.beginPath();

    offsetX = waveDrawer(canvasCtx, oscillator.frequency.value, gain.gain.value, offsetX, offsetY);

    while(offsetX < WIDTH) {
        newOffset = waveDrawer(canvasCtx, oscillator.frequency.value, gain.gain.value, offsetX, offsetY);

        offsetX = newOffset;
    }

    canvasCtx.stroke();
    canvasCtx.closePath();
};

drawSinWaves = function () {
    return _drawWaves(drawSinWave);
};

drawSquareWaves = function () {
    return _drawWaves(drawSquareWave);
};


drawWaves = function (waveType) {
    switch(waveType) {
        case 'sine':
            drawSinWaves(); break;
        case 'square':
            drawSquareWaves(); break;
        default:
            drawSinWaves(); break;
    }
};

updatePage = function (e) {
    coordinates.x = (window.Event) ? e.pageX : event.clientX + getDocumentScroll('Left');
    coordinates.y = (window.Event) ? e.pageY : event.clientY + getDocumentScroll('Top');

    oscillator.frequency.value = (coordinates.x/WIDTH) * maxFreq;
    gain.gain.value = (coordinates.y/HEIGHT) * maxVol;

    drawWaves(oscillator.type);
};

mute.onclick = function() {
    if(mute.id == "") {
        gain.disconnect(audioCtx.destination);
        mute.id = "activated";
        mute.innerHTML = "Unmute";
    } else {
        gain.connect(audioCtx.destination);
        mute.id = "";
        mute.innerHTML = "Mute";
    }
};

document.onmousemove = updatePage;