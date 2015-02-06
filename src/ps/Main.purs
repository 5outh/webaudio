module Main where

import Debug.Trace

import Control.Bind
import Control.Monad.Eff

import Data.DOM.Simple.Types
import Data.DOM.Simple.Window

import Graphics.Canvas (getCanvasElementById, getContext2D)
import Graphics.Canvas.Free

import Audio.WebAudio.Types
import Audio.WebAudio.AudioContext
import Audio.WebAudio.AudioParam
import Audio.WebAudio.OscillatorNode
import Audio.WebAudio.DestinationNode
import Audio.WebAudio.AnalyserNode
import Audio.WebAudio.GainNode

main :: forall eff. Eff (wau :: WebAudio, dom :: DOM, canvas :: Graphics.Canvas.Canvas, trace :: Debug.Trace.Trace | eff) Unit
main = do

  canvas <- getCanvasElementById "canvas"
  canvasCtx <- getContext2D canvas

  runCanvas canvas canvasCtx

  ctx <- makeAudioContext
  osc <- createOscillator ctx
  gain <- createGain ctx
  analyser <- createAnalyser ctx
  dest <- destination ctx

  draw analyser

  connect osc gain
  connect gain analyser
  connect analyser dest

  setOscillatorType Sine osc
  startOscillator 0.0 osc

  play ctx osc

runCanvas canvas ctx = do
  runGraphics ctx $ do
    setFillStyle "#00FFFF"
    rect { x: 0, y: 0, w: 400, h: 600 }
    fill

play :: forall eff. AudioContext -> OscillatorNode -> Eff (wau :: WebAudio, dom :: DOM | eff) Unit
play ctx osc = void $ setInterval globalWindow 10 update
    where
    update = do
        t  <- currentTime ctx
        frequency osc >>= setValue (freqAt t)
        return unit

-- Placeholder
freqAt _ = 440


draw analyser = do
    setFftSize analyser 2048
    timeDomainData <- getByteTimeDomainData analyser
    -- print timeDomainData
    return unit

{-
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

-}