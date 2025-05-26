// pipe.js

// Jarak celah antara pipa atas dan pipa bawah (dalam piksel atau unit yang sesuai)
export const GAP = 150;

export class PipePair {
  constructor(x, speed, gameHeight) {
    this.x = x; // Posisi horizontal awal (biasanya layar kanan)
    this.speed = speed; // Kecepatan bergerak ke kiri
    this.passed = false; // Flag apakah sudah dilewati burung (untuk skor)

    // Tentukan tinggi atas pipa secara acak agar gapnya berada di posisi berbeda.
    // Misalnya kita berikan batas minimum dan maksimum:
    const minPipeHeight = 50;
    const maxPipeHeight = gameHeight - GAP - 50;
    this.topHeight =
      Math.floor(Math.random() * (maxPipeHeight - minPipeHeight)) +
      minPipeHeight;
    this.bottomHeight = gameHeight - this.topHeight - GAP;

    // Buat elemen gambar pipa atas
    this.topPipeEl = document.createElement("img");
    this.topPipeEl.src = "\assets\images\pipaatas.png"; // Gambar pipa (pastikan path benar)
    this.topPipeEl.classList.add("pipe", "pipe-top");
    this.topPipeEl.style.position = "absolute";
    this.topPipeEl.style.left = `${this.x}px`;
    this.topPipeEl.style.top = `0px`; // Menempel ke atas layar
    this.topPipeEl.style.height = `${this.topHeight}px`;
    // Rotasi gambar pipa atas 180 derajat agar batangnya menghadap ke bawah
    this.topPipeEl.style.transform = "rotate(180deg)";

    // Buat elemen gambar pipa bawah
    this.bottomPipeEl = document.createElement("img");
    this.bottomPipeEl.src = "\assets\imagespipabawah.png";
    this.bottomPipeEl.classList.add("pipe", "pipe-bottom");
    this.bottomPipeEl.style.position = "absolute";
    this.bottomPipeEl.style.left = `${this.x}px`;
    this.bottomPipeEl.style.bottom = `0px`; // Menempel ke dasar layar
    this.bottomPipeEl.style.height = `${this.bottomHeight}px`;

    // Pastikan display elemen sebagai block untuk menghindari whitespace
    // (Sebagai catatan di CSS: .pipe { display: block; } )

    // Tambahkan elemen pipa ke DOM (misal di <div id="game"> atau langsung di body)
    document.body.appendChild(this.topPipeEl);
    document.body.appendChild(this.bottomPipeEl);

    // Lebar pipa (diasumsikan sama untuk atas dan bawah)
    // Bisa gunakan naturalWidth atau nilai tetap
    this.width = this.topPipeEl.naturalWidth || 50;
  }

  // Update posisi pipa ke kiri setiap frame
  update() {
    this.x -= this.speed;
    this.topPipeEl.style.left = `${this.x}px`;
    this.bottomPipeEl.style.left = `${this.x}px`;
  }

  // Periksa apakah pipa sudah keluar dari layar (di kiri)
  isOffScreen() {
    return this.x + this.width < 0;
  }

  // Hapus elemen pipa dari DOM
  remove() {
    this.topPipeEl.remove();
    this.bottomPipeEl.remove();
  }
}
