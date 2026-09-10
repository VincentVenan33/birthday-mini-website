const CONFIG = {
  pin: "110903",
  relationshipStart: "2018-09-30",
  birthdayDate: "2026-09-11",

  reasons: [
    "Wajah bulatmu yang lucu.",
    "Hidung pesekmu yang selalu jadi bahan godaanku.",
    "Kelakuanmu yang kadang tiba-tiba seperti anak kecil.",
    "Senyummu.",
    "Tawamu.",
    "Ucapan random yang sering keluar begitu saja.",
    "Caramu terlihat menggemaskan tanpa perlu berusaha.",
    "Caramu membuat momen biasa jadi berkesan.",
    "Sifat keras kepalamu, walau kadang bikin aku pusing.",
    "Fakta bahwa kita tidak selalu setuju, tapi tetap terus bersama.",
    "Setiap perdebatan konyol yang akhirnya malah jadi cerita.",
    "Caramu memanggilku Kei.",
    "Caramu memanggil “Sayang” dengan nada yang berbeda sesuai suasana hati.",
    "Usahamu saat benar-benar menginginkan sesuatu.",
    "Kekuatanmu saat menghadapi hal yang sulit.",
    "Kebiasaan-kebiasaan kecilmu yang ternyata lebih sering aku perhatikan.",
    "Kenangan yang kita buat sejak 2018.",
    "Foto-foto yang selalu bisa membuatku tersenyum lagi.",
    "Caramu bisa membuatku kesal tapi tetap membuatku rindu.",
    "Fakta bahwa kamu masih tetap di sini setelah bertahun-tahun.",
    "Sosok dirimu di masa depan yang ingin sekali aku lihat.",
    "Kenangan masa depan yang belum sempat kita buat.",
    "Karena kamu adalah Mei — dan entah kenapa, itu saja sudah cukup. ❤️"
  ]
};

const $ = (selector) => document.querySelector(selector);

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

/* -------------------------
   PIN
-------------------------- */
async function unlockSite() {
  const input = $("#pinInput");
  const message = $("#pinMessage");

  if (input.value.trim() === CONFIG.pin) {
    message.style.color = "var(--green)";
    message.textContent = "Akses berhasil. Selamat Ulang Tahun, Mei ❤️";

    // Mulai musik dari menit 3:00
    try {
      if (music.duration && music.duration > musicStartTime) {
        music.currentTime = musicStartTime;
      }

      await music.play();

      musicPlaying = true;
      musicBtn.textContent = "♫ Musik Menyala";
    } catch (error) {
      console.log("Musik gagal diputar otomatis:", error);
    }

    setTimeout(() => {
      $("#lockScreen").classList.add("hidden");
      document.body.classList.remove("locked");

      confettiBurst(120);
      initReveal();
    }, 350);
  } else {
    message.style.color = "var(--danger)";
    message.textContent =
      "PIN salah, Mei. Masa tanggal ulang tahun sendiri lupa? 😂";

    input.value = "";
    input.focus();
  }
}

$("#unlockBtn").addEventListener("click", unlockSite);

$("#pinInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockSite();
});

/* -------------------------
   SCROLL BUTTON
-------------------------- */
document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* -------------------------
   RELATIONSHIP COUNTER
