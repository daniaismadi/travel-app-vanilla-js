const app = document.getElementById("app");

const database = {
  data: [],
};

const renderContent = (templateId) => {
  const template = document.getElementById(templateId);
  if (template) {
    app.innerHTML = template.innerHTML;
    if (templateId === "home") {
      database.data.forEach((destination, i) => renderCity(destination, i));
      attachFormSubmitListener();
    }
  } else {
    app.innerHTML = document.getElementById("404").innerHTML;
  }
};

const navigateTo = (route) => {
  history.pushState({}, "", route); // Update the browser's URL
  const routeMap = {
    "/": "home",
    "/about": "about",
  };
  renderContent(routeMap[route] || "404");
};

async function fetchCityDetails(city) {
  try {
    return await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
        }),
      }
    );
  } catch {
    return null;
  }
}

const renderCity = (data, position) => {
  const container = document.getElementById("destinations-container");
  const div = document.createElement("div");
  div.classList.add("destination");
  div.innerHTML = `<div>${data.city}, ${data.country}: ${data.populationCounts[0]?.value} people</div><button id='destination-${position}'>Delete</button>`;
  container.appendChild(div);
  const deleteBtn = document.getElementById(`destination-${position}`);
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    div.remove();
    database.data.splice(position, 1);
  });
};

const attachFormSubmitListener = () => {
  const form = document.getElementById("destination-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let isValid = true;
      const city = document.getElementById("destination-input");

      if (!city.value || !/^[A-Za-z\s]+$/.test(city.value)) isValid = false;

      try {
        if (!isValid) throw error;
        const res = await fetchCityDetails(city.value.toLowerCase());
        if (!res || !res.ok) throw error;
        const body = await res.json();
        const { data, error } = body;
        if (error) throw error;
        database.data.push(data);

        renderCity(data, database.data.length - 1);

        form.reset();
      } catch {
        const cityError = document.getElementById("destination-input-error");
        cityError.textContent = "Please enter a valid city!";
      }
    });
  }
};

// Initial rendering when the page loads
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  navigateTo(window.location.pathname);
});

// Handle back/forward navigation with the browser's buttons
window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});

// Click event for navigation links
document.getElementById("home-link").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default behaviour
  navigateTo("/");
});

document.getElementById("about-link").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default behaviour
  navigateTo("/about");
});
