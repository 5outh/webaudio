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
    analyser = audioCtx.createAnalyser(),

    canvas = document.querySelector('.canvas'),
    canvasCtx = canvas.getContext('2d'),

    mute = document.querySelector('.mute'),

    getDocumentScroll,
    updatePage;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Set up
oscillator.connect(gain);
gain.connect(analyser);
analyser.connect(audioCtx.destination);

oscillator.type = 'square';
oscillator.frequency.value = initialFreq; // Hertz
oscillator.start();

gain.gain.value = initialVol;

getDocumentScroll = function (direction) {
    var scrollDir = 'scroll' + direction;
    return (document.documentElement[scrollDir] ? document.documentElement[scrollDir] : document.body[scrollDir])
};

function draw () {

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    var drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
}

draw();

updatePage = function (e) {
    coordinates.x = (window.Event) ? e.pageX : event.clientX + getDocumentScroll('Left');
    coordinates.y = (window.Event) ? e.pageY : event.clientY + getDocumentScroll('Top');

    oscillator.frequency.value = (coordinates.x/WIDTH) * maxFreq;
    gain.gain.value = (coordinates.y/HEIGHT) * maxVol;
};

mute.onclick = function() {
    if(mute.id == "") {
        gain.disconnect(analyser);
        mute.id = "activated";
        mute.innerHTML = "Unmute";
    } else {
        gain.connect(analyser);
        mute.id = "";
        mute.innerHTML = "Mute";
    }
};

document.onmousemove = updatePage;