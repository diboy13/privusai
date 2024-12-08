function setPage(hash) {
  location.hash = hash;
}

function togglePage(page) {
  if (document) {
    const pages = document.querySelectorAll("#pages-container>div");

    if (pages) {
      for (let i = 0; i < pages.length; i++) {
        const element = pages[i];

        element.style.display = "none";

        if (element.id === page) {
          element.style.display = "block";
        }
      }
    }
  }
}

function toggleMenuButton(page) {
  if (document) {
    const menuButtons = document.querySelectorAll("button[data-hash]");

    if (menuButtons) {
      for (let i = 0; i < menuButtons.length; i++) {
        const element = menuButtons[i];

        element.classList.remove("selected");

        if (element.dataset.hash === page) {
          element.classList.add("selected");
        }
      }
    }
  }
}

function locationHashChanged() {
  const hash = location.hash;
  const page = hash.substring(1);

  toggleMenuButton(page);
  togglePage(page);
}

window.onhashchange = locationHashChanged;

document.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) {
    setPage("#overview");
  } else {
    locationHashChanged();
  }
});
