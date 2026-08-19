(function () {
  "use strict";

  function showError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    const group =
      input.closest(".input-group") || input.closest(".checkbox-group");
    if (group) group.classList.add("error");
    if (errorEl) errorEl.classList.add("visible");
  }

  function clearError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    const group =
      input.closest(".input-group") || input.closest(".checkbox-group");
    if (group) group.classList.remove("error");
    if (errorEl) errorEl.classList.remove("visible");
  }

  function clearAllErrors(form) {
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach((el) => el.classList.remove("visible"));
    const errorGroups = form.querySelectorAll(
      ".input-group.error, .checkbox-group.error",
    );
    errorGroups.forEach((g) => g.classList.remove("error"));
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 5 && digits.length <= 15;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  nameInput.addEventListener("input", function () {
    if (this.value.trim().length > 0) {
      clearError(this, "nameError");
    }
  });

  phoneInput.addEventListener("input", function () {
    if (isValidPhone(this.value)) {
      clearError(this, "phoneError");
    }
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAllErrors(this);

    let isValid = true;

    const name = nameInput.value.trim();
    if (name.length === 0) {
      showError(nameInput, "nameError");
      isValid = false;
    }

    const phone = phoneInput.value.trim();
    if (!isValidPhone(phone)) {
      showError(phoneInput, "phoneError");
      isValid = false;
    }

    if (isValid) {
      const btn = this.querySelector(".btn");
      const originalText = btn.textContent;
      btn.textContent = "Отправка...";
      btn.disabled = true;

      setTimeout(() => {
        alert("✅ Заявка отправлена! Имя: " + name + ", Телефон: " + phone);
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        clearAllErrors(this);
        [nameInput, phoneInput].forEach((inp) => {
          const group = inp.closest(".input-group");
          if (group) group.classList.remove("error");
        });
      }, 700);
    }
  });

  const subscribeForm = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("email");
  const privacyCheck = document.getElementById("privacy");

  emailInput.addEventListener("input", function () {
    if (isValidEmail(this.value)) {
      clearError(this, "emailError");
    }
  });

  privacyCheck.addEventListener("change", function () {
    if (this.checked) {
      clearError(this, "privacyError");
    }
  });

  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAllErrors(this);

    let isValid = true;

    const email = emailInput.value.trim();
    if (!isValidEmail(email)) {
      showError(emailInput, "emailError");
      isValid = false;
    }

    if (!privacyCheck.checked) {
      showError(privacyCheck, "privacyError");
      isValid = false;
    }

    if (isValid) {
      const btn = this.querySelector(".btn");
      const originalText = btn.textContent;
      btn.textContent = "Подписка...";
      btn.disabled = true;

      setTimeout(() => {
        alert("📬 Вы подписаны на новости! Email: " + email);
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        clearAllErrors(this);
        [emailInput, privacyCheck].forEach((el) => {
          const group =
            el.closest(".input-group") || el.closest(".checkbox-group");
          if (group) group.classList.remove("error");
        });
      }, 700);
    }
  });

  nameInput.addEventListener("blur", function () {
    if (this.value.trim().length === 0) {
      showError(this, "nameError");
    } else {
      clearError(this, "nameError");
    }
  });

  phoneInput.addEventListener("blur", function () {
    const val = this.value.trim();
    if (val.length > 0 && !isValidPhone(val)) {
      showError(this, "phoneError");
    } else if (val.length > 0 && isValidPhone(val)) {
      clearError(this, "phoneError");
    }
  });

  emailInput.addEventListener("blur", function () {
    const val = this.value.trim();
    if (val.length > 0 && !isValidEmail(val)) {
      showError(this, "emailError");
    } else if (val.length > 0 && isValidEmail(val)) {
      clearError(this, "emailError");
    }
  });
})();
