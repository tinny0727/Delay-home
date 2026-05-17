const glitchContainer = document.getElementById('glitch-container');
const MAX_BOXES = 40; 

// --- 外部網頁跳轉邏輯 ---
function navigateTo(url) {
    if (url && url !== '#') {
        window.location.href = url; // 在當前視窗直接打開遊戲網址
    } else {
        alert("此頁面內容尚在準備中！");
    }
}

// --- 閃爍方塊核心邏輯 ---
function createGlitchBox() {
    if (!glitchContainer) return;
    
    if (document.querySelectorAll('.glitch-box').length >= MAX_BOXES) return;

    const box = document.createElement('div');
    box.classList.add('glitch-box');

    const width = Math.random() * 20 + 20; 
    const height = Math.random() * 25 + 5; 
    const radius = Math.random() * 8;
    box.style.borderRadius = `${radius}px`;

    const top = Math.random() * 100;
    const left = Math.random() * 100;

    const isGreen = Math.random() > 0.5;
    const baseOpacity = Math.random() * 0.3 + 0.15;
    const color = isGreen ? `rgba(76, 255, 106, ${baseOpacity})` : `rgba(255, 255, 255, ${baseOpacity})`;

    const duration = (Math.random() * 4 + 3) + 's'; 
    const delay = (Math.random() * -10) + 's'; 
    const maxOpacity = Math.random() * 0.5 + 0.2; 

    box.style.width = `${width}px`;
    box.style.height = `${height}px`;
    box.style.top = `${top}%`;
    box.style.left = `${left}%`;
    box.style.setProperty('--duration', duration);
    box.style.setProperty('--delay', delay);
    box.style.setProperty('--bg-color', color);
    box.style.setProperty('--max-opacity', maxOpacity);

    glitchContainer.appendChild(box);

    setTimeout(() => {
        box.style.transition = 'opacity 2s';
        box.style.opacity = '0';
        setTimeout(() => box.remove(), 2000);
    }, 12000);
}

for(let i = 0; i < 12; i++) { createGlitchBox(); }
setInterval(createGlitchBox, 1200);

// --- 眼睛追隨 ---
const eyes = document.querySelectorAll(".eye");
document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const radius = 10;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        eye.style.setProperty("--x", `${x}px`);
        eye.style.setProperty("--y", `${y}px`);
    });
});