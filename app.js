document.addEventListener("DOMContentLoaded", () => {
  let selectedTimeframe = "weekly"; // Default timeframe

  // Fetch data dari file JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Fungsi untuk menampilkan data sesuai timeframe yang dipilih
      function displayData(timeframe) {
        const container = document.getElementById("cards-container");
        container.innerHTML = ""; // Kosongkan container sebelum menambahkan konten baru

        data.forEach((item) => {
          const card = document.createElement("div");

          // Tentukan URL gambar background SVG berdasarkan title
          let bgImage = "";
          switch (item.title) {
            case "Work":
              bgImage = "url('images/icon-work.svg')";
              break;
            case "Play":
              bgImage = "url('images/play-bg.svg')";
              break;
            case "Study":
              bgImage = "url('images/study-bg.svg')";
              break;
            case "Exercise":
              bgImage = "url('images/exercise-bg.svg')";
              break;
            case "Social":
              bgImage = "url('images/social-bg.svg')";
              break;
            case "Self Care":
              bgImage = "url('images/selfcare-bg.svg')";
              break;
          }

          // Tambahkan class dan style untuk card
          card.classList.add(
            "bg-blue-900",
            "p-6",
            "rounded-lg",
            "relative",
            "bg-cover"
          );
          card.style.backgroundImage = bgImage;
          card.style.backgroundPosition = "right top"; // Posisi background
          card.style.backgroundRepeat = "no-repeat"; // Jangan ulang gambar

          // Card content berdasarkan timeframe yang dipilih
          card.innerHTML = `
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">${item.title}</h2>
                <button class="text-gray-400">...</button>
              </div>
              <p class="text-4xl font-bold text-white">${
                item.timeframes[timeframe].current
              }hrs</p>
              <p class="text-gray-400">Last ${
                timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
              } - ${item.timeframes[timeframe].previous}hrs</p>
            `;

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
