// import { Carousel } from "./carousel.view";
import { create, Text, Wrapper } from "./createElement";

import { Carousel } from "./Carousel";

let component = (
  <Carousel
    data={[
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
      "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
      "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ]}
  ></Carousel>
);

component.mountTo(document.body);

// class MyComponent {
//   // config
//   constructor() {
//     this.children = [];
//     this.root = document.createElement("div");
//   }
//   // attribute
//   setAttribute(name, value) {
//     this.root.setAttribute(name, value);
//   }

//   appendChild(child) {
//     this.children.push(child);
//   }

//   render() {
//     return (
//       <article>
//         <header>I'm a header</header>
//         {this.slot}
//         <footer>I'm a footer</footer>
//       </article>
//     );
//   }

//   mountTo(parent) {
//     this.slot = <div></div>;

//     for (const child of this.children) {
//       this.slot.appendChild(child);
//     }

//     this.render().mountTo(parent);
//   }
// }

// 构建顺序 先子后父
// let component = (
//   <div
//     id="a"
//     cls="b"
//     style="width: 100px;height: 100px;background: lightgreen;"
//   >
//     <div></div>
//     <p></p>
//     <div></div>
//     <div></div>
//   </div>
// );
