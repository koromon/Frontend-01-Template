/**
 * 括号匹配
 * @param {*} source
 */
function parse(source) {
  let stack = [];
  for (const c of source) {
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c);
    }
    if (c === ")") {
      if (stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        return false;
      }
    }
    if (c === "]") {
      if (stack[stack.length - 1] === "[") {
        stack.pop();
      } else {
        return false;
      }
    }
    if (c === ")") {
      if (stack[stack.length - 1] === "{") {
        stack.pop();
      } else {
        return false;
      }
    }
    if (stack.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
console.log(parse("(a)"));
console.log(parse("(a"));
console.log(parse("(a[b)c]"));
console.log(parse("x[a(b)c]y"));
