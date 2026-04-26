document.addEventListener('DOMContentLoaded', function() {
    const bookElement = document.getElementById('book');
    const zoomContainer = document.getElementById('zoom-container');
    const zoomBtn = document.getElementById('zoom-btn');
    const iconContainer = document.getElementById('zoom-icon-container');

    const pageFlip = new St.PageFlip(bookElement, {
        width: 350,           
        height: 495,          
        maxWidth: 700,        
        maxHeight: 990,       
        minWidth: 315,        
        minHeight: 450,       
        size: "stretch",
        showCover: false,
        mobileScrollSupport: true,
        usePortrait: true,
        flippingTime: 400
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    const panzoom = Panzoom(zoomContainer, {
        maxScale: 2,
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
            panzoom.zoom(1.5, { animate: true }); 
            
            zoomBtn.classList.add('activo');

            bookElement.style.pointerEvents = 'none';            
        } else {
            panzoom.reset({ animate: true });
            
            setTimeout(() => {
                panzoom.setOptions({ disablePan: true, disableZoom: true });
                bookElement.style.pointerEvents = 'auto';
            }, 300);

            zoomBtn.classList.remove('activo');
        }
    });

    window.addEventListener('resize', () => {
        pageFlip.updateFromHtml(document.querySelectorAll('.page'));
    });
});