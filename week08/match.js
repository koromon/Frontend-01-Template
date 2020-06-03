function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  let regId = /(#\w+)+/g;
  let resId = selector.match(regId); // 有可id选择器放后面
  // 判断是否为 ID 选择器
  if (resId && resId[0].charAt(0) == "#") {
    let attr = element.attributes.filter((attr) => attr.name === "id")[0];
    if (attr && attr.value === resId[0].replace("#", "")) {
      return true;
    }
  } else if (selector.charAt(0) === ".") {
    // TODO: 实现支持空格的 Class 选择器
    let attr = element.attributes.filter((attr) => attr.name === "class")[0];
    if (attr && attr.value === selector.replace(".", "")) {
      return true;
    }
  } else if (selector.indexOf(".") > -1 && selector.indexOf("#") > -1) {
    // TODO: 实现复合选择器
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}
