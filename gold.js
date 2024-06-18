let totalGoldValue = 0;

// Gold values for each stat
const goldValues = {
    "AD": 15,
    "AH": 20,
    "AP": 21.75,
    "Armor": 18,
    "MR": 18,
    "HP": 2.67,
    "MP": 1.25,
    "HPR": 6,
    "MPR": 6,
    "CritChance": 40,
    "CritDamage": 35,
    "AS": 25,
    "MS": 15,
    "PMS": 50,
    "LifeSteal": 50,
    "OmniV": 40,
    "ArmorPen": 40,
    "Lethality": 29,
    "MagicPen": 20,
    "PMagicPen": 50,
    "HnSPower": 30
};

// Add event listener to the select element
document.getElementById('mySelect').addEventListener('change', (event) => {
    selectedCategory = event.target.value;
    console.log('Selected category:', selectedCategory); // Log the selected category for debugging
});

// Add event listener to the button to handle the input
document.getElementById('enterStat').addEventListener('click', () => {
    const statValue = document.getElementById('statInput').value;
    if (statValue && !isNaN(statValue)) {
        const statAmount = parseFloat(statValue);
        const statGoldValue = goldValues[selectedCategory] * statAmount;
        totalGoldValue += statGoldValue;
        
        // Display the result
        document.getElementById('totalGold').innerText = `Total Gold Value: ${totalGoldValue}`;

        console.log('Stat entered for', selectedCategory + ':', statAmount, 'Gold value:', statGoldValue);
    } else {
        console.log('Please enter a valid number for the stat value.');
    }
});
