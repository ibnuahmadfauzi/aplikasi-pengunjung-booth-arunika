$(document).ready(function () {
  let db;
  let html = ``;
  let count = 1;
  let dataTamu = [];

  // DB name and version
  let request = indexedDB.open("BukuTamuDB", 1);

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database berhasil dibuka");

    tampilkanTamu();
  };

  function tampilkanTamu() {
    let tx = db.transaction("tamu", "readonly");
    let store = tx.objectStore("tamu");
    let request = store.openCursor();

    dataTamu = []; // reset data setiap kali load
    count = 1;

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let item = [
          count++,
          cursor.value.name,
          cursor.value.gender,
          cursor.value.position,
          cursor.value.phone,
          cursor.value.email,
          cursor.value.instansi,
          cursor.value.address,
        ];
        dataTamu.push(item);
        cursor.continue();
      } else {
        console.log("Semua data sudah ditampilkan");
        // Panggil datatable setelah semua data masuk
        tampilkanDataTable();
      }
    };
  }

  // Inisialisasi DataTable setelah data selesai dimuat
  function tampilkanDataTable() {
    if ($.fn.DataTable.isDataTable("#tamuTable")) {
      $("#tamuTable").DataTable().clear().rows.add(dataTamu).draw();
    } else {
      $("#tamuTable").DataTable({
        data: dataTamu,
        columns: [
          { title: "#" },
          { title: "Nama" },
          { title: "Gender" },
          { title: "Jabatan" },
          { title: "Telepon" },
          { title: "Email" },
          { title: "Instansi" },
          { title: "Alamat" },
        ],
      });
    }
  }
});
