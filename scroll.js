document.addEventListener('DOMContentLoaded', (event) => {
    const mainContent = document.querySelector('.main-content');
    
    let isScrolling;

    mainContent.addEventListener('scroll', () => {
        mainContent.classList.add('scroll-visible');
    
        // Clear timeout if user scrolls within 1 second
        window.clearTimeout(isScrolling);
    
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            mainContent.classList.remove('scroll-visible');
        }, 1000);
    
        // Update custom scrollbar position and height
        const contentHeight = mainContent.scrollHeight;
        const visibleHeight = mainContent.clientHeight;
        const scrollRatio = visibleHeight / contentHeight;
        const scrollbarHeight = visibleHeight * scrollRatio;
        const scrollTop = mainContent.scrollTop;
        const scrollbarTop = (contentHeight - visibleHeight - scrollTop) * scrollRatio; // Reversed scrolling
    
        // Update the custom scrollbar's position and height
        const scrollbar = mainContent.querySelector('::before');
        scrollbar.style.height = `${scrollbarHeight}px`;
        scrollbar.style.top = `${scrollbarTop}px`;
    });
});