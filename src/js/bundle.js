(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Ben/projects/webaudio/src/js/simple.js":[function(require,module,exports){
var WIDTH = window.innerWidth, HEIGHT = window.innerHeight,
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

    getDocumentScroll,
    canvasDraw,
    random,
    updatePage;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Set up
oscillator.connect(gain);
gain.connect(audioCtx.destination);

oscillator.type = 0; // Sine wave
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

canvasDraw = function () {
    var rx = coordinates.x,
        ry = coordinates.y,
        rc = Math.floor(30 * gain.gain.value/maxVol);

    canvasCtx.globalAlpha = 0.2;

    for(i=1;i<=15;i=i+2) {
        canvasCtx.beginPath();
        canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gain.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
        canvasCtx.arc(rx+random(0,50),ry+random(0,50),rc/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
        canvasCtx.fill();
        canvasCtx.closePath();
    }
};

updatePage = function (e) {
    coordinates.x = (window.Event) ? e.pageX : event.clientX + getDocumentScroll('Left');
    coordinates.y = (window.Event) ? e.pageY : event.clientY + getDocumentScroll('Top');

    oscillator.frequency.value = (coordinates.x/WIDTH) * maxFreq;
    gain.gain.value = (coordinates.y/HEIGHT) * maxVol;

    canvasDraw();
};

document.onmousemove = updatePage;
},{}]},{},["/Users/Ben/projects/webaudio/src/js/simple.js"]);
