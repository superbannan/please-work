let clicks = 0;
let bonus = 0; // Total bonus from upgrades
let power = 0; // Visual indicator of upgrade strength
let clickBoostCost = 10;
let autoClickerCost = 50;
let drumRollCost = 100;
let tomFrenzyCost = 250;
let beatMasterCost = 500;

let autoClickers = 0;
let clickBoostLevel = 0;
let drumRollBonus = 0;
let frenzyMultiplier = 1;
let beatMasterBonus = 0;

const clicksDisplay = document.getElementById('clicks');
const bonusDisplay = document.getElementById('bonus');
const powerDisplay = document.getElementById('power');
const clickBtn = document.getElementById('clickBtn');
const clickBoostBtn = document.getElementById('clickBoostBtn');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const drumRollBtn = document.getElementById('drumRollBtn');
const tomFrenzyBtn = document.getElementById('tomFrenzyBtn');
const beatMasterBtn = document.getElementById('beatMasterBtn');
const message = document.getElementById('message');

// Click handler - always adds 1 base click plus bonus
clickBtn.addEventListener('click', () => {
    let totalClick = 1 + bonus; // Base 1 click + bonus
    clicks += totalClick;
    updateDisplay();
    showMessage(`+${totalClick} clicks!`);
});

// Upgrade handlers
clickBoostBtn.addEventListener('click', () => buyUpgrade(clickBoostCost, () => {
    clickBoostLevel++;
    bonus += 1; // +1 per click
    clickBoostCost *= 2;
    showMessage('Click boost increased!');
}));

autoClickerBtn.addEventListener('click', () => buyUpgrade(autoClickerCost, () => {
    autoClickers++;
    autoClickerCost *= 2;
    showMessage('Auto-clicker added!');
}));

drumRollBtn.addEventListener('click', () => buyUpgrade(drumRollCost, () => {
    drumRollBonus += 2;
    bonus += 2;
    drumRollCost *= 2.5;
    showMessage('Drum roll bonus added!');
}));

tomFrenzyBtn.addEventListener('click', () => buyUpgrade(tomFrenzyCost, () => {
    frenzyMultiplier += 0.5;
    bonus = Math.floor(bonus * 1.5); // 50% bonus to existing bonus
    tomFrenzyCost *= 3;
    showMessage('Tom frenzy activated!');
}));

beatMasterBtn.addEventListener('click', () => buyUpgrade(beatMasterCost, () => {
    beatMasterBonus += 5;
    bonus += 5;
    beatMasterCost *= 2;
    showMessage('Beat master power gained!');
}));

// Auto-clicker loop
setInterval(() => {
    if (autoClickers > 0) {
        let autoValue = autoClickers * (1 + bonus); // 1 base + bonus per auto-clicker
        clicks += autoValue;
        updateDisplay();
    }
}, 1000);

// Generic buy upgrade function
function buyUpgrade(cost, callback) {
    if (clicks >= cost) {
        clicks -= cost;
        callback();
        updateDisplay();
    } else {
        showMessage('Not enough clicks!');
    }
}

function updateDisplay() {
    clicksDisplay.textContent = clicks;
    bonusDisplay.textContent = bonus;
    powerDisplay.textContent = autoClickers + clickBoostLevel + Math.floor(drumRollBonus/2) + Math.floor((frenzyMultiplier-1)*2) + Math.floor(beatMasterBonus/5);
    document.getElementById('clickBoostCost').textContent = clickBoostCost;
    document.getElementById('autoClickerCost').textContent = autoClickerCost;
    document.getElementById('drumRollCost').textContent = drumRollCost;
    document.getElementById('tomFrenzyCost').textContent = tomFrenzyCost;
    document.getElementById('beatMasterCost').textContent = beatMasterCost;
    
    clickBoostBtn.disabled = clicks < clickBoostCost;
    autoClickerBtn.disabled = clicks < autoClickerCost;
    drumRollBtn.disabled = clicks < drumRollCost;
    tomFrenzyBtn.disabled = clicks < tomFrenzyCost;
    beatMasterBtn.disabled = clicks < beatMasterCost;
}

function showMessage(text) {
    message.textContent = text;
    setTimeout(() => message.textContent = '', 2000);
}

// Initial display
updateDisplay();
