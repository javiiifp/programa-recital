document.addEventListener('DOMContentLoaded', function() {
    const bookElement = document.getElementById('book');
    
    const pageFlip = new St.PageFlip(bookElement, {
        width: 400,
        height: 600,
        size: "stretch",
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 450,
        maxHeight: 1500,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: true,

        flippingTime: 500,
        maxShadowOpacity: 0.2,
        usePortrait: true
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    window.addEventListener('resize', () => {
        pageFlip.updateFromHtml(document.querySelectorAll('.page'));
    });
});