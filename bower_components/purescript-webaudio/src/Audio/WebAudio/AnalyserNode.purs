module Audio.WebAudio.AnalyserNode where

import Control.Monad.Eff
import Audio.WebAudio.Types
import Data.Foreign.OOFFI

instance audioNodeAnalyserNode :: AudioNode AnalyserNode

{- Getters/Setters for all AnalyserNode properties -}

setFftSize :: forall wau eff. AnalyserNode -> Number -> Eff (wau :: WebAudio | eff) Number
setFftSize = setter "fftSize"

getFftSize :: forall wau eff. AnalyserNode -> Eff (wau :: WebAudio | eff) Number
getFftSize = getter "fftSize"

getFrequencyBinCount :: forall wau eff. AnalyserNode -> Eff (wau :: WebAudio | eff) Number
getFrequencyBinCount = getter "frequencyBinCount"

setMaxDecibels :: forall wau eff. AnalyserNode -> Number -> Eff (wau :: WebAudio | eff) Number
setMaxDecibels = setter "maxDecibels"

getMaxDecibels :: forall wau eff. AnalyserNode -> Eff (wau :: WebAudio | eff) Number
getMaxDecibels = getter "maxDecibels"

setMinDecibels :: forall wau eff. AnalyserNode -> Number -> Eff (wau :: WebAudio | eff) Number
setMinDecibels = setter "MinDecibels"

getMinDecibels :: forall wau eff. AnalyserNode -> Eff (wau :: WebAudio | eff) Number
getMinDecibels = getter "minDecibels"

setSmoothingTimeConstant :: forall wau eff. AnalyserNode -> Number -> Eff (wau :: WebAudio | eff) Number
setSmoothingTimeConstant = setter "smoothingTimeConstant"

getSmoothingTimeConstant :: forall wau eff. AnalyserNode -> Eff (wau :: WebAudio | eff) Number
getSmoothingTimeConstant = getter "smoothingTimeConstant"

getByteFrequencyData :: forall eff. AnalyserNode -> Eff (wau :: WebAudio | eff) [Number]
getByteFrequencyData = method0Eff "getByteFrequencyData"

getFloatFrequencyData :: forall eff. AnalyserNode -> Eff (wau :: WebAudio | eff) [Number]
getFloatFrequencyData = method0Eff "getFloatFrequencyData"

getFloatTimeDomainData :: forall eff. AnalyserNode -> Eff (wau :: WebAudio | eff) [Number]
getFloatTimeDomainData = method0Eff "getFloatTimeDomainData"

foreign import getByteTimeDomainData
"""
function getByteTimeDomainData (analyser) {
    return function () {
        var bufferLength = analyser.frequencyBinCount,
            dataArray = new Uint8Array(bufferLength);

        analyser.getByteTimeDomainData(dataArray);
        return dataArray;
    };
};
""" :: forall eff. AnalyserNode -> Eff (wau :: WebAudio | eff) [Number]