let parser = require("./parser");

module.exports = function (source, map) {
  let tree = parser.parseHTML(source);
  console.log(tree);

  // console.log(tree.children[2].children[0].content);

  let template = null;
  let script = null;

  for (const node of tree.children) {
    if (node.tagName === "template") {
      template = node.children.filter((e) => e.type !== "text")[0];
    }
    if (node.tagName === "script") {
      script = node.children[0].content;
    }
  }

  let visit = (node) => {
    let attrs = {};
    if (node.type === "text") {
      return JSON.stringify(node.content);
    }
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value;
    }
    let children = node.children.map((node) => visit(node));
    return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`;
  };

  let r = `
  import { create, Text, Wrapper } from "./createElement";
  export class Carousel {
    render() {
      return ${visit(template)}
    }
    mountTo(parent) {
      this.render().mountTo(parent);
    }
    setAttribute(name, value) {
      this[name] = value;
    }
  }
`;

  // console.log(r);
  return r;
};
