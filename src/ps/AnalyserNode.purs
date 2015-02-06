module AnalyserNode where

import Control.Monad.Eff
import Audio.WebAudio.Types

instance audioNodeAnalyserNode :: AudioNode AnalyserNode

foreign import fftSize
"""
function fftSize (node) {
    return function () {
        return node.fftSize;
    }
}
""" :: forall wau eff. AnalyserNode -> Eff (wau :: WebAudio | eff) AudioParam