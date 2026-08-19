document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu");
  const body = document.body;
  const menuLinks = document.querySelectorAll(".menu__link");

  if (burger && menu) {
    function openMenu() {
      menu.classList.add("header__menu--open");
      burger.classList.add("burger--active");
      burger.setAttribute("aria-label", "Закрыть меню");
      burger.setAttribute("aria-expanded", "true");
      body.style.overflow = "hidden";
    }

    function closeMenu() {
      menu.classList.remove("header__menu--open");
      burger.classList.remove("burger--active");
      burger.setAttribute("aria-label", "Открыть меню");
      burger.setAttribute("aria-expanded", "false");
      body.style.overflow = "";
    }

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains("header__menu--open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener("click", (e) => {
      if (menu.classList.contains("header__menu--open")) {
        const target = e.target;
        if (!menu.contains(target) && !burger.contains(target)) {
          closeMenu();
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("header__menu--open")) {
        closeMenu();
      }
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (menu.classList.contains("header__menu--open")) {
          closeMenu();
        }
      });
    });
  }
});
