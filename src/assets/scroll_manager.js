export function disableScroll() {
    document.addEventListener('touchmove', preventDefaultScroll, { passive: false });
}

function preventDefaultScroll(e) {
    e.preventDefault();
}



export function enableScroll() {
    document.removeEventListener('touchmove', preventDefaultScroll);
}

