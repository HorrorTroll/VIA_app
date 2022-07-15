import {
  getDefinitionsFromStore,
  getMissingDefinition,
  getSupportedIdsFromStore,
  syncStore
} from "../utils/device-store.js";
import {getRecognisedDevices, getVendorProductId} from "../utils/hid-keyboards.js";
import {KeyboardAPI} from "../utils/keyboard-api.js";
import {
  reloadDefinitions,
  loadLayoutOptions,
  updateDefinitions,
  getDefinitions
} from "./definitionsSlice.js";
import {loadKeymapFromDevice} from "./keymapSlice.js";
import {updateLightingData} from "./lightingSlice.js";
import {loadMacros} from "./macrosSlice.js";
import {updateV3MenuData} from "./menusSlice.js";
import {
  getConnectedDevices,
  getSelectedDevicePath,
  getSupportedIds,
  selectDevice,
  updateConnectedDevices,
  updateSupportedIds
} from "./devicesSlice.js";
export const selectConnectedDeviceByPath = (path) => async (dispatch, getState) => {
  await dispatch(reloadConnectedDevices());
  const connectedDevice = getConnectedDevices(getState())[path];
  if (connectedDevice) {
    dispatch(selectConnectedDevice(connectedDevice));
  }
};
const validateDefinitionAvailable = async ({device, requiredDefinitionVersion, vendorProductId}, definitions) => {
  const definition = definitions && definitions[vendorProductId] && definitions[vendorProductId][requiredDefinitionVersion];
  if (!definition) {
    console.log("missing definition: fetching new one");
    await getMissingDefinition(device, requiredDefinitionVersion);
  }
};
export const selectConnectedDevice = (connectedDevice) => async (dispatch, getState) => {
  await validateDefinitionAvailable(connectedDevice, getDefinitions(getState()));
  dispatch(selectDevice(connectedDevice));
  dispatch(loadMacros(connectedDevice));
  dispatch(loadLayoutOptions());
  const {protocol} = connectedDevice;
  if (protocol < 10) {
    dispatch(updateLightingData(connectedDevice));
  }
  if (protocol >= 10) {
    dispatch(updateV3MenuData(connectedDevice));
  }
  dispatch(loadKeymapFromDevice(connectedDevice));
};
export const reloadConnectedDevices = () => async (dispatch, getState) => {
  const state = getState();
  const selectedDevicePath = getSelectedDevicePath(state);
  const supportedIds = getSupportedIds(state);
  const recognisedDevices = await getRecognisedDevices(supportedIds);
  const protocolVersions = await Promise.all(recognisedDevices.map((device) => new KeyboardAPI(device).getProtocolVersion()));
  const connectedDevices = recognisedDevices.reduce((devices, device, idx) => {
    const protocol = protocolVersions[idx];
    devices[device.path] = {
      api: new KeyboardAPI(device),
      device,
      protocol,
      requiredDefinitionVersion: protocol >= 10 ? "v3" : "v2",
      vendorProductId: getVendorProductId(device.vendorId, device.productId)
    };
    return devices;
  }, {});
  Object.entries(connectedDevices).forEach(([path, d]) => {
    console.info("Setting connected device:", d.protocol, path, d);
  });
  dispatch(updateConnectedDevices(connectedDevices));
  const validDevicesArr = Object.entries(connectedDevices);
  await dispatch(reloadDefinitions(connectedDevices));
  if ((!selectedDevicePath || !connectedDevices[selectedDevicePath]) && validDevicesArr.length > 0) {
    const firstConnectedDevice = validDevicesArr[0][1];
    dispatch(selectConnectedDevice(firstConnectedDevice));
  } else if (validDevicesArr.length === 0) {
    dispatch(selectDevice(null));
  }
};
export const loadSupportedIds = () => async (dispatch) => {
  await syncStore();
  dispatch(updateSupportedIds(getSupportedIdsFromStore()));
  dispatch(updateDefinitions(getDefinitionsFromStore()));
  dispatch(reloadConnectedDevices());
};
