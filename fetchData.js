document.addEventListener("DOMContentLoaded", () => {
    const fetchChampionButton = document.getElementById('fetchChampion');
    const championNameInput = document.getElementById('championName');
    const fetchItemButton = document.getElementById('fetchItem');
    const itemNameInput = document.getElementById('itemName');
    const resultCDiv = document.getElementById('resultC');
    const resultItemDiv = document.getElementById('resultItems');

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

    async function fetchItemStats(itemName) {
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
        "hp": 2.67,
        "mp": 1.4,
        "movespeed": 12,
        "armor": 20,
        "spellblock": 18,
        "attackrange": 0,
        "hpregen": 3,
        "mpregen": 5,
        "crit": 40,
        "attackdamage": 35,
        "attackspeed": 30
    };

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

        // Fetch and display abilities
        displayChampionAbilities(champion.passive, champion.spells);
    }

    function displayChampionAbilities(passive, abilities) {
        let abilitiesDiv = document.createElement('div');
        abilitiesDiv.className = 'abilities';
        abilitiesDiv.innerHTML = '<h2>Abilities</h2>';

        let passiveDiv = document.createElement('div');
        passiveDiv.className = 'ability passive';
        passiveDiv.innerHTML = `<strong>Passive - ${passive.name}</strong>: ${passive.description}<br>`;
        abilitiesDiv.appendChild(passiveDiv);

        abilities.forEach(ability => {
            let abilityDiv = document.createElement('div');
            abilityDiv.className = 'ability';
            abilityDiv.innerHTML = `<strong>${ability.name}</strong>: ${ability.description}<br>
                                    Cooldown: ${ability.cooldownBurn}<br>
                                    Cost: ${ability.costBurn}<br>`;
            abilitiesDiv.appendChild(abilityDiv);
        });

        resultCDiv.appendChild(abilitiesDiv);
    }

    function displayItemStats(item) {
        resultItemDiv.innerHTML = '';
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `<h1>${item.name}</h1>
                            <p>${item.plaintext || 'No plain text available'}</p>
                            <p>${item.description || 'No description available'}</p>
                            <p>Colloquial: ${item.colloq || 'N/A'}</p>
                            <p>Builds into: ${item.into ? item.into.join(', ') : 'N/A'}</p>
                            <p>Image: ${item.image ? `<img src="https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/${item.image.full}" alt="${item.name}">` : 'No image available'}</p>
                            <p>Gold: Base - ${item.gold.base}, Total - ${item.gold.total}, Sell - ${item.gold.sell}</p>
                            <p>Tags: ${item.tags ? item.tags.join(', ') : 'N/A'}</p>
                            
                            <p>Stats: ${item.stats ? Object.entries(item.stats).map(([key, value]) => `${key}: ${value}`).join(', ') : 'N/A'}</p>
                            <p>Effects: ${item.effect ? Object.entries(item.effect).map(([key, value]) => `${key}: ${value}`).join(', ') : 'N/A'}</p>
                            `
                            //<p>Maps: ${item.maps ? Object.keys(item.maps).filter(key => item.maps[key]).join(', ') : 'N/A'}</p>
                            //<p>In Store: ${item.inStore ? 'Yes' : 'No'}</p>
                            //<p>Depth: ${item.depth || 'N/A'}</p>
                            //<p>Stacks: ${item.stacks || 'N/A'}</p>;

        resultItemDiv.appendChild(itemDiv);
    }
});
