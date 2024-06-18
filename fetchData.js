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

    function displayChampionStats(champion) {   //this is the output
        resultCDiv.innerHTML = '';
        let champDiv = document.createElement('div');
        champDiv.className = 'champion';
        champDiv.innerHTML = `<h2>${champion.name}</h2>
                              <p>${champion.title}</p>
                              <p>Attack: ${champion.info.attack}</p>
                              <p>Defense: ${champion.info.defense}</p>
                              <p>Magic: ${champion.info.magic}</p>
                              <p>Difficulty: ${champion.info.difficulty}</p>`;
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
