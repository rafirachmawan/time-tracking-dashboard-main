document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("cards-container");
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

        // Card content
        card.innerHTML = `
            <div class="flex justify-between">
              <h2 class="text-xl font-bold">${item.title}</h2>
              <button class="text-gray-400">...</button>
            </div>
            <p class="text-4xl font-bold">${item.timeframes.weekly.current}hrs</p>
            <p class="text-gray-400">Last Week - ${item.timeframes.weekly.previous}hrs</p>
          `;

        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
