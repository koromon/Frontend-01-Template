// import { create, Text, Wrapper } from "./createElement";
// import { Carousel } from "./carousel.view";

class Carousel {
  // config
  constructor() {
    this.children = [];
    this.root = document.createElement("div");
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    let children = this.data.map((url) => {
      let element = <img src={url} />;
      element.addEventListener("dragstart", (event) => event.preventDefault());
      return element;
    });

    let root = <div class="carousel">{children}</div>;

    let position = 0;

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = children[position];
      let next = children[nextPosition];

      // 取消动画效果
      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        // 增加动画效果
        current.style.transition = "ease 0.5s";
        next.style.transition = "ease 0.5s";

        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;

        position = nextPosition;
      }, 16); // 增加定时器，动画效果才会生效，因为动画效果是一帧一帧的生效
      setTimeout(nextPic, 3000);
    };
    setTimeout(nextPic, 1000);

    root.addEventListener("mousedown", (event) => {
      let startX = event.clientX,
        startY = event.clientY;
      let nextPosition = (position + 1) % children.length;
      let lastPosition = (position - 1 + children.length) % children.length;
      let current = root.root.childNodes[position];
      let next = root.root.childNodes[nextPosition];
      let last = root.root.childNodes[lastPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";
      last.style.transition = "ease 0s";

      current.style.transform = `translateX(${-500 * position}px)`;
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;

      let move = (event) => {
        current.style.transform = `translateX(${
          event.clientX - startX - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          event.clientX - startX + 500 - 500 * nextPosition
        }px)`;
        last.style.transform = `translateX(${
          event.clientX - startX - 500 - 500 * lastPosition
        }px)`;
        // console.log(event.clientX - startX, event.clientY - startY);
      };
      let up = (event) => {
        let offset = 0;

        if (event.clientX - startX > 250) {
          offset = 1;
        } else if (event.clientX - startX < -250) {
          offset = -1;
        }

        // 置空相当于打开动画
        current.style.transition = "";
        next.style.transition = "";
        last.style.transition = "";

        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;
        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;

        position = (position - offset + children.length) % children.length; // 调整位置
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}

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
