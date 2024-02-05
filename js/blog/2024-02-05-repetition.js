let toggleValue = 0;

function toggle() {
    toggleValue = 1 - toggleValue; // Flips between 0 and 1
    document.getElementById("toggleBox").textContent = toggleValue;
    clearBoxes();
}

function clearBoxes() {
    document.querySelectorAll(".outputBox").forEach(box => {
        box.textContent = '';
    });
    document.querySelectorAll(".noiseBox").forEach(box => {
        box.textContent = '';
    });
    document.querySelectorAll(".conditionalBox").forEach(box => {
        box.textContent = '';
    });
    document.getElementById("decodeBox").textContent = '';
}

function populateBoxes() {
    document.querySelectorAll(".outputBox").forEach(box => {
        box.textContent = toggleValue;
    });
    updateConditionalBoxes();
}

function generateNoise() {
    document.querySelectorAll(".noiseBox").forEach(box => {
        if (Math.random() < 0.5) { // Adjust probability as needed
            box.textContent = '⚡'; // Lightning bolt emoji
        } else {
            box.textContent = '';
        }
    });
    updateConditionalBoxes();
    document.getElementById("decodeBox").textContent = '';
}

function updateConditionalBoxes() {
    for (let i = 1; i <= 3; i++) {
        let populatedValue = Number(document.getElementById(`box${i}`).textContent);
        let noiseValue = document.getElementById(`noiseBox${i}`).textContent;
        let conditionalValue = (noiseValue === '⚡') ? (1 - populatedValue) : populatedValue;
        document.getElementById(`conditionalBox${i}`).textContent = conditionalValue;
    }
}

function decode() {
    let conditionalSum = 0;
    for (let i = 1; i <= 3; i++) {
        conditionalSum += Number(document.getElementById(`conditionalBox${i}`).textContent);
    }
    if (conditionalSum >= 2) {
        document.getElementById("decodeBox").textContent = 1;
    } else {
        document.getElementById("decodeBox").textContent = 0;
    }
}
