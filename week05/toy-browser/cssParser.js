const css = require("css");

// 加入一个新的函数，addCSSRules，把 CSS 规则暂存到一个数组里
let rules = [];

function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  if (selector.charAt(0) === "#") {
    let attr = element.attributes.filter((attr) => attr.name === "id")[0];
    if (attr && attr.value === selector.replace("#", "")) {
      return true;
    }
  } else if (selector.charAt(0) === ".") {
    // TODO: 实现支持空格的 Class 选择器
    let attr = element.attributes.filter((attr) => attr.name === "class")[0];
    if (attr && attr.value === selector.replace(".", "")) {
      return true;
    }
  } else if (false) {
    // TODO: 实现复合选择器
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}

// 定义优先级
// 标准定义  https://www.w3.org/TR/CSS2/cascade.html#specificity
function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (const part of selectorParts) {
    if (part.charAt(0) === "#") {
      p[1] += 1;
    } else if (part.charAt(0) === ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

module.exports = {
  // 收集规则
  addCSSRules: function (text) {
    let ast = css.parse(text);
    // console.log(JSON.stringify(ast, null, "    "));
    rules.push(...ast.stylesheet.rules);
  },
  // 添加样式
  computeCSS: function (stack, element) {
    // console.log("rules", rules);
    // console.log("compute CSS for Element", element);
    let elements = stack.slice().reverse();
    if (!element.computedStyle) {
      element.computedStyle = {};
    }
    for (let rule of rules) {
      let selectorParts = rule.selectors[0].split(" ").reverse();
      if (!match(element, selectorParts[0])) {
        continue;
      }
      let matched = false;
      let j = 1; // selector
      for (let i = 0; i < elements.length; i++) {
        if (match(elements[i], selectorParts[j])) {
          j++;
        }
      }
      if (j >= selectorParts.length) {
        matched = true;
      }
      if (matched) {
        // 如果匹配 要加入
        // console.log("Element", element, "matched rule", rule);
        let sp = specificity(rule.selectors[0]);
        let computedStyle = element.computedStyle;
        for (const declaration of rule.declarations) {
          if (!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {};
          }
          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          } else if (
            compare(computedStyle[declaration.property].specificity, sp) < 0
          ) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          }
        }
        // console.log("computedStyle", element.computedStyle);
      }
    }
  },
};
