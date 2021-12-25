// import React, { useState } from 'react';

import { useState } from 'react';
import styled from 'styled-components';
import { CenterDiv } from 'styles/Styles';

type DialogProps = {
  onClick: Function;
};

export const DialogButton = ({ onClick }: DialogProps) => {
  const [isOpen, setIsOpened] = useState(false);

  return (
    <div>
      <CenterDiv>
        <CustomButton onClick={() => setIsOpened(true)}>Delete</CustomButton>
      </CenterDiv>
      {isOpen && (
        <DialogContainer>
          <BackgroundDiv />
          <DialogBox>
            <p>Are You Sure You want to Delete this Node</p>
            <CustomButton onClick={() => setIsOpened(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              onClick={() => {
                onClick();
                setIsOpened(false);
              }}
            >
              Delete
            </CustomButton>
          </DialogBox>
        </DialogContainer>
      )}
    </div>
  );
};

export const CustomButton = styled.button`
  width: 45%;
  height: 28px;
  border: none;
  background-color: #313c4b;
  border-radius: 5px;
  justify-content: center;
  color: white;
  font-family: 'Lexend Deca';
  font-size: 18px;
  outline: none;

  :active {
    border: none;
  }

  :hover {
    background-color: #455366;
    transition: 0.5s;
    cursor: pointer;
  }
  transition: 0.5s;
`;

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  opacity: 50%;
  background-color: gray;
`;
const DialogContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  /* z-index: 10001; */
`;

const DialogBox = styled.div`
  background-color: black;
  width: 500px;
  height: 100px;
  z-index: 1001;
  padding-top: 15px;
  p {
    text-align: center;
  }
  button {
    margin-top: 15px;
    margin-left: 15px;
    /* margin-right: 20px; */
  }
`;
