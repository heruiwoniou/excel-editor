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

export const trim = function(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export function forEach(el: NodeListOf<HTMLElement>, ...args: any) {
  return _forEach.apply(el, args);
}

export function hasClass(el: Element | null, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el: Element | null, cls: string) {
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

export function removeClass(el: Element | null, cls: string) {
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

const ACode = "A".charCodeAt(0);

export function toIndex(columnName:string) {
  let index = 0;
  let charsLenght = columnName.length;
  for(let i = 0; i < charsLenght; i++){
    index += (columnName.charCodeAt(0) - ACode + 1) * Math.pow(26, charsLenght - i - 1);
  }

  return index;
}

export function toName(index: number) {
  let columnName = "";
  index--;
  do {
    if(columnName.length > 0) {
      index --;
    } 
    columnName = String.fromCharCode(index % 26 + ACode) + columnName;
    index = (index - index % 26) / 26;
  } while(index > 0);
  return columnName;
}