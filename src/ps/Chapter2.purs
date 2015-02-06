module Chapter2 where

import Debug.Trace
import Math

diagonal w h = sqrt (w * w + h * h)

main = print (diagonal 3 4)