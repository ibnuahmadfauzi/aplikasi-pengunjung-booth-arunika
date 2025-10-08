$(document).ready(function () {
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

    console.log(data);

    Swal.fire({
      title: "Berhasil Disimpan",
      text: "Terimakasih Atas Kunjungan Anda",
      icon: "success",
      confirmButtonText: "Tutup",
    });
  });
});
