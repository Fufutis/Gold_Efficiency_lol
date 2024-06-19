document.addEventListener("DOMContentLoaded", () => {//after html is loaded this function is called
    const fetchChampionButton = document.getElementById('fetchChampion');
    const championNameInput = document.getElementById('championName');
    const fetchItemButton = document.getElementById('fetchItem');
    const itemNameInput = document.getElementById('itemName');
    const resultCDiv = document.getElementById('resultC');
    const resultItemDiv = document.getElementById('resultItems');

    fetchChampionButton.addEventListener('click', () => {//The BUTTON is clicked
        const championName = championNameInput.value.trim();
        if (championName) {
            fetchChampionStats(championName);
        }
    });

    fetchItemButton.addEventListener('click', () => {//The BUTTON is clicked
        const itemName = itemNameInput.value.trim().toLowerCase();
        if (itemName) {
            fetchItemStats(itemName);
        }
    });

    async function fetchChampionStats(championName) {//The DATA is preped here
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion/${championName}.json`);
            if (!response.ok) {
                throw new Error(`Champion ${championName} not found`);
            }
            const data = await response.json();
            displayChampionStats(data.data[championName]);
        } catch (error) {
            resultCDiv.innerHTML = `<p>${error.message}</p>`;
        }
    }

    async function fetchItemStats(itemName) {//The DATA is preped here
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/item.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch item data`);
            }
            const data = await response.json();
            const items = data.data;

            const item = Object.values(items).find(item => item.name.toLowerCase() === itemName);
            if (!item) {
                throw new Error(`Item ${itemName} not found`);
            }

            displayItemStats(item);
        } catch (error) {
            resultItemDiv.innerHTML = `<p>${error.message}</p>`;
        }
    }
const statMapping = {
    "hp": 2.67,         // HP
    "mp": 1.25,         // MP
    "movespeed": 15,    // MS
    "armor": 18,        // Armor
    "spellblock": 18,   // MR
    "attackrange": 0,   // No gold value specified for AttackRange
    "hpregen": 6,       // HPR
    "mpregen": 6,       // MPR
    "crit": 40,         // CritChance
    "attackdamage": 15, // AD
    "attackspeed": 25   // AS
};

function displayChampionStats(champion) { 
    const stats = champion.stats;
    let totalGoldValue = 0;

    for (const [stat, value] of Object.entries(stats)) {
        if (statMapping.hasOwnProperty(stat)) {
            totalGoldValue += value * statMapping[stat];
        }
    }

    resultCDiv.innerHTML = '';
    let champDiv = document.createElement('div');
    champDiv.className = 'champion';
    champDiv.innerHTML = `<h2>${champion.name}</h2>
                          <p>${champion.title}</p>
                          HP: ${stats.hp}<br>
                          HP per Level: ${stats.hpperlevel}<br>
                          MP: ${stats.mp}<br>
                          MP per Level: ${stats.mpperlevel}<br>
                          Move Speed: ${stats.movespeed}<br>
                          Armor: ${stats.armor}<br>
                          Armor per Level: ${stats.armorperlevel}<br>
                          Spell Block: ${stats.spellblock}<br>
                          Spell Block per Level: ${stats.spellblockperlevel}<br>
                          Attack Range: ${stats.attackrange}<br>
                          HP Regen: ${stats.hpregen}<br>
                          HP Regen per Level: ${stats.hpregenperlevel}<br>
                          MP Regen: ${stats.mpregen}<br>
                          MP Regen per Level: ${stats.mpregenperlevel}<br>
                          Crit: ${stats.crit}<br>
                          Crit per Level: ${stats.critperlevel}<br>
                          Attack Damage: ${stats.attackdamage}<br>
                          Attack Damage per Level: ${stats.attackdamageperlevel}<br>
                          Attack Speed per Level: ${stats.attackspeedperlevel}<br>
                          Attack Speed: ${stats.attackspeed}<br>
                          <br>
                          Total Gold Value Level 1: ${totalGoldValue}`;

    resultCDiv.appendChild(champDiv);
}
    function displayItemStats(item) {//this is the output
        resultItemDiv.innerHTML = '';
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `<h2>${item.name}</h2>
                            <br>
                            ${item.gold.total} Gold 
                            <p>${item.description}</p>`;
        resultItemDiv.appendChild(itemDiv);
    }
});
