const fact = (n) => {
  if (n == 0) return 1;
  else return fact(n - 1) * n;
};

const result = fact(5);
console.log(result);
