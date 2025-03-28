let clicks = 0;
let perClick = 1;
let power = 0; // Combined power from all upgrades
let clickPowerCost = 10;
let autoClickerCost = 50;
let luckyCharmCost = 100;
let tomTomDrumCost = 200;
let rhythmMasterCost = 500;
let goldenTomCost = 1000;

let autoClickers = 0;
let luckyMultiplier = 1;
let drumBoost = 0;
let rhythmBonus = 0;
let goldenMultiplier = 1;

const clicksDisplay = document.getElementById('clicks');
const perClickDisplay = document.getElementById('perClick');
const powerDisplay = document.getElementById('power');
const clickBtn = document.getElementById('clickBtn');
const clickPowerBtn = document.getElementById('clickPowerBtn');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const luckyCharmBtn = document.getElementById('luckyCharmBtn');
const tomTomDrumBtn = document.getElementById('tomTomDrumBtn');
const rhythmMasterBtn = document.getElementById('rhythmMasterBtn');
const goldenTomBtn = document.getElementById('goldenTomBtn');
const message = document.getElementById('message');

// Click handler
clickBtn.addEventListener('click', () => {
    let clickValue = Math.floor(perClick * luckyMultiplier * goldenMultiplier + drumBoost + rhythmBonus);
    clicks += clickValue;
    updateDisplay();
    showMessage(`+${clickValue} clicks!`);
});

// Upgrade handlers
clickPowerBtn.addEventListener('click', () => buyUpgrade('clickPower', clickPowerCost, () => {
    perClick *= 2;
    clickPowerCost *= 3;
    showMessage('Click power doubled!');
}));

autoClickerBtn.addEventListener('click', () => buyUpgrade('autoClicker', autoClickerCost, () => {
    autoClickers++;
    autoClickerCost *= 2;
    showMessage('Auto-clicker added!');
}));

luckyCharmBtn.addEventListener('click', () => buyUpgrade('luckyCharm', luckyCharmCost, () => {
    luckyMultiplier += 0.1;
    luckyCharmCost *= 2.5;
    showMessage('Luck increased!');
}));

tomTomDrumBtn.addEventListener('click', () => buyUpgrade('tomTomDrum', tomTomDrumCost, () => {
    drumBoost += 5;
    tomTomDrumCost *= 2;
    showMessage('Drum boost added!');
}));

rhythmMasterBtn.addEventListener('click', () => buyUpgrade('rhythmMaster', rhythmMasterCost, () => {
    rhythmBonus += 10;
    rhythmMasterCost *= 3;
    showMessage('Rhythm mastery improved!');
}));

goldenTomBtn.addEventListener('click', () => buyUpgrade('goldenTom', goldenTomCost, () => {
    goldenMultiplier += 0.5;
    goldenTomCost *= 4;
    showMessage('Golden Tom power unleashed!');
}));

// Auto-clicker loop
setInterval(() => {
    if (autoClickers > 0) {
        let autoValue = Math.floor(autoClickers * perClick * luckyMultiplier * goldenMultiplier + drumBoost + rhythmBonus);
        clicks += autoValue;
        updateDisplay();
    }
}, 1000);

// Generic buy upgrade function
function buyUpgrade(type, cost, callback) {
    if (clicks >= cost) {
        clicks -= cost;
        callback();
        updateDisplay();
    } else {
        showMessage(`Not enough clicks for ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}!`);
    }
}

function updateDisplay() {
    clicksDisplay.textContent = clicks;
    perClickDisplay.textContent = perClick;
    powerDisplay.textContent = Math.floor(autoClickers + (luckyMultiplier-1)*10 + drumBoost/5 + rhythmBonus/10 + (goldenMultiplier-1)*2);
    document.getElementById('clickPowerCost').textContent = clickPowerCost;
    document.getElementById('autoClickerCost').textContent = autoClickerCost;
    document.getElementById('luckyCharmCost').textContent = Math.floor(luckyCharmCost);
    document.getElementById('tomTomDrumCost').textContent = tomTomDrumCost;
    document.getElementById('rhythmMasterCost').textContent = rhythmMasterCost;
    document.getElementById('goldenTomCost').textContent = goldenTomCost;
    
    clickPowerBtn.disabled = clicks < clickPowerCost;
    autoClickerBtn.disabled = clicks < autoClickerCost;
    luckyCharmBtn.disabled = clicks < luckyCharmCost;
    tomTomDrumBtn.disabled = clicks < tomTomDrumCost;
    rhythmMasterBtn.disabled = clicks < rhythmMasterCost;
    goldenTomBtn.disabled = clicks < goldenTomCost;
}

function showMessage(text) {
    message.textContent = text;
    setTimeout(() => message.textContent = '', 2000);
}

// Initial display
updateDisplay();
