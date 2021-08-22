import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

type InputProps = {
  message: String;
  value: string | [string];
  onChange?: any;
  type?: string;
  visibleIcon: IconDefinition;
  hiddenIcon: IconDefinition;
};

export const InputBoxToggle = ({
  message,
  value,
  onChange,
  visibleIcon,
  hiddenIcon,
}: InputProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const handleChange = (event: any) => {
    value = event.target.value;

    //onChange.ev = event;
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <div className="inputBox">
      <StyledSpan>{message}</StyledSpan>

      {isHidden ? (
        <InputContainer>
          <input value={value} onChange={handleChange} type="password" />
          <span onClick={() => setIsHidden(!isHidden)}>
            <FontAwesomeIcon icon={visibleIcon} />
          </span>
        </InputContainer>
      ) : (
        <InputContainer>
          <input value={value} onChange={handleChange} />
          <span onClick={() => setIsHidden(!isHidden)}>
            <FontAwesomeIcon icon={hiddenIcon} />
          </span>
        </InputContainer>
      )}
    </div>
  );
};

const StyledSpan = styled.span`
  padding-right: 5px;
  margin-left: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  height: 23px;
  padding-bottom: 10px;
  margin-top: 3px;
  display: flex;
  flex-flow: row;
  flex-direction: row;
  position: relative;

  span {
    position: absolute;
    left: 96%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    :hover {
      cursor: pointer;
    }
  }
  span {
    padding-right: 5px;
  }

  input {
    display: flex;
    padding-left: 10px;
    color: white;
    font-family: 'Lexend Deca';
    width: 100%;
    height: 30px;
    background: #141617;
    border: 2px solid #1f1f1f;
    border-radius: 5px;
    transition: 340ms;
    :focus {
      background: #1f1f1f;
      border: 2px solid #292929;
      outline: 0;
      transition: 340ms;
    }
  }
`;
