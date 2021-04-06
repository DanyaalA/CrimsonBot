import React, { useContext } from "react";
import styled from "styled-components";

type InputProps = {
  message: String;
  value: string | [string];
  onChange?: any;
  type?: string;
};

export const InputBox = ({ message, value, onChange, type }: InputProps) => {
  const handleChange = (event: any) => {
    value = event.target.value;

    //onChange.ev = event;
    if (typeof onChange === "function") {
      onChange(event);
    }
  };

  return (
    <>
      <StyledSpan>{message}</StyledSpan>
      <InputContainer>
        <input value={value} onChange={handleChange} type={type} />
      </InputContainer>
    </>
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
    transition: 340ms;
    :focus {
      background: #1f1f1f;
      border: 2px solid #292929;
      outline: 0;
      transition: 340ms;
    }
  }
`;
