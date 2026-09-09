// Задача 1
const person = {
  name: "Маша",
  age: 25,
  city: "Москва",
  profession: "Разработчик",
};

console.log(person);

// Задача 2
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

console.log(isEmpty({}));
console.log(isEmpty({ name: "John" }));

// Задача 3
const task = {
  title: "Купить продукты",
  description: "Молоко, хлеб, квартира",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  return { ...object, ...modifications };
}

const modifiedTask = cloneAndModify(task, {
  isCompleted: true,
  priority: "Высокий",
});

for (let key in modifiedTask) {
  console.log(`${key}: ${modifiedTask[key]}`);
}

// Задача 4
function callAllMethods(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "function") {
      obj[key]();
    }
  }
}

const myObject = {
  method1() {
    console.log("Метод 1 вызван");
  },
  method2() {
    console.log("Метод 2 вызван");
  },
  property: "Это не метод",
};

callAllMethods(myObject);
