// From https://medium.com/javascript-in-plain-english/how-to-detect-a-sequence-of-keystrokes-in-javascript-83ec6ffd8e93

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const options = {
    eventType: "keydown",
    keystrokeDelay: 1000
  };

  keyMapper([updateBackground, updateUI], options);
});

function keyMapper(callbackList, options) {
  const delay =
    options.hasOwnProperty("keystrokeDelay") &&
    options.keystrokeDelay >= 300 &&
    options.keystrokeDelay;
  const keystrokeDelay = delay || 1000;
  const eventType =
    (options.hasOwnProperty("eventType") && options.eventType) || "keydown";

  let state = {
    buffer: [],
    lastKeyTime: Date.now()
  };

  document.addEventListener(eventType, event => {
    const key = event.key.toLowerCase();

    let buffer = [];

    const currentTime = Date.now();
    if (currentTime - state.lastKeyTime > keystrokeDelay) {
      buffer = [key];
    } else {
      buffer = [...state.buffer, key];
    }

    state = { buffer: buffer, lastKeyTime: currentTime };

    callbackList.forEach(callback => callback(buffer));
  });
}

function updateBackground(keySequence) {
  const validKeys = keySequence.every(
    key => !isNaN(parseInt(key)) || key.toLowerCase() !== key.toUpperCase()
  );
  if (!validKeys) return;
  const container = document.querySelector("#background");
  container.style.backgroundImage = `url(images/${keySequence.join("")}.jpg)`;
}

function updateUI(keySequence) {
  const userInput = keySequence.join("").toLowerCase();
  const keySequences = {
    idfa: "All Weapons + Ammo",
    idkfa: "All Weapons + Ammo + Keys",
    idbeholds: "Beserk Pack",
    idclev31: "Bonus Level"
  };
  const userInputDisplay = document.querySelector("#user_input");
  userInputDisplay.textContent = userInput;

  const cheatMessage = document.querySelector("#cheat_message");
  cheatMessage.textContent = keySequences[userInput] || "Nothing";
}
