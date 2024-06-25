document.addEventListener('DOMContentLoaded', (event) => {
    const mainContent = document.querySelector('.main-content');

    // Create the custom scrollbar element
    const scrollbar = document.createElement('div');
    scrollbar.className = 'custom-scrollbar';
    document.body.appendChild(scrollbar);

    let isScrolling;
    const scrollbarPadding = 10; // Padding from top and bottom in pixels

    mainContent.addEventListener('scroll', () => {
        scrollbar.style.opacity = '1'; // Show the custom scrollbar

        // Clear timeout if user scrolls within 1 second
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            scrollbar.style.opacity = '0'; // Hide the custom scrollbar
        }, 1000);

        // Update custom scrollbar position and height
        const contentHeight = mainContent.scrollHeight;
        const visibleHeight = mainContent.clientHeight;
        const scrollRatio = visibleHeight / contentHeight;
        const scrollbarHeight = (visibleHeight * scrollRatio * 0.5) - (2 * scrollbarPadding); // Adjust for padding
        const scrollTop = mainContent.scrollTop;
        const scrollbarTop = scrollTop * (visibleHeight - scrollbarHeight - (2 * scrollbarPadding)) / (contentHeight - visibleHeight) + scrollbarPadding;

        // Update the custom scrollbar's position and height
        scrollbar.style.height = `${scrollbarHeight}px`;
        scrollbar.style.top = `${scrollbarTop + mainContent.getBoundingClientRect().top}px`;
    });
});