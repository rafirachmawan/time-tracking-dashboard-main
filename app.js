document.addEventListener("DOMContentLoaded", () => {
  let selectedTimeframe = "weekly"; // Default timeframe

  // Array warna untuk bgContainer1
  const colors = [
    "hsl(15, 100%, 70%)",
    "hsl(195,74%,62%)",
    "hsl(348, 100%, 68%)",
    "hsl(145, 58%, 55%)",
    "hsl(264, 64%, 52%)",
    "hsl(43, 84%, 65%)",
  ];

  // Fetch data dari file JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Fungsi untuk menampilkan data sesuai timeframe yang dipilih
      function displayData(timeframe) {
        const container = document.getElementById("cards-container");
        container.innerHTML = ""; // Kosongkan container sebelum menambahkan konten baru

        data.forEach((item, index) => {
          const card = document.createElement("div");

          // Tambahkan class dan style untuk card
          card.classList.add("relative", "rounded-lg", "overflow-hidden");
          card.style.height = "200px"; // Atur tinggi card sesuai kebutuhan

          // Buat dua container untuk latar belakang
          const bgContainer1 = document.createElement("div");
          bgContainer1.style.backgroundColor = colors[index % colors.length]; // Warna latar belakang pertama
          bgContainer1.style.height = "50%"; // Setengah tinggi card
          bgContainer1.style.width = "100%"; // Lebar penuh
          bgContainer1.style.position = "absolute";
          bgContainer1.style.top = "0"; // Posisi di atas

          const bgContainer2 = document.createElement("div");
          bgContainer2.style.backgroundColor = "#1e40af"; // Warna latar belakang kedua (biru)
          bgContainer2.style.height = "80%"; // Setengah tinggi card
          bgContainer2.style.width = "100%"; // Lebar penuh
          bgContainer2.style.position = "absolute";
          bgContainer2.style.bottom = "0"; // Posisi di bawah

          // Tambahkan konten ke container kedua
          const contentContainer = document.createElement("div");
          contentContainer.classList.add(
            "p-6",
            "relative",
            "z-10",
            "text-white"
          ); // Posisi di atas latar belakang
          contentContainer.innerHTML = `
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold">${item.title}</h2>
              <button class="text-gray-400">...</button>
            </div>
            <p class="text-4xl font-bold">${
              item.timeframes[timeframe].current
            }hrs</p>
            <p class="text-gray-400">Last ${
              timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
            } - ${item.timeframes[timeframe].previous}hrs</p>
          `;

          // Tambahkan semua elemen ke card
          card.appendChild(bgContainer1);
          card.appendChild(bgContainer2);
          bgContainer2.appendChild(contentContainer); // Tambahkan konten hanya ke bgContainer2
          container.appendChild(card);
        });
      }

      // Event listener untuk tombol
      document.getElementById("daily-btn").addEventListener("click", () => {
        selectedTimeframe = "daily";
        displayData(selectedTimeframe);
      });

      document.getElementById("weekly-btn").addEventListener("click", () => {
        selectedTimeframe = "weekly";
        displayData(selectedTimeframe);
      });

      document.getElementById("monthly-btn").addEventListener("click", () => {
        selectedTimeframe = "monthly";
        displayData(selectedTimeframe);
      });

      // Tampilkan data default (weekly) saat halaman pertama kali dimuat
      displayData(selectedTimeframe);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
