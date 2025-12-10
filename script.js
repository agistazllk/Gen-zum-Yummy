// === Simpan produk ke localStorage saat beli ===
function beliProduk(nama, harga) {
    const pesanan = { nama, harga };
    localStorage.setItem("pesanan", JSON.stringify(pesanan));
    window.location.href = "checkout.html";
  }
  
  // === Kirim ke WhatsApp + Simpan ke dataAdmin ===
  function kirimPesanan() {
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const pesanan = JSON.parse(localStorage.getItem("pesanan"));
  
    if (!nama || !alamat) {
      alert("Harap isi nama dan alamat!");
      return;
    }
  
    const noWa = "087891545344"; // GANTI dengan nomor WA kamu
    const pesan = `Halo Kak, saya ingin memesan:
  🍠 Produk: ${pesanan.nama}
  💰 Harga: Rp ${pesanan.harga}
  👤 Nama: ${nama}
  📍 Alamat: ${alamat}`;
  
    // Simpan ke localStorage untuk halaman admin
    const semuaPesanan = JSON.parse(localStorage.getItem("dataAdmin")) || [];
    semuaPesanan.push({
      nama,
      alamat,
      produk: pesanan.nama,
      harga: parseInt(pesanan.harga),
      tanggal: new Date().toLocaleString()
    });
    localStorage.setItem("dataAdmin", JSON.stringify(semuaPesanan));
  
    // Kirim ke WhatsApp
    const url = `https://wa.me/${noWa}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  
    alert("Pesanan berhasil dikirim ke WhatsApp!");
    localStorage.removeItem("pesanan");
    window.location.href = "index.html";
  }
  
  // === Tampilkan data di halaman admin ===
  function tampilkanDataAdmin() {
    const data = JSON.parse(localStorage.getItem("dataAdmin")) || [];
    const tabel = document.getElementById("tabel-pesanan");
    if (!tabel) return;
    tabel.innerHTML = "";
  
    data.forEach((item, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${item.produk}</td>
        <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
        <td>${item.nama}</td>
        <td>${item.alamat}</td>
        <td>${item.tanggal}</td>
      `;
      tabel.appendChild(tr);
    });
  }
  
  // === Hitung dan tampilkan data Dashboard Admin ===
  function tampilkanDashboard() {
    const data = JSON.parse(localStorage.getItem("dataAdmin")) || [];
    const totalPenjualan = data.reduce((sum, item) => sum + item.harga, 0);
    const totalProduk = new Set(data.map(item => item.produk)).size;
    const totalPelanggan = new Set(data.map(item => item.nama)).size;
  
    const elPenjualan = document.getElementById("total-penjualan");
    const elProduk = document.getElementById("total-produk");
    const elPelanggan = document.getElementById("total-pelanggan");
  
    if (elPenjualan) elPenjualan.innerText = `Rp ${totalPenjualan.toLocaleString("id-ID")}`;
    if (elProduk) elProduk.innerText = `${totalProduk} Item`;
    if (elPelanggan) elPelanggan.innerText = totalPelanggan;
  }
  
  // === Panggil fungsi otomatis sesuai halaman ===
  document.addEventListener("DOMContentLoaded", () => {
    tampilkanDataAdmin();
    tampilkanDashboard();
  });
  