// Object to store the stats
const stats = {
    AD: 0,
    AH: 0,
    AP: 0,
    Armor: 0,
    MR: 0,
    HP: 0,
    MP: 0,
    HPR: 0,
    MPR: 0,
    CritChance: 0,
    CritDamage: 0,
    AS: 0,
    MS: 0,
    PMS: 0,
    LifeSteal: 0,
    OmniV: 0,
    ArmorPen: 0,
    Lethality: 0,
    MagicPen: 0,
    PMagicPen: 0,
    HnSPower: 0
};

// Function to update the stats display
function updateStatsDisplay(statsDisplay) {
    statsDisplay.innerHTML = '';
    for (let key in stats) {
        statsDisplay.innerHTML += `<p>${key}: ${stats[key]}</p>`;
    }
}

// Function to calculate total value (Example calculation)
function calculateTotalValue() {
    let total = 0;
    for (let key in stats) {
        total += stats[key]; // Replace this with your actual calculation logic
    }
    return total;
}

// Exporting functions to be used in other files
export { stats, updateStatsDisplay, calculateTotalValue };
