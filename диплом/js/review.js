document.addEventListener("DOMContentLoaded", () => {
  const reviewsData = [
    {
      id: 1,
      author: "Ольга",
      rating: 4,
      title: "Это лучший фен!",
      text: "Пользуясь около месяца, хочу поделиться впечатлениями. Во-первых, фен очень легкий, удобно лежит в руке, не скользит. Кнопка включения и выключения расположена удобно, а не где-то сбоку. Мощность у фена хорошая, волосы сушит быстро",
      date: "21/05/2022",
      photos: [
        "./img/review.png",
        "./img/review.png",
        "./img/review.png",
        "./img/review.png",
      ],
    },
    {
      id: 2,
      author: "Татьяна",
      rating: 4,
      title: "Отличный фен",
      text: "Фен очень понравился. Качественный, стильный: свою цену полностью оправдывает!",
      date: "21/05/2022",
      photos: ["./img/review.png", "./img/review.png", "./img/review.png"],
    },
    {
      id: 3,
      author: "Виктор",
      rating: 4,
      title: "Быстро пришел",
      text: "Фен очень понравился. Качественный, стильный: свою цену полностью оправдывает!",
      date: "21/05/2022",
      photos: ["./img/review.png", "./img/review.png"],
    },
    {
      id: 4,
      author: "Анна",
      rating: 5,
      title: "Очень довольна покупкой!",
      text: "Фен сушит быстро и не пересушивает волосы. Рекомендую всем!",
      date: "20/05/2022",
      photos: ["./img/review.png", "./img/review.png", "./img/review.png"],
    },
    {
      id: 5,
      author: "Михаил",
      rating: 5,
      title: "Отличный подарок!",
      text: "Покупал в подарок жене, она в восторге! Спасибо за быструю доставку. Фен действительно качественный.",
      date: "19/05/2022",
      photos: ["./img/review.png", "./img/review.png"],
    },
  ];

  let visibleReviews = 3;
  const reviewsPerClick = 2;
  let isExpanded = false;

  const reviewsList = document.getElementById("reviewsList");
  const toggleBtn = document.getElementById("toggleBtn");
  const writeReviewBtn = document.getElementById("writeReviewBtn");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");

  const starSVG = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#000" stroke="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
    `;

  const starEmptySVG = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#e0e0e0" stroke="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
    `;

  function renderStars(rating, maxRating = 5) {
    const fullStars = starSVG.repeat(rating);
    const emptyStars = starEmptySVG.repeat(maxRating - rating);
    return fullStars + emptyStars;
  }

  function openModal(photoSrc) {
    modalImage.src = photoSrc;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    modalImage.src = "";
  }

  function renderReviews() {
    const reviewsToShow = reviewsData.slice(0, visibleReviews);

    reviewsList.innerHTML = reviewsToShow
      .map(
        (review) => `
            <div class="reviews-section__review" data-id="${review.id}">
                <div class="reviews-section__review-left">
                    <div class="reviews-section__review-author">${review.author}</div>
                    <div class="reviews-section__review-stars">
                        ${renderStars(review.rating)}
                    </div>
                </div>
                
                <div class="reviews-section__review-right">
                    <div class="reviews-section__review-top">
                        <div class="reviews-section__review-title">${review.title}</div>
                        <span class="reviews-section__review-date">${review.date}</span>
                    </div>
                    
                    <p class="reviews-section__review-text">${review.text}</p>
                    
                    ${
                      review.photos && review.photos.length > 0
                        ? `
                        <div class="reviews-section__review-photos">
                            ${review.photos
                              .slice(0, 4)
                              .map(
                                (photo) => `
                                <img 
                                  class="reviews-section__review-photo" 
                                  src="${photo}" 
                                  alt="Фото отзыва" 
                                  loading="lazy"
                                  data-photo="${photo}"
                                />
                            `,
                              )
                              .join("")}
                        </div>
                        ${
                          review.photos.length > 4
                            ? `
                            <button class="reviews-section__review-all-photos" data-photos='${JSON.stringify(review.photos)}'>
                                Смотреть все фото
                            </button>
                          `
                            : ""
                        }
                    `
                        : ""
                    }
                </div>
            </div>
        `,
      )
      .join("");

    document
      .querySelectorAll(".reviews-section__review-photo")
      .forEach((img) => {
        img.addEventListener("click", function () {
          const photoSrc = this.dataset.photo;
          openModal(photoSrc);
        });
      });

    document
      .querySelectorAll(".reviews-section__review-all-photos")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const photos = JSON.parse(this.dataset.photos);
          if (photos && photos.length > 0) {
            openModal(photos[0]);
          }
        });
      });

    if (visibleReviews >= reviewsData.length) {
      toggleBtn.textContent = "Свернуть";
      toggleBtn.disabled = false;
      isExpanded = true;
    } else if (visibleReviews > 1) {
      toggleBtn.textContent = "Показать еще";
      toggleBtn.disabled = false;
      isExpanded = false;
    } else {
      toggleBtn.textContent = "Показать еще";
      toggleBtn.disabled = false;
      isExpanded = false;
    }
  }

  function toggleReviews() {
    if (isExpanded) {
      visibleReviews = 1;
      isExpanded = false;
    } else {
      visibleReviews += reviewsPerClick;
      if (visibleReviews > reviewsData.length) {
        visibleReviews = reviewsData.length;
      }
      isExpanded = true;
    }
    renderReviews();
  }

  function handleWriteReview() {
    alert("📝 Форма написания отзыва будет открыта здесь!");
  }

  toggleBtn.addEventListener("click", toggleReviews);
  writeReviewBtn.addEventListener("click", handleWriteReview);

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  renderReviews();
});
