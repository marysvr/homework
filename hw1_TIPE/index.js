const firstName = "Сергей";

const lastName = "Ромин";

let isStudent = true;

let age = 21;

let currentYear = 2001;

let birthYear = currentYear - age;

console.log(
  "Меня зовут " + firstName,
  lastName + ", мне " + age,
  "год. " + "Я ученик/ученица курса:",
  isStudent,
);

let a = "123";

let b = +"456";

let c = Number("789");

let d = Boolean(0);

let e = Boolean(" ");

let result = a + b + c + d + e;

console.log(result);
