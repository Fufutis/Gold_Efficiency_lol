import { stats, updateStatsDisplay, calculateTotalValue } from './stats.js';
import { fetchChampionStats, fetchItemStats } from './fetchData.js';

document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById('mySelect');
    const statValueInput = document.getElementById('statValue');
    const addStatButton = document.getElementById('addStat');
    const statsDisplay = document.getElementById('statsDisplay');
    const calculateTotalButton = document.getElementById('calculateTotal');
    const totalValueDisplay = document.getElementById('totalValue');
    const fetchChampionButton = document.getElementById('fetchChampion');
    const championNameInput = document.getElementById('championName');
    const fetchItemButton = document.getElementById('fetchItem');
    const itemNameInput = document.getElementById('itemName');
    const resultCDiv = document.getElementById('resultC');
    const resultItemDiv = document.getElementById('resultItems');

    console.log('DOM fully loaded and parsed');

    // Check if the element is found
    if (!statsDisplay) {
        console.error('Element with ID statsDisplay not found');
        return;
    }

    // Initial update of stats display
    updateStatsDisplay(statsDisplay);

    // Event listener for adding stats
    addStatButton.addEventListener('click', () => {
        const selectedStat = selectElement.value;
        const statValue = parseInt(statValueInput.value);
        if (!isNaN(statValue)) {
            stats[selectedStat] = statValue;
            updateStatsDisplay(statsDisplay);
        }
    });

    // Event listener for calculating total value
    calculateTotalButton.addEventListener('click', () => {
        const totalValue = calculateTotalValue();
        totalValueDisplay.innerHTML = `Total Value: ${totalValue}`;
    });

    // Event listener for fetching champion stats
    fetchChampionButton.addEventListener('click', () => {
        const championName = championNameInput.value.trim();
        if (championName) {
            console.log(`Fetching stats for champion: ${championName}`);
            fetchChampionStats(championName, resultCDiv);
        }
    });

    // Event listener for fetching item stats
    fetchItemButton.addEventListener('click', () => {
        const itemName = itemNameInput.value.trim().toLowerCase();
        if (itemName) {
            console.log(`Fetching stats for item: ${itemName}`);
            fetchItemStats(itemName, resultItemDiv);
        }
    });
});
