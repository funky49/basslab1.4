// Updated script.js

let audioContext;
let oscillator;
let gainNode;
let frequencyKnob = document.getElementById('frequencyKnob');
let mmDropButton = document.getElementById('MMMDROP');
let warningButton = document.getElementById('warningButton');
let frequencyDisplay = document.getElementById('frequencyDisplay');

function setup() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.frequency.value = 90;
    gainNode.gain.value = 1;
    gainNode.connect(audioContext.destination);

    frequencyKnob.min = 25;
    frequencyKnob.max = 55;
    frequencyKnob.value = 25; // Default value
    frequencyKnob.addEventListener('input', updateFrequencyDisplay);
    frequencyKnob.addEventListener('change', playSineWave);

    mmDropButton.addEventListener('click', playBassDrop);
    warningButton.addEventListener('click', function() {
        location.reload();
    });
}

function playSineWave() {
    if (oscillator) {
        oscillator.stop();
    }
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequencyKnob.value, audioContext.currentTime);
    oscillator.connect(gainNode);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 9);
}

function updateFrequencyDisplay() {
    frequencyDisplay.innerText = frequencyKnob.value + ' Hz';
}

function playBassDrop() {
    gainNode.frequency.linearRampToValueAtTime(20, audioContext.currentTime + 9);
    oscillator.stop(audioContext.currentTime + 9);
    gainNode.frequency.linearRampToValueAtTime(90, audioContext.currentTime + 18);
}

setup();