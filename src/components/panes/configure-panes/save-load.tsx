import React, {FC, useState, createRef} from 'react';
import styled from 'styled-components';
import stringify from 'json-stringify-pretty-compact';
import {ErrorMessage, SuccessMessage} from '../../styled';
import {AccentUploadButton} from '../../inputs/accent-upload-button';
import {AccentButton} from '../../inputs/accent-button';
import {getByteForCode, getCodeForByte} from '../../../utils/key';
import {title, component} from '../../icons/save';
import {CenterPane} from '../pane';
import {Detail, Label, OverflowCell, ControlRow} from '../grid';
import {getSelectedDefinition} from 'src/store/definitionsSlice';
import {
  getSelectedRawLayers,
  saveRawKeymapToDevice,
} from 'src/store/keymapSlice';
import {useAppSelector} from 'src/store/hooks';
import {useDispatch} from 'react-redux';
import {getSelectedConnectedDevice} from 'src/store/devicesSlice';
import {saveMacros} from 'src/store/macrosSlice';

type ViaSaveFile = {
  name: string;
  vendorProductId: number;
  layers: string[][];
  macros?: string[];
};

const isViaSaveFile = (obj: any): obj is ViaSaveFile =>
  obj && obj.name && obj.layers && obj.vendorProductId;

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

export const Pane: FC = () => {
  const dispatch = useDispatch();
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const rawLayers = useAppSelector(getSelectedRawLayers);
  const macros = useAppSelector((state) => state.macros);

  // TODO: improve typing so we can remove this
  if (!selectedDefinition || !selectedDevice) {
    return null;
  }

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const saveLayout = () => {
    const {name, vendorProductId} = selectedDefinition;
    const saveFile: ViaSaveFile = {
      name,
      vendorProductId,
      macros: [...macros.expressions],
      layers: rawLayers.map(
        (layer) =>
          layer.keymap.map((keyByte: number) => getCodeForByte(keyByte) || ''), // TODO: should empty string be empty keycode instead?
      ),
    };
    const content = stringify(saveFile);
    const defaultFilename = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const blob = new Blob([content], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = defaultFilename;

    link.click();
    URL.revokeObjectURL(url);
  };

  const loadLayout = (file: Blob) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const reader = new FileReader();

    reader.onabort = () => setErrorMessage('File reading was cancelled.');
    reader.onerror = () => setErrorMessage('Failed to read file.');

    reader.onload = async () => {
      const saveFile = JSON.parse((reader as any).result.toString());
      if (!isViaSaveFile(saveFile)) {
        setErrorMessage('Không thể nạp tệp tài liệu: dữ liệu không hợp lệ.');
        return;
      }

      if (saveFile.vendorProductId !== selectedDefinition.vendorProductId) {
        setErrorMessage(
          `Không thể nhập layout. Tệp tài liệu này được tạo ra cho bàn phím khác: ${saveFile.name}`,
        );
        return;
      }

      if (
        saveFile.layers.findIndex(
          (layer, idx) => layer.length !== rawLayers[idx].keymap.length,
        ) > -1
      ) {
        setErrorMessage(
          'Không thể nhập layout: số lượng nút trong một hoặc nhiều layer không chính xác.',
        );
        return;
      }

      if (macros.isFeatureSupported && saveFile.macros) {
        if (saveFile.macros.length !== macros.expressions.length) {
          setErrorMessage(
            'Không thể nhập layout: số lượng macro không chính xác.',
          );
          return;
        }

        dispatch(saveMacros(selectedDevice, saveFile.macros));
      }

      const keymap: number[][] = saveFile.layers.map((layer) =>
        layer.map((key) => getByteForCode(`${key}`)),
      );

      await dispatch(saveRawKeymapToDevice(keymap, selectedDevice));

      setSuccessMessage('Đã cập nhật layout thành công!');
    };

    reader.readAsBinaryString(file);
  };

  return (
    <OverflowCell>
      <SaveLoadPane>
        <Container>
          <ControlRow>
            <Label>Lưu Layout hiện tại</Label>
            <Detail>
              <AccentButton onClick={saveLayout}>Lưu</AccentButton>
            </Detail>
          </ControlRow>
          <ControlRow>
            <Label>Nạp Layout đã lưu</Label>
            <Detail>
              <AccentUploadButton onLoad={loadLayout}>Nạp</AccentUploadButton>
            </Detail>
          </ControlRow>
          {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
          {successMessage ? (
            <SuccessMessage>{successMessage}</SuccessMessage>
          ) : null}
        </Container>
      </SaveLoadPane>
    </OverflowCell>
  );
};

export const Icon = component;
export const Title = title;
