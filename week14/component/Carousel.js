import { create, Text, Wrapper } from "./createElement";
import { Timeline, Animation } from "../../week15/animation/animation";
import { cubicBezier } from "../../week15/animation/cubicBezier";

export class Carousel {
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
    let timeline = new Timeline();
    // window.xtimeline = timeline;
    // 启动动画
    timeline.start();
    let position = 0;

    let nextPicStopHandler = null;

    let children = this.data.map((url, currentPostion) => {
      let lastPosition =
        (currentPostion - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPostion + 1) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPostion];

        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );
        offset = currentTransformValue + 500 * currentPostion;
      };

      let onPan = (event) => {
        let lastElement = children[lastPosition];
        let currentElement = children[currentPostion];
        let nextElement = children[nextPosition];

        let dx = event.detail.clientX - event.detail.startX;
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        let currentTransformValue = -500 * currentPostion + offset + dx;
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

        lastElement.style.transform = `translateX(${lastTransformValue}px)`;
        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;
      };

      let onPanend = (event) => {
        let direction = 0;
        let dx = event.detail.clientX - event.detail.startX;

        if (dx + offset > 250 || (dx > 0 && event.detail.isFlick)) {
          direction = 1;
        } else if (dx + offset < -250 || (dx < 0 && event.detail.isFlick)) {
          direction = -1;
        }

        timeline.reset();
        timeline.start();

        let lastElement = children[lastPosition];
        let currentElement = children[currentPostion];
        let nextElement = children[nextPosition];

        let lastAnimation = new Animation(
          lastElement.style,
          "transform",
          -500 - 500 * lastPosition + offset + dx,
          -500 - 500 * lastPosition + direction * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        );
        let currentAnimation = new Animation(
          currentElement.style,
          "transform",
          -500 * currentPostion + offset + dx,
          -500 * currentPostion + direction * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        );
        let nextAnimation = new Animation(
          nextElement.style,
          "transform",
          500 - 500 * nextPosition + offset + dx,
          500 - 500 * nextPosition + direction * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        );

        timeline.add(lastAnimation);
        timeline.add(currentAnimation);
        timeline.add(nextAnimation);

        position = (position - direction + this.data.length) % this.data.length;
        nextPicStopHandler = setTimeout(nextPic, 1000);

        // current.style.transform = `translateX(${
        //   offset * 500 - 500 * position
        // }px)`;
        // next.style.transform = `translateX(${
        //   offset * 500 + 500 - 500 * nextPosition
        // }px)`;
        // last.style.transform = `translateX(${
        //   offset * 500 - 500 - 500 * lastPosition
        // }px)`;
      };

      let element = (
        <img
          src={url}
          onStart={onStart}
          onPan={onPan}
          onPanend={onPanend}
          enableGesture={true}
        />
      );
      element.style.transform = "translateX(0px)";
      element.addEventListener("dragstart", (event) => event.preventDefault());
      return element;
    });

    let root = <div class="carousel">{children}</div>;

    // 动画相关
    let ease = cubicBezier(0.25, 0.1, 0.25, 1);

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = children[position];
      let next = children[nextPosition];

      // 重置动画线
      // timeline.restart();
      let currentAnimation = new Animation(
        current.style,
        "transform",
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );
      let nextAnimation = new Animation(
        next.style,
        "transform",
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );
      timeline.add(currentAnimation);
      timeline.add(nextAnimation);

      // 取消动画效果
      // current.style.transition = "ease 0s";
      // next.style.transition = "ease 0s";

      // current.style.transform = `translateX(${-100 * position}%)`;
      // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      // setTimeout(() => {
      //   // 增加动画效果
      //   current.style.transition = "ease 0.5s";
      //   next.style.transition = "ease 0.5s";

      //   current.style.transform = `translateX(${-100 - 100 * position}%)`;
      //   next.style.transform = `translateX(${-100 * nextPosition}%)`;

      //   position = nextPosition;
      // }, 16); // 增加定时器，动画效果才会生效，因为动画效果是一帧一帧的生效

      position = nextPosition;
      // window.clearTimeout(window.xstopHandler);
      // window.xtimeline.restart() // 重启
      nextPicStopHandler = setTimeout(nextPic, 1000);
    };
    nextPicStopHandler = setTimeout(nextPic, 1000);

    // root.addEventListener("mousedown", (event) => {
    //   let startX = event.clientX,
    //     startY = event.clientY;
    //   let nextPosition = (position + 1) % children.length;
    //   let lastPosition = (position - 1 + children.length) % children.length;
    //   let current = root.root.childNodes[position];
    //   let next = root.root.childNodes[nextPosition];
    //   let last = root.root.childNodes[lastPosition];

    //   current.style.transition = "ease 0s";
    //   next.style.transition = "ease 0s";
    //   last.style.transition = "ease 0s";

    //   current.style.transform = `translateX(${-500 * position}px)`;
    //   next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
    //   last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;

    //   let move = (event) => {
    //     current.style.transform = `translateX(${
    //       event.clientX - startX - 500 * position
    //     }px)`;
    //     next.style.transform = `translateX(${
    //       event.clientX - startX + 500 - 500 * nextPosition
    //     }px)`;
    //     last.style.transform = `translateX(${
    //       event.clientX - startX - 500 - 500 * lastPosition
    //     }px)`;
    //     // console.log(event.clientX - startX, event.clientY - startY);
    //   };
    //   let up = (event) => {
    //     let offset = 0;

    //     if (event.clientX - startX > 250) {
    //       offset = 1;
    //     } else if (event.clientX - startX < -250) {
    //       offset = -1;
    //     }

    //     // 置空相当于打开动画
    //     current.style.transition = "";
    //     next.style.transition = "";
    //     last.style.transition = "";

    //     current.style.transform = `translateX(${
    //       offset * 500 - 500 * position
    //     }px)`;
    //     next.style.transform = `translateX(${
    //       offset * 500 + 500 - 500 * nextPosition
    //     }px)`;
    //     last.style.transform = `translateX(${
    //       offset * 500 - 500 - 500 * lastPosition
    //     }px)`;

    //     position = (position - offset + children.length) % children.length; // 调整位置
    //     document.removeEventListener("mousemove", move);
    //     document.removeEventListener("mouseup", up);
    //   };
    //   document.addEventListener("mousemove", move);
    //   document.addEventListener("mouseup", up);
    // });

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
