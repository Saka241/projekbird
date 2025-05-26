// game.js

import { PipePair, GAP } from './pipe.js';

const gameHeight = window.innerHeight;  // Ketinggian area permainan
const gameWidth = window.innerWidth;    // Lebar area permainan
const pipeSpeed = 2;                   // Kecepatan pergerakan pipa
let score = 0;

// Referensi elemen burung (pastikan elemen dengan id "bird" ada di HTML)
const birdEl = document.getElementById('bird');

// Array untuk menyimpan semua pasangan pipa yang aktif
let pipes = [];

// Buat pipa baru setiap interval tertentu (misalnya setiap 150 frames)
let frames = 0;
function spawnPipes() {
  if (frames % 150 === 0) {
    const newPipe = new PipePair(gameWidth, pipeSpeed, gameHeight);
    pipes.push(newPipe);
  }
  frames++;
}

// Cek tabrakan antara burung dan pipa
function checkCollision() {
  const birdRect = birdEl.getBoundingClientRect();
  for (let pipe of pipes) {
    const topRect = pipe.topPipeEl.getBoundingClientRect();
    const bottomRect = pipe.bottomPipeEl.getBoundingClientRect();
    // Deteksi overlap bounding box (tabrakan) dengan pipa atas atau bawah
    if (!(
      birdRect.right < topRect.left ||
      birdRect.left > topRect.right ||
      birdRect.bottom < topRect.top ||
      birdRect.top > topRect.bottom
    )) {
      return true; // bertabrakan dengan pipa atas
    }
    if (!(
      birdRect.right < bottomRect.left ||
      birdRect.left > bottomRect.right ||
      birdRect.bottom < bottomRect.top ||
      birdRect.top > bottomRect.bottom
    )) {
      return true; // bertabrakan dengan pipa bawah
    }
  }
  return false; // tidak ada tabrakan
}

// Update skor jika burung berhasil melewati pipa
function updateScore() {
  for (let pipe of pipes) {
    // Cek jika burung sudah melewati pipa (pipa kiri burung) dan belum pernah diberi skor
    if (!pipe.passed && (pipe.x + pipe.width < birdEl.getBoundingClientRect().left)) {
      score++;
      pipe.passed = true;
      console.log('Score:', score);
    }
  }
}

// Loop utama permainan
function gameLoop() {
  // Buat dan spawn pipa baru bila perlu
  spawnPipes();

  // Update semua pipa
  pipes.forEach(pipe => pipe.update());

  // Hapus pipa yang telah keluar layar
  pipes = pipes.filter(pipe => {
    if (pipe.isOffScreen()) {
      pipe.remove(); // hapus elemen DOM
      return false;   // keluarkan dari array
    }
    return true;
  });

  // Periksa skor dan tabrakan
  updateScore();
  if (checkCollision()) {
    console.log('Game Over!');
    // Lakukan reset atau logika game over di sini
    return; // hentikan loop atau reset sesuai kebutuhan
  }

  requestAnimationFrame(gameLoop);
}

// Mulai loop permainan
requestAnimationFrame(gameLoop);
