const apps = [
  "https://play.google.com/store/apps/details?id=com.yallafast.delivery",
  "https://play.google.com/store/apps/details?id=com.urmart.users",
  "https://play.google.com/store/apps/details?id=com.michel.eats"
  // Add more Play Store URLs here
];
const descriptions = [
  [ // Yalla Fast
    "🚗 Instant delivery at your doorstep",
    "🛒 Multiple vendors in one app",
    "💬 Real-time chat with delivery agents",
    "🔐 Secure & fast checkouts"
  ],
  [ // UR Mart
    "📦 Grocery & daily needs in minutes",
    "📍 Location-based vendor listing",
    "💸 Apply promo codes & get discounts",
    "⭐ User-friendly UI with rating system"
  ],
  [ // Michel Eats
    "🍽️ Curated food delivery experience",
    "🗺️ Track your order live",
    "💳 Multiple payment options",
    "📢 Push notifications for every update"
  ]]


async function fetchAppDetails(url) {
  try {
    const res = await fetch(`http://localhost:3000/api/playstore?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    const index = apps.indexOf(url); // get the index of the current app
    const descList = descriptions[index]
      .map(item => `<li>${item}</li>`)
      .join("");

    const html = `
      <div class="project-card">
        <h3 class="project-title">${data.name}</h3>
        <div class="project-images">
          ${data.screenshots.map(img => `<img src="${img}" alt="screenshot">`).join("")}
        </div>
        <ul class="project-description">${descList}</ul>
        <a class="project-link" href="${url}" target="_blank">View on Play Store</a>
      </div>
    `;

    document.getElementById("projects").innerHTML += html;
  } catch (err) {
    console.error("Error fetching app data", err);
  }
}


apps.forEach(url => fetchAppDetails(url));
