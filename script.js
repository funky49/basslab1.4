const piano = document.getElementById('piano');
const keys = document.querySelectorAll('[data-frequency]');
const durationInput = document.getElementById('note-duration'); // Get the duration input field

// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Track the currently playing oscillator and gain node
let currentOscillator = null;
let currentGainNode = null;

// Function to play a note
function playNote(frequency) {
    // Get the duration from the input field
    const duration = parseFloat(durationInput.value) || 1; // Default to 1 second if invalid

    // Stop the currently playing note, if any
    stopNote();

    // Create a new oscillator and gain node
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);

    // Save the current oscillator and gain node
    currentOscillator = oscillator;
    currentGainNode = gainNode;

    oscillator.start();

    // Stop the note after the specified duration
    setTimeout(() => {
        stopNote();
    }, duration * 1000); // Convert seconds to milliseconds
}

// Function to stop the currently playing note with fade-out
function stopNote() {
    if (currentOscillator && currentGainNode) {
        const fadeOutDuration = 0.2; // Duration of the fade-out in seconds
        const currentTime = audioContext.currentTime;

        // Gradually reduce the gain to 0 over the fade-out duration
        currentGainNode.gain.setValueAtTime(currentGainNode.gain.value, currentTime); // Start from the current gain value
        currentGainNode.gain.linearRampToValueAtTime(0, currentTime + fadeOutDuration);

        // Stop the oscillator after the fade-out duration
        setTimeout(() => {
            currentOscillator.stop();
            currentOscillator.disconnect();
            currentGainNode.disconnect();

            // Reset the oscillator and gain node
            currentOscillator = null;
            currentGainNode = null;
        }, fadeOutDuration * 1000); // Convert seconds to milliseconds
    }
}

// Event listeners for key clicks
keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        playNote(parseFloat(key.dataset.frequency)); // Play the note for the duration specified
        key.classList.add('active');

        // Automatically remove the "active" class after the duration
        const duration = parseFloat(durationInput.value) || 1;
        setTimeout(() => {
            key.classList.remove('active');
        }, duration * 1000);
    });

    // Remove the "active" class if the mouse leaves the key
    key.addEventListener('mouseleave', () => {
        key.classList.remove('active');
    });
});

// Event listeners for key presses (keyboard)
document.addEventListener('keydown', (event) => {
    const keyMap = {
        '1': 20,
        'q': 22,
        '2': 24,
        'w': 25.95,
        '3': 27.50,
        'e': 29.13,
        '4': 30.87,
        'r': 32.70,
        '5': 34.65,
        't': 36.71,
        '6': 38.89,
        'y': 41.20,
        '7': 43.65,
        'u': 46.25,
        '8': 49.00,
        'i': 51.91,
        '9': 55.00,
        'o': 58.27,
        '0': 61.74,
        'p': 65.41,
        'z': 69.30,
        'x': 73.42,
        'c': 77.78,
        'v': 80.00,
    };

    if (keyMap[event.key]) {
        playNote(keyMap[event.key]);
        const visualKey = document.querySelector(`[data-frequency="${keyMap[event.key]}"]`);
        if (visualKey) {
            visualKey.classList.add('active');

            // Automatically remove the "active" class after the duration
            const duration = parseFloat(durationInput.value) || 1;
            setTimeout(() => {
                visualKey.classList.remove('active');
            }, duration * 1000);
        }
    }
});

document.addEventListener('keyup', (event) => {
    const keyMap = {
        '1': 20,
        'q': 22,
        '2': 24,
        'w': 25.95,
        '3': 27.50,
        'e': 29.13,
        '4': 30.87,
        'r': 32.70,
        '5': 34.65,
        't': 36.71,
        '6': 38.89,
        'y': 41.20,
        '7': 43.65,
        'u': 46.25,
        '8': 49.00,
        'i': 51.91,
        '9': 55.00,
        'o': 58.27,
        '0': 61.74,
        'p': 65.41,
        'z': 69.30,
        'x': 73.42,
        'c': 77.78,
        'v': 80.00,
    };
    if (keyMap[event.key]) {
        stopNote();
        const visualKey = document.querySelector(`[data-frequency="${keyMap[event.key]}"]`);
        if (visualKey) {
            visualKey.classList.remove('active');
        }
    }
});