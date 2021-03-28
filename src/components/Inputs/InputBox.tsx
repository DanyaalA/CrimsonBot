import React from "react";
import styled, { css } from "styled-components";

type InputProps = {
  message: String;
  value: string;
};

export const InputBox = (props: InputProps) => {
  return (
    <InputContainer>
      <StyledSpan>{props.message}</StyledSpan>
      <input value={props.value} />
    </InputContainer>
  );
};

const StyledSpan = styled.span`
  padding-right: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  height: 23px;
  padding-bottom: 10px;
  span {
    padding-right: 5px;
  }
  input {
    padding-left: 10px;
    color: white;
    font-family: "Lexend Deca";
    width: 300px;
    height: 30px;
    background: #141617;
    border: 2px solid #1f1f1f;
    border-radius: 5px;
    transition: 0.4s;
    :focus {
      background: #1f1f1f;
      border: 2px solid #292929;
      outline: 0;
      transition: 0.4s;
    }
  }
`;
