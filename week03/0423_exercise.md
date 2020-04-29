/**
 * 字符串数字转数字 - 只考虑十进制
 * @param {*} string
 */
function convertStringToNumber(string, x) {
  if (arguments.length < 2) {
    x = 10;
  }

  var charts = string.split("");
  var number = 0;

  var i = 0;
  while (i < charts.length && charts[i] != ".") {
    number = number * x; // 进制
    number += charts[i].codePointAt(0) - "0".codePointAt(0);
    i++;
  }
  if (charts[i] == ".") {
    i++;
  }
  var fraction = 1;
  while (i < charts.length) {
    fraction = fraction / x; // 进制
    number += (charts[i].codePointAt(0) - "0".codePointAt(0)) * fraction;
    i++;
  }

  return number;
}

// console.log(convertStringToNumber("100.110324"));

/**
 * 字符串数字转数字 - 只考虑整数部分
 * @param {*} number
 */
function convertNumberToString(number, x) {
  var integer = Math.floor(number);
  var fraction = number - integer;
  var string = "";
  while (integer > 0) {
    string = String(integer % x) + string;
    integer = Math.floor(integer / x);
  }
  return string;
}
console.log(convertNumberToString(123.3232, 10));
