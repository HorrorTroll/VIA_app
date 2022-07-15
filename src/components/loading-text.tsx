import React from 'react';
import styled from 'styled-components';

const LoadingText = styled.div`
  font-size: 30px;
  color: var(--color_light-grey);
`;

enum LoadingLabel {
  Searching = 'Đang tìm kiếm thiết bị...',
  Loading = 'Đang tải...',
}

type Props = {
  isSearching: boolean;
};

export default function (props: Props) {
  return (
    <LoadingText data-tid="loading-message">
      {props.isSearching ? LoadingLabel.Searching : LoadingLabel.Loading}
    </LoadingText>
  );
}
