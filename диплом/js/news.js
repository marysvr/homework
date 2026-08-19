document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.querySelector(".news-show-more");
  const hiddenCards = document.querySelectorAll(".news-card.hidden");
  let isExpanded = false;

  showMoreBtn.addEventListener("click", function () {
    if (isExpanded) {
      hiddenCards.forEach((card) => {
        card.style.display = "none";
      });
      showMoreBtn.textContent = "Показать еще";
      isExpanded = false;
    } else {
      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.animation = "fadeIn 0.4s ease forwards";
        }, index * 100);
      });
      showMoreBtn.textContent = "Скрыть";
      isExpanded = true;
    }
  });

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});
