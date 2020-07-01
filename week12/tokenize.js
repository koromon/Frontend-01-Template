/* eslint-disable */
let regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g;

let dictionary = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"];

function* tokenize(source) {
  let result = null;
  let lastIndex = 0;

  while (true) {
    // 匹配
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    // console.log("result", result);

    // 判断结果
    if (!result) {
      break;
    }
    if (regexp.lastIndex - lastIndex > result[0].length) {
      throw new Error(
        'Unexpected token "' +
          source.slice(lastIndex, regexp.lastIndex - result[0].length) +
          '"'
      );
    }

    // 生成 token
    let token = {
      type: null,
      value: null,
    };

    for (var i = 0; i < dictionary.length; i++) {
      if (result[i + 1]) {
        token.type = dictionary[i];
      }
    }

    token.value = result[0];

    yield token;
  }

  yield { type: "EOF" };
}

/**
 * <Expression> ::=
 *  <AdditiveExpression><EOF>
 */
function Expression(source) {
  if (source[0].type === "AdditiveExpression" && source[1].type === "EOF") {
    let node = {
      type: "Expression",
      children: [source.shift(), source.shift()],
    };
    source.unshift(node);
    return node;
  }
  AdditiveExpression(source);
  return Expression(source);
}

/**
 * <AdditiveExpression> ::=
 *  <Number>
 *  |<MultiplicativeExpression><*><Number>
 *  |<MultiplicativeExpression><*><Number>
 *  |<AdditiveExpression><+><MultiplicativeExpression>
 *  |<AdditiveExpression><-><MultiplicativeExpression>
 */
function AdditiveExpression(source) {
  // 有三种情况
  if (source[0].type === "Number") {
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
  }
  if (source[0].type === "MultiplicativeExpression") {
    let node = {
      type: "AdditiveExpression",
      children: [source.shift()],
    };
    source.unshift(node);
    return AdditiveExpression(source);
  }
  if (
    source[0].type === "AdditiveExpression" &&
    source.length > 1 &&
    source[1].type === "+"
  ) {
    let node = {
      type: "AdditiveExpression",
      children: [source.shift(), source.shift()],
    };
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }
  if (
    source[0].type === "AdditiveExpression" &&
    source.length > 1 &&
    source[1].type === "-"
  ) {
    let node = {
      type: "AdditiveExpression",
      children: [source.shift(), source.shift()],
    };
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }
  if (source[0].type === "AdditiveExpression") {
    return source[0];
  }
  throw new Error();
}

/**
 * <MultiplicativeExpression> ::=
 *  <Number>
 *  |<MultiplicativeExpression><*><Number>
 *  |<MultiplicativeExpression></><Number>
 */
function MultiplicativeExpression(source) {
  // 有两种情况： 数字 / 表达式
  if (source[0].type === "Number") {
    let node = {
      type: "MultiplicativeExpression",
      children: source.shift(),
    };
    source.unshift(node);
    return MultiplicativeExpression(source);
  }
  if (
    source[0].type === "MultiplicativeExpression" &&
    source.length > 1 &&
    source[1].type === "*"
  ) {
    let node = {
      type: "MultiplicativeExpression",
      children: [source.shift(), source.shift(), source.shift()],
    };
    source.unshift(node);
    return MultiplicativeExpression(source);
  }
  if (
    source[0].type === "MultiplicativeExpression" &&
    source.length > 1 &&
    source[1].type === "/"
  ) {
    let node = {
      type: "MultiplicativeExpression",
      children: [source.shift(), source.shift(), source.shift()],
    };
    source.unshift(node);
    return MultiplicativeExpression(source);
  }
  if (source[0].type === "MultiplicativeExpression") {
    return source[0];
  }
  throw new Error();
}

let source = [];

for (const token of tokenize("5 + 1024 * 25 + 3")) {
  // 过滤空格、终止符
  if (token.type !== "Whitespace" && token.type !== "LineTerminator") {
    source.push(token);
  }
}

console.log(Expression(source));
