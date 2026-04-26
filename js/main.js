document.addEventListener('DOMContentLoaded', function() {
    const bookElement = document.getElementById('book');
    const zoomContainer = document.getElementById('zoom-container');
    const zoomBtn = document.getElementById('zoom-btn');const iconContainer = document.getElementById('zoom-icon-container');

    const iconExpand = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`;
    const iconShrink = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>`;

    const pageFlip = new St.PageFlip(bookElement, {
        width: 420,
        height: 594,
        size: "stretch",
        showCover: false,
        mobileScrollSupport: true,
        flippingTime: 400,
        usePortrait: true
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    const panzoom = Panzoom(zoomContainer, {
        maxScale: 2,
        minScale: 1,
        contain: 'outside'
    });

    panzoom.setOptions({ disablePan: true, disableZoom: true });

    let isZoomed = false;

    zoomBtn.addEventListener('click', () => {
        isZoomed = !isZoomed;

        if (isZoomed) {
            panzoom.setOptions({ disablePan: false, disableZoom: false });
            panzoom.zoom(1.5, { animate: true }); 
            
            zoomBtn.classList.add('activo');
            iconContainer.innerHTML = iconShrink;
            bookElement.style.pointerEvents = 'none';            
        } else {
            panzoom.reset({ animate: true });
            
            setTimeout(() => {
                panzoom.setOptions({ disablePan: true, disableZoom: true });
                bookElement.style.pointerEvents = 'auto';
            }, 300);

            zoomBtn.classList.remove('activo');
            iconContainer.innerHTML = iconExpand;
        }
    });

    window.addEventListener('resize', () => {
        pageFlip.updateFromHtml(document.querySelectorAll('.page'));
    });
});