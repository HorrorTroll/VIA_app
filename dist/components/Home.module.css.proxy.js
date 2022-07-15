export let code = "._container_1lbpj_1 h2 {\r\n  font-size: 2rem;\r\n}\r\n\r\n._container_1lbpj_1 a {\r\n  font-size: 1.4rem;\r\n}\r\n\r\n._container_1lbpj_1 {\r\n  flex: 1;\r\n  overflow: auto;\r\n}\r\n\r\n._menuContainer_1lbpj_27 {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  background: #eaeaea;\r\n  position: relative;\r\n  box-shadow: inset #a7a7a7 0 1px 1px;\r\n}\r\n\r\n._home_1lbpj_45 {\r\n  background: var(--color_jet);\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-grow: 1;\r\n  height: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\n._usbError_1lbpj_63 {\r\n  align-items: center;\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  justify-content: center;\r\n  margin: 0 auto;\r\n  max-width: 650px;\r\n  text-align: center;\r\n}\r\n\r\n._usbErrorIcon_1lbpj_85 {\r\n  font-size: 2rem;\r\n}\r\n\r\n._usbErrorHeading_1lbpj_93 {\r\n  margin: 1rem 0 0;\r\n}\r\n\r\n._usbErrorWebHIDLink_1lbpj_101 {\r\n  text-decoration: underline;\r\n}\r\n\r\n*:focus {\r\n  outline: none;\r\n}\r\n";
let json = {container: "_container_1lbpj_1", menuContainer: "_menuContainer_1lbpj_27", home: "_home_1lbpj_45", usbError: "_usbError_1lbpj_63", usbErrorIcon: "_usbErrorIcon_1lbpj_85", usbErrorHeading: "_usbErrorHeading_1lbpj_93", usbErrorWebHIDLink: "_usbErrorWebHIDLink_1lbpj_101"};
export default json;
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = "text/css";
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
