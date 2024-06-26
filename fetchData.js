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
    "mp": 1.4,         // MP
    "movespeed": 12,    // MS
    "armor": 20,        // Armor
    "spellblock": 18,   // MR
    "attackrange": 0,   // No gold value specified for AttackRange
    "hpregen": 3,       // HPR
    "mpregen": 5,       // MPR
    "crit": 40,         // CritChance
    "attackdamage": 35, // AD
    "attackspeed": 30   // AS
};//lack of ap bcs no champ has any

function displayChampionStats(champion) { 
    const stats = champion.stats;
    let totalGoldValueWithMSAndMP = 0;
    let totalGoldValueWithoutMS = 0;
    let totalGoldValueWithoutMSAndMP = 0;

    for (const [stat, value] of Object.entries(stats)) {
        if (statMapping.hasOwnProperty(stat)) {
            totalGoldValueWithMSAndMP += value * statMapping[stat];
            if (stat !== "movespeed") {
                totalGoldValueWithoutMS += value * statMapping[stat];
            }
            if (stat !== "movespeed" && stat !== "mp" && stat !== "mpregen") {
                totalGoldValueWithoutMSAndMP += value * statMapping[stat];
            }
        }
    }
    // Format the gold values to one decimal place
    totalGoldValueWithMSAndMP = totalGoldValueWithMSAndMP.toFixed(1);
    totalGoldValueWithoutMS = totalGoldValueWithoutMS.toFixed(1);
    totalGoldValueWithoutMSAndMP = totalGoldValueWithoutMSAndMP.toFixed(1);

    resultCDiv.innerHTML = '';
    let champDiv = document.createElement('div');
    champDiv.className = 'champion';
    champDiv.innerHTML = `<h1>${champion.name}</h1>
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
                          Total Gold Value Level 1 : ${totalGoldValueWithMSAndMP}<br>
                          Total Gold Value Level 1 (without MS): ${totalGoldValueWithoutMS}<br>
                          Total Gold Value Level 1 (without MS and MP): ${totalGoldValueWithoutMSAndMP}`;

    resultCDiv.appendChild(champDiv);
}
    function displayItemStats(item) {//this is the output
        resultItemDiv.innerHTML = '';
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `<h1>${item.name}</h1>
                            <br>
                            ${item.gold.total} Gold 
                            <p>${item.description}</p>`;
        resultItemDiv.appendChild(itemDiv);
    }
});
//lack of internet connection or the api shutting down you will receive failed to fetch as a responce