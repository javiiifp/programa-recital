document.addEventListener('DOMContentLoaded', function() {
    const bookElement = document.getElementById('book');
    const zoomContainer = document.getElementById('zoom-container');
    const zoomBtn = document.getElementById('zoom-btn');

    const pageFlip = new St.PageFlip(bookElement, {
        width: 420,
        height: 594,
        size: "stretch",
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 450,
        maxHeight: 1500,
        maxShadowOpacity: 0.2,
        showCover: true,
        mobileScrollSupport: true,
        flippingTime: 500,
        usePortrait: true
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    const panzoom = Panzoom(zoomContainer, {
        maxScale: 3,
        minScale: 1,
        contain: 'outside',
        cursor: 'default'
    });

    panzoom.setOptions({ disablePan: true, disableZoom: true });

    let isZoomed = false;

    zoomBtn.addEventListener('click', () => {
        isZoomed = !isZoomed;

        if (isZoomed) {
            panzoom.setOptions({ disablePan: false, disableZoom: false });
            panzoom.zoom(2, { animate: true }); 
            
            zoomBtn.innerHTML = '❌ Cerrar';
            zoomBtn.classList.add('activo');

            bookElement.style.pointerEvents = 'none'; 
            
        } else {
            panzoom.reset({ animate: true });
            
            setTimeout(() => {
                panzoom.setOptions({ disablePan: true, disableZoom: true });
                bookElement.style.pointerEvents = 'auto';
            }, 300);

            zoomBtn.innerHTML = '🔍 Ampliar';
            zoomBtn.classList.remove('activo');
        }
    });

    window.addEventListener('resize', () => {
        pageFlip.updateFromHtml(document.querySelectorAll('.page'));
    });
});