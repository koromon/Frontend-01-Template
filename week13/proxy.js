let handlers = new Map();

let usedReactivities = [];
let reactivities = new Map();

function reactive(obj) {
  if (reactivities.has(obj)) {
    return reactivities.get(obj);
  }
  let proxy = new Proxy(obj, {
    get(obj, prop) {
      usedReactivities.push([obj, prop]);
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop]);
      }
      return obj[prop];
    },
    set(obj, prop, val) {
      obj[prop] = val;
      // 执行收集到的依赖
      if (handlers.has(obj)) {
        if (handlers.get(obj).get(prop)) {
          for (const handler of handlers.get(obj).get(prop)) {
            handler();
          }
        }
      }
      return obj[prop];
    },
  });
  reactivities.set(obj, proxy);
  reactivities.set(proxy, proxy);
  return proxy;
}

function effect(handler) {
  usedReactivities = [];
  handler();
  // console.log("effect", usedReactivities);
  // 依赖收集
  for (let usedReactivity of usedReactivities) {
    let [obj, prop] = usedReactivity;
    // console.log("usedReactivity", [obj, prop]);
    if (!handlers.has(obj)) {
      handlers.set(obj, new Map());
    }
    if (!handlers.get(obj).has(prop)) {
      handlers.get(obj).set(prop, []);
    }
    handlers.get(obj).get(prop).push(handler);
  }
}

let v12, v1, v2;
let p1 = reactive({ a: 1 });
let p2 = reactive({ a: 2 });

effect(() => (v12 = p1.a + p2.a));
effect(() => (v1 = p1.a));
effect(() => (v2 = p1.a));
// console.log("v12", v12);
// proxy.a = 2;
// console.log("v12", v12);
