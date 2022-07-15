export let code = "._lens_fqiug_1 {\r\n  position: absolute;\r\n  width: 10px;\r\n  height: 10px;\r\n  border-radius: 50%;\r\n  border: 2px solid black;\r\n  opacity: 0.7;\r\n  background: rgba(255, 255, 255, 0.2);\r\n  pointer-events: none;\r\n  box-sizing: border-box;\r\n  transform: translate3d(195px, 195px, 0);\r\n}\r\n\r\n._mouseDown_fqiug_27 {\r\n  cursor: pointer;\r\n}\r\n\r\n._label_fqiug_35 {\r\n  font-size: 14px;\r\n  color: #717070;\r\n}\r\n\r\n._colorCategoryContainer_fqiug_45 {\r\n  margin: 0 5px;\r\n}\r\n\r\n._colorCategory_fqiug_45 {\r\n  margin-top: 5px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 250px;\r\n  height: 250px;\r\n  box-shadow: rgba(0, 0, 0, 0.11) 0 1px 1px 1px;\r\n}\r\n\r\n._container_fqiug_73 {\r\n  border: 10px solid whitesmoke;\r\n  width: 180px;\r\n  height: 180px;\r\n  position: relative;\r\n}\r\n\r\n._inner_fqiug_87 {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: linear-gradient(to top, white, rgba(0, 0, 0, 0));\r\n}\r\n\r\n._outer_fqiug_99 {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: linear-gradient(\r\n    to right,\r\n    red,\r\n    yellow,\r\n    lime,\r\n    aqua,\r\n    blue,\r\n    magenta,\r\n    red\r\n  );\r\n}\r\n";
let json = {lens: "_lens_fqiug_1", mouseDown: "_mouseDown_fqiug_27", label: "_label_fqiug_35", colorCategoryContainer: "_colorCategoryContainer_fqiug_45", colorCategory: "_colorCategory_fqiug_45", container: "_container_fqiug_73", inner: "_inner_fqiug_87", outer: "_outer_fqiug_99"};
export default json;
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
