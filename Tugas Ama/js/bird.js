// bird.js
export class Bird {
  constructor(element) {
    this.element = element; // Elemen DOM burung
    this.x = element.offsetLeft; // Posisi horizontal (tetap)
    this.y = element.offsetTop; // Posisi vertikal (berubah)
    this.velocity = 0; // Kecepatan vertikal
    this.gravity = 0.5; // Gaya gravitasi (atur kecepatan jatuh)
    this.jumpStrength = 8; // Kekuatan lompatan
    this.rotation = 0; // Sudut rotasi saat terbang
  }

  // Update posisi burung setiap frame
  update() {
    // Terapkan gravitasi
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Batas atas-bawah: agar burung tidak keluar dari kontainer
    const containerHeight = this.element.parentElement.clientHeight;
    const birdHeight = this.element.offsetHeight;
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    if (this.y + birdHeight > containerHeight) {
      this.y = containerHeight - birdHeight;
      this.velocity = 0;
    }

    // Terapkan posisi baru ke elemen DOM
    this.element.style.top = this.y + "px";

    // Rotasi berdasarkan kecepatan (jatuh cepat -> menunduk lebih dalam)
    this.rotation = Math.min((this.velocity / 10) * 90, 90);
    this.element.style.transform = `translate(-50%, -50%) rotate(${this.rotation}deg)`;
  }

  // Lompatan: beri kecepatan ke atas dan sedikit rotasi ke atas
  jump() {
    this.velocity = -this.jumpStrength;
    this.element.style.transform = `translate(-50%, -50%) rotate(-30deg)`;
  }

  // Reset posisi burung (pada saat mulai ulang game)
  reset() {
    this.y = this.element.parentElement.clientHeight / 2;
    this.velocity = 0;
    this.element.style.top = this.y + "px";
    this.element.style.transform = "translate(-50%, -50%) rotate(0deg)";
  }
}
