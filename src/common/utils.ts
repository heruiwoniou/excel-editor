export const defaultScrollWidth = (function() {
  let odiv: HTMLDivElement = document.createElement("div");
  let scrollbarWidth: number;

  odiv.style.width = "100px";
  odiv.style.height = "100px";
  odiv.style.overflowY = "scroll";
  document.body.appendChild(odiv);
  scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
  odiv.remove();
  return scrollbarWidth;
})();

const originArray: [] = [];
const _forEach = originArray.forEach;

const trim = function(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export function forEach(el: NodeListOf<HTMLElement>, ...args: any) {
  return _forEach.apply(el, args);
}

export function hasClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el: HTMLElement, cls: string) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || "").split(" ");

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return;
  var classes = cls.split(" ");
  var curClass = " " + el.className + " ";

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}
