import { create, Text, Wrapper } from "./createElement";
import { Timeline, Animation } from "../../week15/animation/animation";
import { cubicBezier } from "../../week15/animation/cubicBezier";

export class TabPanel {
  // config
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
  }

  setAttribute(name, value) {
    this[name] = value;
  }
  getAttribute(name, value) {
    return this[name];
  }
  appendChild(child) {
    this.children.push(child);
  }

  select(i) {
    for (const view of this.childViews) {
      view.style.display = "none";
    }
    this.childViews[i].style.display = "";

    for (const view of this.titleViews) {
      view.classList.remove("selected");
    }
    this.titleViews[i].classList.add("selected");
    // this.titleView.innerText = this.children[i].title;
  }

  render() {
    this.childViews = this.children.map((child) => (
      <div style="width: 300px;min-height: 300px;">{child}</div>
    ));
    this.titleViews = this.children.map((child, i) => (
      <span
        onClick={() => this.select(i)}
        style="background-color:lightgreen;margin: 5px 5px 0 5px;font-size:24px; width: 300px;min-height: 300px;"
      >
        {child.getAttribute("title")}
      </span>
    ));

    setTimeout(() => {
      this.select(0);
    }, 16);

    return (
      <div class="tab-panel">
        <h1 style="width: 300px;margin: 0;">{this.titleViews}</h1>
        <div style="border: solid 1px lightgreen;width: 300px;">
          {this.childViews}
        </div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
