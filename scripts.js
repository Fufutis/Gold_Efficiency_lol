document.addEventListener("DOMContentLoaded", () => {
    const championStatsDiv = document.getElementById('champion-stats');
    const itemStatsDiv = document.getElementById('item-stats');
    const fetchChampionButton = document.getElementById('fetchChampion');
    const championNameInput = document.getElementById('championName');
    const fetchItemButton = document.getElementById('fetchItem');
    const itemNameInput = document.getElementById('itemName');

    fetchChampionButton.addEventListener('click', () => {
        const championName = championNameInput.value.trim();
        if (championName) {
            fetchChampionStats(championName);
        }
    });

    fetchItemButton.addEventListener('click', () => {
        const itemName = itemNameInput.value.trim().toLowerCase();
        if (itemName) {
            fetchItemStats(itemName);
        }
    });

    async function fetchChampionStats(championName) {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion/${championName}.json`);
            if (!response.ok) {
                throw new Error(`Champion ${championName} not found`);
            }
            const data = await response.json();
            displayChampionStats(data.data[championName]);
        } catch (error) {
            championStatsDiv.innerHTML = `<p>${error.message}</p>`;
        }
    }

    async function fetchItemStats(itemName) {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/item.json`);
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
            itemStatsDiv.innerHTML = `<p>${error.message}</p>`;
        }
    }

    function displayChampionStats(champion) {
        championStatsDiv.innerHTML = '';
        let champDiv = document.createElement('div');
        champDiv.className = 'champion';
        champDiv.innerHTML = `<h2>${champion.name}</h2>
                              <p>${champion.title}</p>
                              <p>Attack: ${champion.info.attack}</p>
                              <p>Defense: ${champion.info.defense}</p>
                              <p>Magic: ${champion.info.magic}</p>
                              <p>Difficulty: ${champion.info.difficulty}</p>`;
        championStatsDiv.appendChild(champDiv);
    }

    function displayItemStats(item) {
        itemStatsDiv.innerHTML = '';
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `<h2>${item.name}</h2>
                             <p>${item.description}</p>`;
        itemStatsDiv.appendChild(itemDiv);
    }
});
