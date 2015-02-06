module Main where

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

main :: forall eff. Eff (wau :: WebAudio, dom :: DOM, canvas :: Graphics.Canvas.Canvas | eff) Unit
main = do

  canvas <- getCanvasElementById "canvas"
  canvasCtx <- getContext2D canvas

  runCanvas canvas canvasCtx

  ctx <- makeAudioContext
  osc <- createOscillator ctx
  setOscillatorType Sine osc
  startOscillator 0.0 osc
  connect osc =<< destination ctx
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

freqAt t
    | t < 1 = 440
    | t < 2 = 880
    | otherwise = freqAt $ t - 2
