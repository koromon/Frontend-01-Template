/**
 * 字符串数字转数字
 * @param {*} string
 * @param {*} x 转换的进制
 */
function convertStringToNumber(string, x = 10) {
  // TODO: 这里要用正则判断是否能转换为数字，不能则返回 'NaN'
  var charts = string.split("");
  var number = 0;

  var i = 0;
  while (i < charts.length && charts[i] != ".") {
    number = number * x;
    number += charts[i].codePointAt(0) - "0".codePointAt(0);
    i++;
  }
  if (charts[i] == ".") {
    i++;
  }
  var fraction = 1;
  while (i < charts.length) {
    fraction = fraction / x;
    number += (charts[i].codePointAt(0) - "0".codePointAt(0)) * fraction;
    i++;
  }

  return number;
}

/**
 * 数字转字符串
 * @param {*} number
 * @param {*} x 转换的进制
 */
function convertNumberToString(number, x = 10) {
  if (typeof number !== "number") {
    throw new Error("请传入数字类型");
  }
  if (Number.isNaN(number)) {
    return "NaN";
  }
  if (number === 0) {
    return "0";
  }
  if (number < 0) {
    return "-" + convertNumberToString(-number, x);
  }
  if (number === Infinity) {
    return "Infinity";
  }
  var integer = Math.floor(number);
  let fraction = String(number).match(/\.\d+$/);
  var string = "";
  while (integer > 0) {
    string = String(integer % x) + string;
    integer = Math.floor(integer / x);
  }
  return fraction ? `${string}${fraction[0]}` : string;
}
