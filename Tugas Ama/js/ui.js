// ui.js

// Inisialisasi UI: pasang event listener pada tombol restart
export function setupUI(onRestart) {
  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", onRestart);
}

// Perbarui skor di layar
export function updateScore(score) {
  document.getElementById("score").innerText = score;
}

// Tampilkan tombol restart
export function showRestartButton() {
  document.getElementById("restart-btn").style.display = "inline-block";
}

// Sembunyikan tombol restart
export function hideRestartButton() {
  document.getElementById("restart-btn").style.display = "none";
}

// (Musik latar tidak digunakan dalam versi ini, fungsi berikut tidak aktif)
export function playBackgroundMusic() {
  const bgm = document.getElementById("bg-music");
  if (bgm) {
    bgm.currentTime = 0;
    bgm.play();
  }
}

export function stopBackgroundMusic() {
  const bgm = document.getElementById("bg-music");
  if (bgm) {
    bgm.pause();
    bgm.currentTime = 0;
  }
}
