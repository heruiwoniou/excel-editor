export const defaultScrollWidth = (function() {
  let odiv: HTMLDivElement = document.createElement("div"),
    styles = {
      width: "100px",
      height: "100px",
      overflowY: "scroll"
    },
    i,
    scrollbarWidth;
  odiv.style.width = "100px";
  odiv.style.height = "100px";
  odiv.style.overflowY = "scroll";
  document.body.appendChild(odiv);
  scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
  odiv.remove();
  return scrollbarWidth;
})();
