export let code = "._menu_1kavj_1 {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  position: relative;\r\n}\r\n\r\n._keycodesContainer_1kavj_15 {\r\n  overflow: auto;\r\n}\r\n\r\n._keycodes_1kavj_15 {\r\n  padding: 0 5px 5px 5px;\r\n  display: flex;\r\n  flex-flow: wrap;\r\n  margin: 0 auto;\r\n  max-width: 1000px;\r\n}\r\n\r\n._disabled_1kavj_39 {\r\n  cursor: not-allowed;\r\n  filter: opacity(50%);\r\n}\r\n\r\n._categories_1kavj_49 {\r\n  padding: 2px 3px;\r\n  white-space: nowrap;\r\n  height: 31px;\r\n  min-height: 31px;\r\n  text-align: center;\r\n}\r\n\r\n._category_1kavj_65 {\r\n  font-family: GothamRounded, sans-serif;\r\n  display: inline-block;\r\n  color: #a7a7a7;\r\n  font-size: 20px;\r\n  transition: 0.4s color ease-out;\r\n  padding: 4px;\r\n  text-transform: uppercase;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n._selected_1kavj_89 {\r\n  color: #717070;\r\n}\r\n\r\n._keycodeDesc_1kavj_97 {\r\n  position: fixed;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  width: 100%;\r\n  font-size: 14px;\r\n  padding: 5px;\r\n  height: 25px;\r\n  box-sizing: border-box;\r\n  opacity: 1;\r\n  transition: opacity 0.4s ease-out;\r\n}\r\n\r\n._keycodeDesc_1kavj_97:empty {\r\n  opacity: 0;\r\n}\r\n";
let json = {menu: "_menu_1kavj_1", keycodesContainer: "_keycodesContainer_1kavj_15", keycodes: "_keycodes_1kavj_15", disabled: "_disabled_1kavj_39", categories: "_categories_1kavj_49", category: "_category_1kavj_65", selected: "_selected_1kavj_89", keycodeDesc: "_keycodeDesc_1kavj_97"};
export default json;
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
