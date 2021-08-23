import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type SpinnerProps = {
  loading: boolean | undefined;
  message?: string;
  icon?: IconDefinition;
  size?: SizeProp;
};

export const Spinner = ({ loading, message, icon, size }: SpinnerProps) => {
  if (loading) {
    return (
      <LoadingStyle>
        <FontAwesomeIcon
          icon={icon ? icon : faSpinner}
          title={'Loading Reddit Config'}
          className={'fa-spin'}
          size={size ? size : '2x'}
        />
        <h1>Loading {message}</h1>
      </LoadingStyle>
    );
  } else {
    return <div></div>;
  }
};

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  transform: 0;
  z-index: 15;

  h1 {
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
`;
