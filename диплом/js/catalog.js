document.addEventListener("DOMContentLoaded", () => {
  const allProducts = [
    {
      id: 1,
      title:
        "Фен Dyson Supersonic HD07 синий медный с 5 насадками в чехле и расческамия",
      price: "39 990 ₽",
      oldPrice: "69 990 Р",
      discount: "-15%",
      inStock: true,
      image: "./img/sale-1.png",
    },
    {
      id: 2,
      title: "Фен Dyson Supersonic HD07 с 5 насадками и подставкой",
      price: "37 490 ₽",
      oldPrice: "51 990 ₽",
      discount: "-10%",
      inStock: true,
      image: "./img/sale-2.png",
    },
    {
      id: 3,
      title:
        "Фен Dyson Supersonic 4 насадки HD03 с чехлом для хранения цвет сирень",
      price: "42 990 ₽",
      oldPrice: "51 990 ₽",
      discount: "-20%",
      inStock: true,
      image: "./img/sale-3.png",
    },
  ];

  let allProductsWithDuplicates = [];
  for (let i = 0; i < 6; i++) {
    allProductsWithDuplicates.push({
      ...allProducts[0],
      id: allProducts[0].id + i * 10,
      title: allProducts[0].title + (i > 0 ? ` ${i + 1}` : ""),
    });
  }
  for (let i = 0; i < 6; i++) {
    allProductsWithDuplicates.push({
      ...allProducts[1],
      id: allProducts[1].id + i * 10,
      title: allProducts[1].title + (i > 0 ? ` ${i + 1}` : ""),
    });
  }
  for (let i = 0; i < 6; i++) {
    allProductsWithDuplicates.push({
      ...allProducts[2],
      id: allProducts[2].id + i * 10,
      title: allProducts[2].title + (i > 0 ? ` ${i + 1}` : ""),
    });
  }

  let currentPage = 1;
  const perPage = 6;
  let currentProducts = [...allProductsWithDuplicates];

  const catalog = document.getElementById("catalog");
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const sortBtn = document.getElementById("sortBtn");
  const sortDropdown = document.getElementById("sortDropdown");
  const queriesContainer = document.getElementById("queriesContainer");

  const allQueries = [
    "dyson стайлер для длинных волос",
    "dyson стайлер красный",
    "dyson hs01 airwrap complete",
    "фен щетка дайсон",
    "dyson airwrap multitool",
    "dyson supersonic",
    "dyson v15 detect",
  ];
  let showAllQueries = false;
  let activeQuery = "dyson стайлер для длинных волос";

  function renderQueries() {
    const queriesToShow = showAllQueries ? allQueries : allQueries.slice(0, 4);

    queriesContainer.innerHTML = "";

    queriesToShow.forEach((query) => {
      const span = document.createElement("span");
      span.className = "catalog-section__query";
      if (query === activeQuery) {
        span.classList.add("catalog-section__query--active");
      }
      span.textContent = query;
      span.dataset.query = query;

      span.addEventListener("click", () => {
        document.querySelectorAll(".catalog-section__query").forEach((el) => {
          el.classList.remove("catalog-section__query--active");
        });
        span.classList.add("catalog-section__query--active");
        activeQuery = query;
        console.log(`🔍 Выбран запрос: "${query}"`);
      });

      queriesContainer.appendChild(span);
    });

    const btn = document.createElement("button");
    btn.className = "catalog-section__query catalog-section__query--show";
    btn.id = "showMoreQueriesBtn";
    btn.textContent = showAllQueries ? "Свернуть" : "Показать еще";
    btn.addEventListener("click", toggleQueries);
    queriesContainer.appendChild(btn);
  }

  function toggleQueries() {
    showAllQueries = !showAllQueries;
    renderQueries();
  }

  function render() {
    const start = (currentPage - 1) * perPage;
    const items = currentProducts.slice(start, start + perPage);

    catalog.innerHTML = items
      .map(
        (p) => `
    <div class="catalog-section__product" data-id="${p.id}">
        <img class="catalog-section__image" src="${p.image}" alt="${p.title}" loading="lazy" />
        
        <div class="catalog-section__title">${p.title}</div>
        
        <div class="catalog-section__info-row">
            <div class="catalog-section__status">${p.inStock ? "Есть в наличии" : "Нет в наличии"}</div>
            ${p.discount ? `<div class="catalog-section__row">${p.discount}</div>` : ""}
        </div>
        
        <div class="catalog-section__price">
          ${p.price}
          ${p.oldPrice ? `<span class="catalog-section__old-price">${p.oldPrice}</span>` : ""}
        </div>
        <div class="catalog-section__actions">
            <div class="catalog-section__qty">
                <button class="catalog-section__qty-btn qty-minus" data-id="${p.id}"><svg width="35" height="30">
                <use href="./svg/body.svg#minus"></use>
              </svg></button>
                <span class="catalog-section__qty-value" data-id="${p.id}">1</span>
                <button class="catalog-section__qty-btn qty-plus" data-id="${p.id}">
                <svg width="35" height="30">
                <use href="./svg/body.svg#plus"></use>
              </svg></button>
            </div>
            <button class="catalog-section__cart-btn" data-id="${p.id}">
                <span>В корзину</span>
            </button>
        </div>
    </div>
`,
      )
      .join("");

    const total = Math.ceil(currentProducts.length / perPage);
    pageInfo.textContent = `${currentPage} из ${total}`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= total;

    document.querySelectorAll(".qty-minus").forEach((btn) => {
      btn.addEventListener("click", handleQtyChange);
    });
    document.querySelectorAll(".qty-plus").forEach((btn) => {
      btn.addEventListener("click", handleQtyChange);
    });

    document.querySelectorAll(".catalog-section__cart-btn").forEach((btn) => {
      btn.addEventListener("click", handleAddToCart);
    });
  }

  function handleQtyChange(e) {
    const btn = e.currentTarget;
    const card = btn.closest(".catalog-section__product");
    const span = card.querySelector(".catalog-section__qty-value");
    let val = parseInt(span.textContent, 10);

    if (btn.classList.contains("qty-plus")) {
      val += 1;
    } else {
      val -= 1;
    }

    if (val < 1) val = 1;
    span.textContent = val;

    const minusBtn = card.querySelector(".qty-minus");
    minusBtn.disabled = val <= 1;
  }

  function handleAddToCart(e) {
    const btn = e.currentTarget;
    const card = btn.closest(".catalog-section__product");
    const title = card.querySelector(".catalog-section__title").textContent;
    const qty = card.querySelector(".catalog-section__qty-value").textContent;

    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 200);

    console.log(
      `✅ Товар "${title}" в количестве ${qty} шт. добавлен в корзину!`,
    );
  }

  function goToPage(page) {
    const total = Math.ceil(currentProducts.length / perPage);
    if (page < 1 || page > total) return;
    currentPage = page;
    render();
  }

  prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sortDropdown.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    sortDropdown.classList.remove("active");
  });

  sortDropdown.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const sortType = li.dataset.sort;
    sortBtn.textContent = li.textContent + " ▼";

    switch (sortType) {
      case "popular":
        currentProducts = [...allProductsWithDuplicates];
        break;
      case "new":
        currentProducts = [...allProductsWithDuplicates].reverse();
        break;
      case "old":
        currentProducts = [...allProductsWithDuplicates];
        break;
    }

    currentPage = 1;
    render();
    sortDropdown.classList.remove("active");
  });

  renderQueries();
  render();
});
