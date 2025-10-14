const eyes = Array.from(document.querySelectorAll(".eyes div"));

function updatePupils(x, y) {
    eyes.forEach((eye) => {
        const pupil = eye.querySelector(".pupil");
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(y - eyeY, x - eyeX);
        const move = 25;
        const pupilX = Math.cos(angle) * move;
        const pupilY = Math.sin(angle) * move;
        pupil.style.transform = `translate(${pupilX}px,${pupilY}px)`;
    });
}

// Mouse support
document.addEventListener("mousemove", (e) => {
    updatePupils(e.pageX, e.pageY);
});

// Touch support
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    updatePupils(touch.pageX, touch.pageY);
});
