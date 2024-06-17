// Function to fetch champion stats
async function fetchChampionStats(championName, resultCDiv) {
    try {
        console.log(`Fetching champion stats for: ${championName}`);
        const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion/${championName}.json`);
        if (!response.ok) {
            throw new Error(`Champion ${championName} not found`);
        }
        const data = await response.json();
        console.log('Champion data:', data);
        displayChampionStats(data.data[championName], resultCDiv);
    } catch (error) {
        console.error('Error fetching champion stats:', error);
        resultCDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function to fetch item stats
async function fetchItemStats(itemName, resultItemDiv) {
    try {
        console.log(`Fetching item stats for: ${itemName}`);
        const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/item.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch item data`);
        }
        const data = await response.json();
        const items = data.data;
        console.log('Item data:', items);

        const item = Object.values(items).find(item => item.name.toLowerCase() === itemName);
        if (!item) {
            throw new Error(`Item ${itemName} not found`);
        }

        displayItemStats(item, resultItemDiv);
    } catch (error) {
        console.error('Error fetching item stats:', error);
        resultItemDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function to display champion stats
function displayChampionStats(champion, resultCDiv) {
    console.log('Displaying champion stats:', champion);
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

// Function to display item stats
function displayItemStats(item, resultItemDiv) {
    console.log('Displaying item stats:', item);
    resultItemDiv.innerHTML = '';
    let itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `<h2>${item.name}</h2>
                        <br>
                        ${item.gold.total} Gold 
                        <p>${item.description}</p>`;
    resultItemDiv.appendChild(itemDiv);
}

// Exporting functions to be used in other files
export { fetchChampionStats, fetchItemStats, displayChampionStats, displayItemStats };
