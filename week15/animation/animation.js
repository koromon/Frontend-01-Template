// 统一操作动画
export class Timeline {
  constructor() {
    this.animations = [];
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

      if (t > duration + delay) {
        continue;
      }

      let progression = timingFunction((t - delay) / duration); // 0 - 1 的数代表百分比，变化区间

      let value = start + progression * (end - start);

      object[property] = template(value);
    }
    console.log("tick");

    requestAnimationFrame(() => this.tick());
  }

  start() {
    this.startTime = Date.now();
    this.tick();
  }

  add(animation) {
    this.animations.push(animation);
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
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
}
