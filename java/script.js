const texts = {
    typing1: " I'm so proud of you!",
    typing2: "\"Masa depan adalah milik mereka yang percaya pada keindahan mimpi-mimpi mereka.\"",
    typing3: "Happy graduation ya sayang! Terima kasih sudah bertahan dan berjuang sampai sejauh ini. Semua kerja keras, air mata, dan malam-malam tanpa tidurmu akhirnya terbayar hari ini. Aku beruntung bisa melihat kamu tumbuh dan sukses. Mari kita rayakan langkah baru ini bareng-bareng! I love you so much!"
};

function openEnvelope() {
    // Ambil elemen audio
    const audio = document.getElementById("myAudio");
    const env = document.querySelector('.envelope');
    const overlay = document.getElementById('envelopeOverlay');
    const content = document.getElementById('mainContent');

    // --- FITUR AUTOPLAY SETELAH KLIK ---
    // Atur volume (0.0 sampai 1.0)
    audio.volume = 0.5; 
    // Putar musik
    audio.play().catch(error => {
        // Ini untuk berjaga-jaga jika browser memblokir
        console.log("Autoplay dicegah oleh browser, tapi akan berputar setelah interaksi.");
    });

    // Animasi amplop terbuka
    env.classList.add('open');

    // Transisi ke konten utama
    setTimeout(() => {
        overlay.style.transition = '1.2s';
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            content.classList.remove('hidden');
            AOS.init({ duration: 1000, once: true });
            
            startAllTyping(); // Jalankan efek mengetik
            setInterval(createHeart, 400); // Jalankan love melayang
        }, 1000);
    }, 1200);
}

function typeWriter(elementId, text, speed, delay = 0) {
    setTimeout(() => {
        let i = 0;
        const element = document.getElementById(elementId);
        element.innerHTML = ""; // Bersihkan teks sebelum mulai
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }, delay);
}

function startAllTyping() {
    typeWriter("typing1", texts.typing1, 50, 500);
    typeWriter("typing2", texts.typing2, 70, 2500);
    typeWriter("typing3", texts.typing3, 40, 4500);
}

function createHeart() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 2 + 2 + 's';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

function makeItRain() {
    for(let i=0; i<30; i++) {
        setTimeout(createHeart, i * 100);
    }
}
