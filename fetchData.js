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

    function displayChampionStats(champion) { //the output
        resultCDiv.innerHTML = '';
        let champDiv = document.createElement('div');
        champDiv.className = 'champion';
        champDiv.innerHTML = `<h2>${champion.name}</h2>
                              <p>${champion.title}</p>
                              <p>HP: ${champion.stats.hp}</p>
                              <p>HP per Level: ${champion.stats.hpperlevel}</p>
                              <p>MP: ${champion.stats.mp}</p>
                              <p>MP per Level: ${champion.stats.mpperlevel}</p>
                              <p>Move Speed: ${champion.stats.movespeed}</p>
                              <p>Armor: ${champion.stats.armor}</p>
                              <p>Armor per Level: ${champion.stats.armorperlevel}</p>
                              <p>Spell Block: ${champion.stats.spellblock}</p>
                              <p>Spell Block per Level: ${champion.stats.spellblockperlevel}</p>
                              <p>Attack Range: ${champion.stats.attackrange}</p>
                              <p>HP Regen: ${champion.stats.hpregen}</p>
                              <p>HP Regen per Level: ${champion.stats.hpregenperlevel}</p>
                              <p>MP Regen: ${champion.stats.mpregen}</p>
                              <p>MP Regen per Level: ${champion.stats.mpregenperlevel}</p>
                              <p>Crit: ${champion.stats.crit}</p>
                              <p>Crit per Level: ${champion.stats.critperlevel}</p>
                              <p>Attack Damage: ${champion.stats.attackdamage}</p>
                              <p>Attack Damage per Level: ${champion.stats.attackdamageperlevel}</p>
                              <p>Attack Speed per Level: ${champion.stats.attackspeedperlevel}</p>
                              <p>Attack Speed: ${champion.stats.attackspeed}</p>`;
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
