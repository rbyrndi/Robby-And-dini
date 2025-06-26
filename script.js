document.addEventListener("DOMContentLoaded", function() {

    // === FUNGSI NAMA TAMU DINAMIS DARI URL ===
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('to');
        const guestNameElement = document.querySelector('.guest-name');

        if (guestName && guestNameElement) {
            // Ganti tanda '+' dengan spasi dan update elemen
            const formattedName = guestName.replace(/\+/g, ' ');
            guestNameElement.innerText = decodeURIComponent(formattedName);
        }
    } catch (error) {
        console.error("Gagal memproses nama tamu dari URL:", error);
    }
    // ==========================================
    
    // --- Elemen-elemen yang dibutuhkan ---
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const openButton = document.getElementById('open-invitation');
    
    // --- Elemen Musik ---
    const audio = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    // --- Ikon untuk tombol musik (SVG) ---
    const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
    const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`;

    let isPlaying = false;
    playPauseBtn.innerHTML = playIcon;

    // --- Fungsi Buka Undangan ---
    openButton.addEventListener('click', function() {
        cover.style.opacity = '0';
        setTimeout(() => {
            cover.style.display = 'none';
        }, 1500);

        mainContent.classList.remove('hidden');
        musicControl.classList.remove('hidden');
        
        audio.play().catch(error => {
            console.log("Autoplay musik dicegah oleh browser:", error);
        });
        isPlaying = true;
        playPauseBtn.innerHTML = pauseIcon;
    });

    // --- Fungsi Tombol Play/Pause ---
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
        } else {
            audio.play();
            playPauseBtn.innerHTML = pauseIcon;
        }
        isPlaying = !isPlaying;
    });

    // --- Bagian Hitung Mundur (Countdown) ---
    const countDownDate = new Date("Dec 25, 2025 19:00:00").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (distance > 0) {
            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
        } else {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<h3>The Day Has Come</h3>";
        }
    }, 1000);

    // --- Bagian Salin Nomor Rekening ---
    const copyButton = document.getElementById('copy-button');
    const accountNumberEl = document.getElementById('account-number');

    if(copyButton && accountNumberEl) {
        const accountNumber = accountNumberEl.innerText;
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(accountNumber).then(function() {
                copyButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyButton.innerText = 'Copy Account Number';
                }, 2000);
            }, function(err) {
                console.error('Failed to copy: ', err);
            });
        });
    }
});