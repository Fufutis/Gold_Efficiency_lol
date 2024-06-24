let totalGoldValue = 0;

// Gold values for each stat
const goldValues = {
    "AD": 35,
    "AH": 50,
    "AP": 20,
    "Armor": 20,
    "MR": 18,
    "HP": 2.67,
    "MP": 1.4,//recheck later 
    "HPR": 3,
    "MPR": 5,
    "CritChance": 40,
    "CritDamage": 35,//calc the value of damage then the rest of items i guess?
    "AS": 30,
    "MS": 12,
    "PMS": 50,//re evaluate
    "LifeSteal": 50,//re evaluate 
    "OmniV": 40,//re evaluate
    "ArmorPen": 40,//re evaluate
    "Lethality": 29,//re evaluate
    "MagicPen": 20,//re evaluate
    "PMagicPen": 50,//re evaluate
    "HnSPower": 30//re evaluate
};
//armor penless team
//can have it its meter?
//it would be one of those 2
//totalhp = ghp * (1 + garmor / 100);
//totalhp = (1+garmor/100);

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
