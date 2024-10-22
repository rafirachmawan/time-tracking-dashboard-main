document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("cards-container");
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("bg-blue-900", "p-6", "rounded-lg", "relative");

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
