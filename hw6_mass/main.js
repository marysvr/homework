// Задание 1.
// Дан массив пользователей:

// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }

const users = [
  { name: "Alex", age: 24, isAdmin: false },
  { name: "Bob", age: 13, isAdmin: false },
  { name: "John", age: 31, isAdmin: true },
  { name: "Jane", age: 20, isAdmin: false },
];

users.push(
  { name: "Ann", age: 19, isAdmin: false },
  { name: "Jack", age: 43, isAdmin: true },
);

console.log(users);

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

function getUserAverageAge(users) {
  if (users.length === 0) return 0;

  const sum = users.reduce((acc, user) => acc + user.age, 0);
  return sum / users.length;
}

console.log(getUserAverageAge(users)); // 25

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

function getAllAdmins(users) {
  return users.filter((user) => user.isAdmin);
}

console.log(getAllAdmins(users));
// [
//   { name: 'John', age: 31, isAdmin: true },
//   { name: 'Jack', age: 43, isAdmin: true }
// ]

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

function first(arr, n) {
  if (n === undefined) return [arr[0]];
  if (n === 0) return [];
  return arr.slice(0, n);
}

const arr = [1, 2, 3, 4, 5];

console.log(first(arr)); // [1]
console.log(first(arr, 0)); // []
console.log(first(arr, 2)); // [1, 2]
console.log(first(arr, 10)); // [1, 2, 3, 4, 5]
