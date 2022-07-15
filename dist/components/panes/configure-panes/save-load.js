import React, {useState} from "../../../../_snowpack/pkg/react.js";
import styled from "../../../../_snowpack/pkg/styled-components.js";
import stringify from "../../../../_snowpack/pkg/json-stringify-pretty-compact.js";
import {ErrorMessage, SuccessMessage} from "../../styled.js";
import {AccentUploadButton} from "../../inputs/accent-upload-button.js";
import {AccentButton} from "../../inputs/accent-button.js";
import {getByteForCode, getCodeForByte} from "../../../utils/key.js";
import {title, component} from "../../icons/save.js";
import {CenterPane} from "../pane.js";
import {Detail, Label, OverflowCell, ControlRow} from "../grid.js";
import {getSelectedDefinition} from "../../../store/definitionsSlice.js";
import {
  getSelectedRawLayers,
  saveRawKeymapToDevice
} from "../../../store/keymapSlice.js";
import {useAppSelector} from "../../../store/hooks.js";
import {useDispatch} from "../../../../_snowpack/pkg/react-redux.js";
import {getSelectedConnectedDevice} from "../../../store/devicesSlice.js";
import {saveMacros} from "../../../store/macrosSlice.js";
const isViaSaveFile = (obj) => obj && obj.name && obj.layers && obj.vendorProductId;
const SaveLoadPane = styled(CenterPane)`
  height: 100%;
  background: var(--color_dark_grey);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
export const Pane = () => {
  const dispatch = useDispatch();
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const rawLayers = useAppSelector(getSelectedRawLayers);
  const macros = useAppSelector((state) => state.macros);
  if (!selectedDefinition || !selectedDevice) {
    return null;
  }
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const saveLayout = () => {
    const {name, vendorProductId} = selectedDefinition;
    const saveFile = {
      name,
      vendorProductId,
      macros: [...macros.expressions],
      layers: rawLayers.map((layer) => layer.keymap.map((keyByte) => getCodeForByte(keyByte) || ""))
    };
    const content = stringify(saveFile);
    const defaultFilename = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const blob = new Blob([content], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = defaultFilename;
    link.click();
    URL.revokeObjectURL(url);
  };
  const loadLayout = (file) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const reader = new FileReader();
    reader.onabort = () => setErrorMessage("File reading was cancelled.");
    reader.onerror = () => setErrorMessage("Failed to read file.");
    reader.onload = async () => {
      const saveFile = JSON.parse(reader.result.toString());
      if (!isViaSaveFile(saveFile)) {
        setErrorMessage("Không thể nạp tệp tài liệu: dữ liệu không hợp lệ.");
        return;
      }
      if (saveFile.vendorProductId !== selectedDefinition.vendorProductId) {
        setErrorMessage(`Không thể nhập layout. Tệp tài liệu này được tạo ra cho bàn phím khác: ${saveFile.name}`);
        return;
      }
      if (saveFile.layers.findIndex((layer, idx) => layer.length !== rawLayers[idx].keymap.length) > -1) {
        setErrorMessage("Không thể nhập layout: số lượng nút trong một hoặc nhiều layer không chính xác.");
        return;
      }
      if (macros.isFeatureSupported && saveFile.macros) {
        if (saveFile.macros.length !== macros.expressions.length) {
          setErrorMessage("Không thể nhập layout: số lượng macro không chính xác.");
          return;
        }
        dispatch(saveMacros(selectedDevice, saveFile.macros));
      }
      const keymap = saveFile.layers.map((layer) => layer.map((key) => getByteForCode(`${key}`)));
      await dispatch(saveRawKeymapToDevice(keymap, selectedDevice));
      setSuccessMessage("Đã cập nhật layout thành công!");
    };
    reader.readAsBinaryString(file);
  };
  return /* @__PURE__ */ React.createElement(OverflowCell, null, /* @__PURE__ */ React.createElement(SaveLoadPane, null, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Lưu Layout hiện tại"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentButton, {
    onClick: saveLayout
  }, "Lưu"))), /* @__PURE__ */ React.createElement(ControlRow, null, /* @__PURE__ */ React.createElement(Label, null, "Nạp Layout đã lưu"), /* @__PURE__ */ React.createElement(Detail, null, /* @__PURE__ */ React.createElement(AccentUploadButton, {
    onLoad: loadLayout
  }, "Nạp"))), errorMessage ? /* @__PURE__ */ React.createElement(ErrorMessage, null, errorMessage) : null, successMessage ? /* @__PURE__ */ React.createElement(SuccessMessage, null, successMessage) : null)));
};
export const Icon = component;
export const Title = title;
