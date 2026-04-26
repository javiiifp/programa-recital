const pageFlip = new St.PageFlip(document.getElementById('book'), {
    width: 400,
    height: 600,
    size: "stretch",
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 420,
    maxHeight: 1350,
    showCover: true,
    mobileScrollSupport: true
});

pageFlip.loadFromHTML(document.querySelectorAll('.page'));