-------------------------- */
function updateRelationshipStats() {
  const start = new Date(`${CONFIG.relationshipStart}T00:00:00`);
  const birthday = new Date(`${CONFIG.birthdayDate}T00:00:00`);

  const days = Math.floor((birthday - start) / (1000 * 60 * 60 * 24));

  let years = birthday.getFullYear() - start.getFullYear();
  const anniversaryThisYear = new Date(
    birthday.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  if (birthday < anniversaryThisYear) {
    years--;
  }

  $("#daysTogether").textContent = days.toLocaleString("id-ID");
  $("#yearsTogether").textContent = years;
}

updateRelationshipStats();

/* -------------------------
   23 REASONS
-------------------------- */
function renderReasons() {
  const list = $("#reasonsList");

  CONFIG.reasons.forEach((reason, index) => {
    const article = document.createElement("article");
    article.className = "card reason-card reveal";
    article.innerHTML = `
      <div class="reason-number">${String(index + 1).padStart(2, "0")}</div>
      <p>${escapeHTML(reason)}</p>
    `;
    list.appendChild(article);
  });
}

renderReasons();

/* -------------------------
   IMAGE FALLBACK
-------------------------- */
function photoFallback(img, number) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#282052"/>
          <stop offset="1" stop-color="#67324e"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="38" fill="url(#g)"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white"
            font-size="90" font-family="Arial" font-weight="bold">${number}</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#ded8ff"
            font-size="38" font-family="Arial">Tambahkan fotomu</text>
    </svg>
  `;

  img.onerror = null;
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* -------------------------
   REVEAL ON SCROLL
-------------------------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

function initReveal() {
  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

/* -------------------------
   CONFETTI
-------------------------- */
function confettiBurst(amount = 80) {
  const colors = ["#ff78b5", "#9c84ff", "#ffd166", "#76e6b9", "#ffffff"];

  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.setProperty("--x", Math.random() * 280 - 140 + "px");
    confetti.style.animationDuration = 2.6 + Math.random() * 2.8 + "s";
    confetti.style.opacity = 0.55 + Math.random() * 0.45;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6000);
  }
}

/* -------------------------
   MINI GAME
-------------------------- */
let score = 0;
let gameActive = false;

function spawnHeart() {
  const area = $("#gameArea");
  area.innerHTML = "";

  const heart = document.createElement("button");
  heart.type = "button";
  heart.className = "heart-target";
  heart.setAttribute("aria-label", "Tangkap hati Kei");
  heart.textContent = "❤️";

  const maxX = Math.max(10, area.clientWidth - 75);
  const maxY = Math.max(10, area.clientHeight - 80);

  heart.style.left = Math.random() * maxX + "px";
  heart.style.top = Math.random() * maxY + "px";

  heart.addEventListener("click", () => {
    if (!gameActive) return;

    score++;
    $("#score").textContent = score;

    if (score >= 5) {
      gameActive = false;

      area.innerHTML = `
        <div class="game-placeholder">
          <span>❤️</span>
          <h3>Kamu berhasil menangkap hati Kei.</h3>
          <p>Tapi sebenarnya itu sudah kamu lakukan sejak bertahun-tahun lalu.</p>
        </div>
      `;

      $("#gameResult").textContent =
        "Iya, memang agak gombal. Tapi sekarang surat rahasianya sudah terbuka. 😂❤️";

      $("#openLetterBtn").disabled = false;
      $("#openLetterBtn").textContent = "Buka Surat dari Kei 💌";

      confettiBurst(80);
      return;
    }

    spawnHeart();
  });

  area.appendChild(heart);
}

$("#startGameBtn").addEventListener("click", () => {
  score = 0;
  gameActive = true;

  $("#score").textContent = "0";
  $("#gameResult").textContent = "";
  $("#startGameBtn").textContent = "Ulangi Permainan";

  spawnHeart();
});

/* -------------------------
   SECRET LETTER
-------------------------- */
$("#openLetterBtn").addEventListener("click", () => {
  const letter = $("#secretLetter");

  if ($("#openLetterBtn").disabled) return;

  letter.classList.add("show");
  $("#openLetterBtn").style.display = "none";

  confettiBurst(60);

  setTimeout(() => {
    letter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 150);
});

/* -------------------------
   OPTIONAL MUSIC
-------------------------- */
const music = document.querySelector("#bgMusic");
const musicBtn = document.querySelector("#musicBtn");

let musicPlaying = false;

// Mulai lagu dari menit 3:01
const musicStartTime = 180;

music.addEventListener("loadedmetadata", () => {
  if (music.duration > musicStartTime) {
    music.currentTime = musicStartTime;
  }
});

// Kalau lagu habis, ulang lagi dari menit 3:00
music.addEventListener("ended", async () => {
  music.currentTime = musicStartTime;

  try {
    await music.play();
  } catch (error) {
    console.log("Musik tidak dapat diputar ulang:", error);
  }
});

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await music.play();
      musicPlaying = true;
      musicBtn.textContent = "♫ Musik Menyala";
    } else {
      music.pause();
      musicPlaying = false;
      musicBtn.textContent = "♫ Musik Mati";
    }
  } catch (error) {
    musicBtn.textContent = "Musik tidak dapat diputar";
  }
});
