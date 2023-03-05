console.log(
  "1.Вёрстка соответствует макету. Ширина экрана 768px +24\n2.Вёрстка соответствует макету. Ширина экрана 380px +24\n3.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n4.На ширине экрана 380рх и меньше реализовано адаптивное меню +22"
);
let hamb = document.querySelector("#hamb");
let menu = document.querySelector("#nav-menu").cloneNode(1);
let body = document.body;

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}
function renderPopup() {
  popup.appendChild(menu);
}
const links = Array.from(menu.children);
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}

const accordion = document.querySelectorAll(".accordion__item");
accordion.forEach((isOpen) => {
  isOpen.addEventListener("click", () => {
    if (isOpen.classList.contains("active")) {
      isOpen.classList.remove("active");
    } else {
      const accordionWithIsOpen = document.querySelectorAll(
        ".accordion__item.active"
      );
      accordionWithIsOpen.forEach((activeAcc) => {
        activeAcc.classList.remove("active");
      });
      isOpen.classList.add("active");
    }
  });
});

const filterBtn = document.querySelectorAll(".service-buttons__link");
const filterCard = document.querySelectorAll(".service-card");

let activeCategories = new Set();
let lastCategory = "";

const handleFilterBtnClick = (e) => {
  const btn = e.target;
  const category = btn.dataset["category"];

  if (activeCategories.has(category)) {
    activeCategories.delete(category);
    btn.classList.remove("active");
  } else {
    if (activeCategories.size == 2) {
      activeCategories.delete(lastCategory);
      refreshFilterBtnClass(lastCategory);
    }
    activeCategories.add(category);
    lastCategory = category;
    btn.classList.add("active");
  }
  resetBlurFilterCard();
  if (activeCategories.size > 0) {
    filterCard.forEach((card) => {
      let dataOfCard = card.dataset["item"];
      if (![...activeCategories].includes(dataOfCard)) {
        card.classList.add("blur");
      }
    });
  }
};

const refreshFilterBtnClass = (lastCategory) => {
  filterBtn.forEach((btn) => {
    if (btn.dataset["category"] == lastCategory) {
      btn.classList.remove("active");
    }
  });
};
const resetBlurFilterCard = () => {
  filterCard.forEach((card) => {
    card.classList.remove("blur");
  });
};
filterBtn.forEach((btn) => btn.addEventListener("click", handleFilterBtnClick));

const city = document.querySelector(".contacts-city__header");
const cityContent = document.querySelector(".dropdown-content");
const dropdownItem = document.querySelectorAll(".dropdown__item");
const addresses = document.querySelectorAll(".addresses");
let innerTitleCity = document.querySelector(".contacts-city__title");
city.addEventListener("click", () => {
  city.classList.toggle("active");
  if (city.classList.contains("active")) {
    cityContent.style.display = "inline-flex";
  } else {
    cityContent.style.display = "none";
  }
  showWindow();
});

function showWindow() {
  dropdownItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      city.classList.remove("active");
      if (item.dataset.city == "canandaigua") {
        addresses[0].style.display = "block";
        addresses[1].style.display = "none";
        addresses[2].style.display = "none";
        addresses[3].style.display = "none";
        cityContent.style.display = "none";
        innerTitleCity.innerHTML = "Canandaigua, NY";
      } else if (item.dataset.city == "newyork") {
        addresses[1].style.display = "block";
        addresses[0].style.display = "none";
        addresses[2].style.display = "none";
        addresses[3].style.display = "none";
        cityContent.style.display = "none";
        innerTitleCity.innerHTML = "New York City";
      } else if (item.dataset.city == "yonkers") {
        addresses[2].style.display = "block";
        addresses[0].style.display = "none";
        addresses[1].style.display = "none";
        addresses[3].style.display = "none";
        cityContent.style.display = "none";
        innerTitleCity.innerHTML = "Yonkers, NY";
      } else if (item.dataset.city == "sherrill") {
        addresses[3].style.display = "block";
        addresses[0].style.display = "none";
        addresses[1].style.display = "none";
        addresses[2].style.display = "none";
        cityContent.style.display = "none";
        innerTitleCity.innerHTML = "Sherrill, NY";
      }
    });
  });
}
