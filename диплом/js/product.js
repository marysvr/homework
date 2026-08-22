export const name = () => {
  const nameList = document.querySelector('[data-sizes="list"]');
  const nameButtons = document.querySelectorAll('[data-sizes="button"]');

  const handleNameClick = (event) => {
    const target = event.target;

    if (!target?.classList.contains("product__name")) return;

    sizesButtons.forEach((button) =>
      button.classList.remove("product__name--active"),
    );
    target.classList.add("product__name--active");
  };

  sizesList.addEventListener("click", handleSizeClick);
};
