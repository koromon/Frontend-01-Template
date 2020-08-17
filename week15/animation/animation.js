// 统一操作动画
export class Timeline {
  constructor() {
    this.animations = new Set();
    this.finishedAnimations = new Set();
    this.addTimes = new Map();
    this.requestID = null;
    this.state = "initial";
  }

  tick() {
    // do something
    let t = Date.now() - this.startTime;

    for (const animation of this.animations) {
      let {
        object,
        property,
        start,
        end,
        duration,
        template,
        delay,
        timingFunction,
      } = animation;

      let addTime = this.addTimes.get(animation);

      if (t < delay + addTime) {
        continue;
      }

      let progression = timingFunction((t - delay - addTime) / duration); // 0 - 1 的数代表百分比，变化区间

      if (t > duration + delay + addTime) {
        progression = 1;
        this.animations.delete(animation);
        this.finishedAnimations.add(animation);
      }

      let value = animation.valueFromProgression(progression);

      object[property] = template(value);
    }

    if (this.animations.size) {
      this.requestID = requestAnimationFrame(() => {
        this.tick();
      });
    } else {
      this.requestID = null;
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
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
    }
  }

  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  reset() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations = new Set();
    this.addTimes = new Map();
    this.finishedAnimations = new Set();
    this.requestID = null;
    this.startTime = Date.now();
    this.pauseTime = null;
    this.state = "initial";
    // this.tick();
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }

    for (const animation of this.finishedAnimations) {
      this.animations.add(animation);
    }

    this.finishedAnimations = new Set();
    this.requestID = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.add(animation);
    if (this.state === "playing" && this.requestID === null) {
      this.tick();
    }
    if (this.state === "playing") {
      this.addTimes.set(
        animation,
        addTime === void 0 ? Date.now() - this.startTime : addTime
      );
    } else {
      this.addTimes.set(animation, addTime === void 0 ? 0 : addTime);
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
