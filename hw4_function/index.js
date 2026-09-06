// Задача 1
function calculateFinalPrice(basePrice, discountPercent, taxRate) {
  const discountAmount = basePrice * (discountPercent / 100);
  const priceAfterDiscount = basePrice - discountAmount;
  const finalPrice = priceAfterDiscount * (1 + taxRate);
  return Math.round(finalPrice);
}

console.log(calculateFinalPrice(100, 10, 0.2));
console.log(calculateFinalPrice(100, 10, 0));

// Задача 2
function checkAccess(username, password) {
  if (username === "admin" && password === "123456") {
    return "Доступ разрешен";
  } else {
    return "Доступ запрещен";
  }
}

// Задача 3
function getTimeOfDay(hours) {
  if (hours >= 0 && hours <= 5) {
    return "Ночь";
  } else if (hours >= 6 && hours <= 11) {
    return "утро";
  } else if (hours >= 12 && hours <= 17) {
    return "день";
  } else if (hours >= 18 && hours <= 23) {
    return "вечер";
  } else {
    return "Некорректное время";
  }
}

// Задача 4
function findFirstEven(start, end) {
  for (let k = start; k <= end; k++) {
    if (k % 2 === 0) {
      return i;
    }
  }
  return "Чётных чисел нет";
}

console.log(findFirstEven(1, 10));
