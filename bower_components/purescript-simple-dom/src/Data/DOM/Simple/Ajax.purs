module Data.DOM.Simple.Ajax where

import Control.Monad.Eff
import Data.DOM.Simple.Types

foreign import makeXMLHttpRequest
  "function makeXMLHttpRequest() {  \
  \  return new XMLHttpRequest();   \
  \}" :: forall eff. (Eff (dom :: DOM | eff) XMLHttpRequest)

foreign import open
  "function open(method) {                \
  \  return function(url) {               \
  \    return function (obj) {            \
  \      return function () {             \
  \         obj.open(method, url);        \
  \      };                               \
  \    };                                 \
  \  };                                   \
  \}" :: forall eff. String -> String -> XMLHttpRequest -> (Eff (dom :: DOM | eff) Unit)

foreign import openAsync
  "function openAsync(method) {           \
  \  return function(url) {               \
  \    return function (obj) {            \
  \      return function () {             \
  \         obj.open(method, url, true);  \
  \      };                               \
  \    };                                 \
  \  };                                   \
  \}" :: forall eff. String -> String -> XMLHttpRequest -> (Eff (dom :: DOM | eff) Unit)

foreign import setResponseType
  "function setResponseType(typ) {        \
  \  return function(obj) {               \
  \    return function() {                \
  \      return obj.responseType = typ;   \
  \    };                                 \
  \  };                                   \
  \}" :: forall eff. String -> XMLHttpRequest -> (Eff (dom :: DOM | eff) Unit)

foreign import responseType
  "function responseType(obj) {      \
  \  return function() {             \
  \    return obj.responseType;      \
  \  };                              \
  \}" :: forall eff. XMLHttpRequest -> (Eff (dom :: DOM | eff) String)

foreign import send
  "function send(obj) {     \
  \  return function () {   \
  \    obj.send();          \
  \  };                     \
  \}" :: forall eff. XMLHttpRequest -> (Eff (dom :: DOM | eff) Unit)

foreign import sendWithPayload
  "function sendWithPayload(payload) {  \
  \  return function (obj) {            \
  \    return function () {             \
  \      obj.send(payload);             \
  \    };                               \
  \  };                                 \
  \}" :: forall eff a. a -> XMLHttpRequest -> (Eff (dom :: DOM | eff) Unit)

foreign import response
  "function response(obj) {         \
  \    return function () {         \
  \      return obj.response;       \
  \  };                             \
  \}" :: forall obj eff. XMLHttpRequest -> (Eff (dom :: DOM | eff) obj)

foreign import responseText
  "function responseText(obj) {         \
  \    return function () {             \
  \      return obj.responseText;       \
  \  };                                 \
  \}" :: forall eff. XMLHttpRequest -> (Eff (dom :: DOM | eff) String)

foreign import statusText
  "function statusText(obj) {         \
  \    return function () {           \
  \      return obj.statusText;       \
  \  };                               \
  \}" :: forall eff. XMLHttpRequest -> (Eff (dom :: DOM | eff) String)

foreign import setRequestHeader
  "function setRequestHeader(key) {           \
  \   return function (value) {               \
  \     return function (obj) {               \
  \       return function () {                \
  \         obj.setRequestHeader(key, value); \
  \       }                                   \
  \     }                                     \
  \   }                                       \
  \}" :: forall eff. String -> String -> XMLHttpRequest -> (Eff (dom :: DOM | eff) Unit)

foreign import getAllResponseHeaders
  "function getAllResponseHeaders(obj) {     \
  \  return function () {                    \
  \    return obj.getAllResponseHeaders();   \
  \  };                                      \
  \}" :: forall eff. XMLHttpRequest -> (Eff (dom :: DOM | eff) String)

foreign import getResponseHeader
  "function getResponseHeader(key) {        \
  \  return function (obj) {                \
  \    return function () {                 \
  \      return obj.getResponseHeader(key); \
  \    };                                   \
  \  };                                     \
  \}" :: forall eff. String -> XMLHttpRequest -> (Eff (dom :: DOM | eff) String)

foreign import overrideMimeType
  "function overrideMimeType(mime) {        \
  \  return function (obj) {                \
  \    return function () {                 \
  \      return obj.overrideMimeType(mime); \
  \    };                                   \
  \  };                                     \
  \}" :: forall eff. String -> XMLHttpRequest -> (Eff (dom :: DOM | eff) String)
