let selectedCategory = document.getElementById('mySelect').value;

// Add event listener to the select element
document.getElementById('mySelect').addEventListener('change', (event) => {
    selectedCategory = event.target.value;
    console.log('Selected category:', selectedCategory); // Log the selected category for debugging
});

// Add event listener to the button to handle the input
document.getElementById('enterStat').addEventListener('click', () => {
    const statValue = document.getElementById('statInput').value;
    console.log('Stat entered for', selectedCategory + ':', statValue); // Log the stat value and category for debugging

    // You can save the stat value to the selected category here
    // For example, you can save it to a database, send it to a server, or update the UI
});