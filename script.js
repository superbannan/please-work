let clicks = 0;
let perClick = 1;
let autoClickers = 0;

let clickBoostCost = 10;
let autoClickerCost = 50;
let drumRollCost = 100;
let tomFrenzyCost = 250;

const clicksDisplay = document.getElementById('clicks');
const perClickDisplay = document.getElementById('perClick');
const clickBtn = document.getElementById('clickBtn');
const clickBoostBtn = document.getElementById('clickBoostBtn');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const drumRollBtn = document.getElementById('drumRollBtn');
const tomFrenzyBtn = document.getElementById('tomFrenzyBtn');
const message = document.getElementById('message');

// Click handler - increases clicks by perClick amount
clickBtn.addEventListener('click', () => {
    clicks += perClick;
    updateDisplay();
    showMessage(`+${perClick} clicks!`);
});

// Upgrade handlers
clickBoostBtn.addEventListener('click', () => {
    if (clicks >= clickBoostCost) {
        clicks -= clickBoostCost;
        perClick += 1; // Adds 1 to clicks per click
        clickBoostCost = Math.floor(clickBoostCost * 2);
        updateDisplay();
        showMessage('Click boost purchased!');
    } else {
        showMessage('Not enough clicks!');
    }
});

autoClickerBtn.addEventListener('click', () => {
    if (clicks >= autoClickerCost) {
        clicks -= autoClickerCost;
        autoClickers += 1;
        autoClickerCost = Math.floor(autoClickerCost * 2);
        updateDisplay();
        showMessage('Auto-clicker purchased!');
    } else {
        showMessage('Not enough clicks!');
    }
});

drumRollBtn.addEventListener('click', () => {
    if (clicks >= drumRollCost) {
        clicks -= drumRollCost;
        perClick += 5; // Adds 5 to clicks per click
        drumRollCost = Math.floor(drumRollCost * 2.5);
        updateDisplay();
        showMessage('Drum roll purchased!');
    } else {
        showMessage('Not enough clicks!');
    }
});

tomFrenzyBtn.addEventListener('click', () => {
    if (clicks >= tomFrenzyCost) {
        clicks -= tomFrenzyCost;
        perClick *= 2; // Doubles clicks per click
        tomFrenzyCost = Math.floor(tomFrenzyCost * 3);
        updateDisplay();
        showMessage('Tom frenzy purchased!');
    } else {
        showMessage('Not enough clicks!');
    }
});

// Auto-clicker loop
setInterval(() => {
    if (autoClickers > 0) {
        clicks += autoClickers * perClick;
        updateDisplay();
    }
}, 1000); // Runs every second

function updateDisplay() {
    clicksDisplay.textContent = clicks;
    perClickDisplay.textContent = perClick;
    document.getElementById('clickBoostCost').textContent = clickBoostCost;
    document.getElementById('autoClickerCost').textContent = autoClickerCost;
    document.getElementById('drumRollCost').textContent = drumRollCost;
    document.getElementById('tomFrenzyCost').textContent = tomFrenzyCost;

    clickBoostBtn.disabled = clicks < clickBoostCost;
    autoClickerBtn.disabled = clicks < autoClickerCost;
    drumRollBtn.disabled = clicks < drumRollCost;
    tomFrenzyBtn.disabled = clicks < tomFrenzyCost;
}

function showMessage(text) {
    message.textContent = text;
    setTimeout(() => message.textContent = '', 2000);
}

// Initial display
updateDisplay();
