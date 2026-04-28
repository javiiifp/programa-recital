document.addEventListener('DOMContentLoaded', function() {
    const bookElement = document.getElementById('book');
    const zoomContainer = document.getElementById('zoom-container');
    const zoomBtn = document.getElementById('zoom-btn');
    const iconContainer = document.getElementById('zoom-icon-container');

    const iconoAmpliar = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 3 21 3 21 9"></polyline>
        <polyline points="9 21 3 21 3 15"></polyline>
        <line x1="21" y1="3" x2="14" y2="10"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>`;
    
    const iconoReducir = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 14 10 14 10 20"></polyline>
        <polyline points="20 10 14 10 14 4"></polyline>
        <line x1="14" y1="10" x2="21" y2="3"></line>
        <line x1="10" y1="14" x2="3" y2="21"></line>
    </svg>`;

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
            
            iconContainer.innerHTML = iconoReducir;

            bookElement.style.pointerEvents = 'none';            
        } else {
            panzoom.reset({ animate: true });
            
            setTimeout(() => {
                panzoom.setOptions({ disablePan: true, disableZoom: true });
                bookElement.style.pointerEvents = 'auto';
            }, 300);

            zoomBtn.classList.remove('activo');
            
            iconContainer.innerHTML = iconoAmpliar;
        }
    });

    window.addEventListener('resize', () => {
        pageFlip.updateFromHtml(document.querySelectorAll('.page'));
    });
});