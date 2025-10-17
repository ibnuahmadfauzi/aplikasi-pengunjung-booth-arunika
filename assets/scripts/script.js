$(document).ready(function () {
  let db;

  // DB name and version
  let request = indexedDB.open("BukuTamuDB", 1);

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database berhasil dibuka");

    tampilkanTamu();
  };

  request.onerror = function (event) {
    console.log("Gagal membuka database:", event.target.error);
  };

  // Saat pertama kali dibuat (versi baru)
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    // buat "tabel" bernama "tamu" dengan key otomatis
    db.createObjectStore("tamu", { keyPath: "id", autoIncrement: true });
    console.log("Database & store 'tamu' dibuat");
  };

  function simpanTamu(name, gender, position, address, phone, email, instansi) {
    let tx = db.transaction("tamu", "readwrite");
    let store = tx.objectStore("tamu");
    store.add({
      name: name,
      gender: gender,
      position: position,
      address: address,
      phone: phone,
      email: email,
      instansi: instansi,
    });

    tx.oncomplete = () => console.log("Data tamu berhasil disimpan");
    tx.onerror = (e) => console.log("Gagal menyimpan:", e.target.error);
  }

  $("#guest-form").on("submit", function (e) {
    e.preventDefault();

    // get data input from guest
    let data = {
      name: $("#guest-name").val(),
      gender: $("#guest-gender").val(),
      position: $("#guest-position").val(),
      address: $("#guest-address").val(),
      phone: $("#guest-phone").val(),
      email: $("#guest-email").val(),
      instansi: $("#guest-instansi").val(),
    };

    simpanTamu(
      data.name,
      data.gender,
      data.position,
      data.address,
      data.phone,
      data.email,
      data.instansi
    );

    console.log(data);

    Swal.fire({
      title: "Berhasil Disimpan",
      text: "Terimakasih Atas Kunjungan Anda",
      icon: "success",
      confirmButtonText: "Tutup",
    });

    $("#guest-name").val(""),
      $("#guest-gender").val(""),
      $("#guest-position").val(""),
      $("#guest-address").val(""),
      $("#guest-phone").val(""),
      $("#guest-email").val(""),
      $("#guest-instansi").val("");
  });

  function tampilkanTamu() {
    let tx = db.transaction("tamu", "readonly");
    let store = tx.objectStore("tamu");
    let request = store.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        console.log(cursor.value);
        cursor.continue(); // lanjut ke data berikutnya
      } else {
        console.log("Semua data sudah ditampilkan");
      }
    };
  }
});
