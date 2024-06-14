document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'RGAPI-25fa7072-2323-42f3-9fa5-b8b296c399da'; // Not needed for DDragon endpoints
    const championStatsDiv = document.getElementById('champion-stats');
    const itemStatsDiv = document.getElementById('item-stats');
    const fetchChampionButton = document.getElementById('fetchChampion');
    const championNameInput = document.getElementById('championName');

    fetchChampionButton.addEventListener('click', () => {
        const championName = championNameInput.value.trim();
        if (championName) {
            fetchChampionStats(championName);
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

    async function fetchItemStats() {
        const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/item.json`);
        const data = await response.json();
        //displayItemStats(data.data);
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

    function displayItemStats(items) {
        itemStatsDiv.innerHTML = '';
        for (let item in items) {
            let itm = items[item];
            let itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `<h2>${itm.name}</h2>
                                 <p>${itm.description}</p>`;
            itemStatsDiv.appendChild(itemDiv);
        }
    }

    fetchItemStats();
});
