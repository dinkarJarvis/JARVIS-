// =========================================
// JARVIS Animation System
// =========================================

const rings = document.querySelectorAll(".ring");
const center = document.querySelector(".center");

let angle = 0;

function animateCore() {

    angle += 0.5;

    rings.forEach((ring, index) => {

        const direction = index % 2 === 0 ? 1 : -1;

        ring.style.transform =
            `rotate(${angle * direction}deg)`;

    });

    const glow = 20 + Math.sin(angle * Math.PI / 180) * 10;

    center.style.boxShadow = `
        0 0 ${glow}px #00e5ff,
        0 0 ${glow * 2}px #00e5ff,
        0 0 ${glow * 3}px #00e5ff
    `;

    requestAnimationFrame(animateCore);

}

window.addEventListener("load", () => {

    animateCore();

});
