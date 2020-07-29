export function enableGesture(element) {
  let contexts = Object.create(null);

  let MOUSE_SYMBOL = Symbol("mouse");

  if (!document.ontouchstart) {
    // PC 端
    element.addEventListener("mousedown", (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };
      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseend);
      };
      element.addEventListener("mousemove", mousemove);
      element.addEventListener("mouseup", mouseend);
    });
  }

  // 移动端
  element.addEventListener("touchstart", (event) => {
    for (const touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener("touchmove", (event) => {
    for (const touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener("touchend", (event) => {
    for (const touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  element.addEventListener("touchcancel", (event) => {
    for (const touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  // 模拟事件
  // tap
  // pan
  // flick
  // press

  let start = (point, context) => {
    element.dispatchEvent(
      new CustomEvent("start", {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY,
      })
    );
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) {
        return;
      }
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      element.dispatchEvent(new CustomEvent("presstart", {}));
    }, 500);
  };

  let move = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent("presscancel", {}));
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      element.dispatchEvent(
        new CustomEvent("panstart", {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      context.moves = context.moves.filter(
        (record) => Date.now() - record.t < 300
      );
      element.dispatchEvent(
        new CustomEvent("pan", {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }
  };

  let end = (point, context) => {
    console.log("point", point);
    console.log("context", context);
    if (context.isPan) {
      let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY;
      let record = context.moves[0];
      let speed =
        Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
        (Date.now() - record.t);
      let isFlick = speed > 2.5;
      if (isFlick) {
        element.dispatchEvent(
          new CustomEvent("flick", {
            detail: {
              startX: context.startX,
              startY: context.startY,
              clientX: point.clientX,
              clientY: point.clientY,
              speed: speed,
            },
          })
        );
      }
      // console.log(context.moves);
      element.dispatchEvent(
        new CustomEvent("panend", {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed: speed,
            isFlick: isFlick,
          },
        })
      );
    }
    if (context.isTap) {
      element.dispatchEvent(new CustomEvent("tap", {}));
    }
    if (context.isPress) {
      element.dispatchEvent(new CustomEvent("pressend", {}));
    }
    clearTimeout(context.timeoutHandler);
  };

  let cancel = (point, context) => {
    element.dispatchEvent(new CustomEvent("cancel", {}));
    clearTimeout(context.timeoutHandler);
  };
}
