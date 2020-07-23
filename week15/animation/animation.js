// 统一操作动画
export class Timeline {
  constructor() {
    this.animations = [];
    this.requestID = null;
    this.state = "initial";
  }

  tick() {
    // do something
    let t = Date.now() - this.startTime;
    let animations = this.animations.filter((animation) => !animation.finished);
    for (const animation of animations) {
      let {
        object,
        property,
        start,
        end,
        duration,
        template,
        delay,
        timingFunction,
        addTime,
      } = animation;

      let progression = timingFunction((t - delay - addTime) / duration); // 0 - 1 的数代表百分比，变化区间

      if (t > duration + delay + addTime) {
        progression = 1;
        animation.finished = true;
      }

      let value = animation.valueFromProgression(progression);

      object[property] = template(value);
    }
    console.log("tick");
    if (animations.length) {
      this.requestID = requestAnimationFrame(() => this.tick());
    }
  }

  start() {
    if (this.state !== "initial") {
      return;
    }
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    if (this.state !== "playing") {
      return;
    }
    this.state = "paused";
    this.pauseTime = Date.now();
    cancelAnimationFrame(this.requestID);
  }

  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations = [];
    this.requestID = null;
    this.state = "initial";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === "playing") {
      animation.addTime =
        addTime === void 0 ? Date.now() - this.startTime : addTime;
    } else {
      animation.addTime = addTime === void 0 ? 0 : addTime;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    // 相当于动画效果
    this.timingFunction = timingFunction;
  }
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    // 相当于动画效果
    this.timingFunction = timingFunction;
  }
  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}
