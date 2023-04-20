const input = "10+20-30+70";
const inputArr = input.split("-");
//55-(50+40)-(90+10) -> ['55', '55+40', '90+10']
//10+20-30+70 -> ['10+20', '30+70']
//-

const sumArr = inputArr.map((e) =>
  e.split("+")
    .map((e) => +e)
    .reduce((acc, cur) => acc + cur));

const result = sumArr.reduce((acc, cur) => acc - cur);

console.log(result);
